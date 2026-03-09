-- Create PRODUCTS table with all specified fields and constraints
CREATE TABLE IF NOT EXISTS products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    tagline TEXT,
    description TEXT,
    price_minor BIGINT NOT NULL,
    currency CHAR(3) DEFAULT 'INR',
    color_name TEXT,
    color_hex TEXT,
    badge_label TEXT,
    movement_type TEXT,
    water_resistance TEXT,
    case_diameter_mm NUMERIC,
    strap_type TEXT,
    weight_g NUMERIC,
    stock_quantity INTEGER DEFAULT 0,
    image_url TEXT,
    hero_bg_image_url TEXT,
    hero_bg_video_url TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ
);

-- Create PRODUCT_IMAGES table with foreign key relationship to products
CREATE TABLE IF NOT EXISTS product_images (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID NOT NULL,
    image_url TEXT NOT NULL,
    alt_text TEXT,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT now(),
    CONSTRAINT fk_product_images_product 
        FOREIGN KEY (product_id) 
        REFERENCES products(id) 
        ON DELETE CASCADE
);

-- Create ORDERS table with customer information and order details
CREATE TABLE IF NOT EXISTS orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    customer_name TEXT NOT NULL,
    customer_email TEXT NOT NULL,
    customer_phone TEXT,
    shipping_address_line1 TEXT NOT NULL,
    shipping_address_line2 TEXT,
    city TEXT NOT NULL,
    state TEXT NOT NULL,
    country TEXT NOT NULL,
    postal_code TEXT NOT NULL,
    status VARCHAR(20) DEFAULT 'pending',
    payment_method TEXT,
    payment_status VARCHAR(20) DEFAULT 'pending',
    payment_id TEXT,
    subtotal_minor BIGINT NOT NULL,
    tax_minor BIGINT DEFAULT 0,
    shipping_minor BIGINT DEFAULT 0,
    total_minor BIGINT NOT NULL,
    currency CHAR(3) DEFAULT 'INR',
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ
);

-- Create ORDER_ITEMS table with foreign keys to orders and products
CREATE TABLE IF NOT EXISTS order_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID NOT NULL,
    product_id UUID NOT NULL,
    product_name TEXT NOT NULL,
    product_slug TEXT,
    quantity INTEGER NOT NULL,
    unit_price_minor BIGINT NOT NULL,
    line_total_minor BIGINT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now(),
    CONSTRAINT fk_order_items_order 
        FOREIGN KEY (order_id) 
        REFERENCES orders(id) 
        ON DELETE CASCADE,
    CONSTRAINT fk_order_items_product 
        FOREIGN KEY (product_id) 
        REFERENCES products(id)
);

-- Create INQUIRIES table for contact form messages
CREATE TABLE IF NOT EXISTS inquiries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    first_name TEXT NOT NULL,
    last_name TEXT,
    email TEXT NOT NULL,
    phone TEXT,
    message TEXT NOT NULL,
    status VARCHAR(20) DEFAULT 'new',
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Create all indexes for optimal query performance
CREATE INDEX IF NOT EXISTS idx_products_slug ON products(slug);
CREATE INDEX IF NOT EXISTS idx_products_active ON products(is_active);
CREATE INDEX IF NOT EXISTS idx_product_images_product ON product_images(product_id);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_order_items_order ON order_items(order_id);
CREATE INDEX IF NOT EXISTS idx_order_items_product ON order_items(product_id);
CREATE INDEX IF NOT EXISTS idx_inquiries_created_at ON inquiries(created_at);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Add updated_at triggers for tables that need it
CREATE TRIGGER update_products_updated_at 
    BEFORE UPDATE ON products 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_orders_updated_at 
    BEFORE UPDATE ON orders 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Insert sample data for testing
INSERT INTO products (slug, name, tagline, description, price_minor, color_name, color_hex, badge_label, movement_type, water_resistance, case_diameter_mm, strap_type, weight_g, stock_quantity, image_url, is_active) VALUES
('classic-automatic', 'Classic Automatic', 'Timeless elegance meets precision', 'A sophisticated automatic watch with classic design and modern reliability.', 25000, 'Silver', '#C0C0C0', 'Best Seller', 'Automatic', '50m', 42, 'Leather', 85, 15, 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=500', true),
('sport-chronograph', 'Sport Chronograph', 'Built for performance', 'High-performance chronograph designed for active lifestyles.', 35000, 'Black', '#000000', 'New', 'Quartz', '100m', 44, 'Steel', 120, 8, 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=500', true),
('dive-master', 'Dive Master Pro', 'Professional diving companion', 'Professional-grade dive watch with exceptional water resistance.', 45000, 'Blue', '#0066CC', 'Limited', 'Automatic', '300m', 46, 'Rubber', 150, 5, 'https://images.unsplash.com/photo-1506796684999-97a3d5e8b550?w=500', true);

-- Insert sample product images
INSERT INTO product_images (product_id, image_url, alt_text, sort_order) VALUES
((SELECT id FROM products WHERE slug = 'classic-automatic'), 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=500', 'Classic Automatic Watch - Front View', 1),
((SELECT id FROM products WHERE slug = 'classic-automatic'), 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=500', 'Classic Automatic Watch - Side View', 2),
((SELECT id FROM products WHERE slug = 'sport-chronograph'), 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=500', 'Sport Chronograph - Front View', 1),
((SELECT id FROM products WHERE slug = 'sport-chronograph'), 'https://images.unsplash.com/photo-1548171915-e79a380a2a4b?w=500', 'Sport Chronograph - Detail View', 2),
((SELECT id FROM products WHERE slug = 'dive-master'), 'https://images.unsplash.com/photo-1506796684999-97a3d5e8b550?w=500', 'Dive Master Pro - Front View', 1),
((SELECT id FROM products WHERE slug = 'dive-master'), 'https://images.unsplash.com/photo-1579586337278-3d41baa7c7e6?w=500', 'Dive Master Pro - Underwater View', 2);