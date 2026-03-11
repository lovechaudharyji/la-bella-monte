import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function CustomersPage() {
  return (
    <div className="p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Customers Management</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-neutral-600">Customers management interface coming soon...</p>
        </CardContent>
      </Card>
    </div>
  );
}