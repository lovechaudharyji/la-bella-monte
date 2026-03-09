---
name: "supabase-table-creator"
description: "Creates Supabase database tables with exact specifications using MCP. Invoke when user wants to create tables in Supabase with specific fields, relationships, and constraints."
---

# Supabase Table Creator

This skill creates database tables in Supabase with exact specifications including fields, primary keys, foreign keys, indexes, and triggers.

## Usage

When user requests table creation in Supabase:
1. Read the table specifications from user's request
2. Generate complete SQL schema with all constraints and relationships
3. Execute the SQL directly in Supabase using MCP connection
4. Verify table creation and show results

## Features

- Creates tables with exact field specifications
- Sets up primary keys, foreign keys, and unique constraints
- Creates indexes for optimal query performance
- Implements auto-updating updated_at triggers
- Handles table relationships (one-to-many, many-to-one)
- Inserts sample data for testing
- Provides verification of created tables

## Example Tables Supported

- **products**: Product information with pricing, descriptions, specifications
- **product_images**: Multiple images per product with sorting
- **orders**: Customer order information with shipping details
- **order_items**: Individual items within orders
- **inquiries**: Contact form messages with status tracking

## SQL Generation

Generates complete SQL including:
- CREATE TABLE statements with all fields and constraints
- ALTER TABLE for foreign key relationships
- CREATE INDEX statements for performance
- CREATE TRIGGER statements for auto-updating timestamps
- INSERT statements for sample data

## Verification

After execution, verifies:
- All tables exist in database
- All fields are created with correct types
- All relationships are established
- All indexes are created
- All triggers are functioning