import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function InventoryPage() {
  return (
    <div className="p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Inventory</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-neutral-600">Inventory management interface coming soon...</p>
        </CardContent>
      </Card>
    </div>
  );
}
