import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Cake, PlusCircle, TrendingUp, Package } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { fetchCakes, type CakeProduct } from "@/lib/adminApi";

export default function AdminDashboard() {
  const [cakes, setCakes] = useState<CakeProduct[]>([]);

  useEffect(() => {
    fetchCakes().then(setCakes);
  }, []);

  const categories = [...new Set(cakes.map((c) => c.category))];

  const stats = [
    { label: "Total Cakes", value: cakes.length, icon: Cake, color: "text-primary" },
    { label: "Categories", value: categories.length, icon: Package, color: "text-secondary-foreground" },
    { label: "Latest Added", value: cakes[0]?.name ?? "None", icon: TrendingUp, color: "text-accent-foreground" },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {stats.map((s) => (
          <Card key={s.label} className="hover:shadow-md transition-shadow">
            <CardContent className="p-5 flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                <s.icon className={`w-5 h-5 ${s.color}`} />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">{s.label}</p>
                <p className="text-lg font-semibold text-foreground truncate max-w-[140px]">
                  {s.value}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex gap-3">
        <Link
          to="/admin/add"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
        >
          <PlusCircle className="w-4 h-4" /> Add New Cake
        </Link>
        <Link
          to="/admin/manage"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-accent text-accent-foreground text-sm font-medium hover:bg-accent/80 transition-colors"
        >
          <Cake className="w-4 h-4" /> Manage Cakes
        </Link>
      </div>

      {cakes.length > 0 && (
        <Card>
          <CardContent className="p-5">
            <h3 className="text-sm font-semibold text-foreground mb-3">Recent Cakes</h3>
            <div className="space-y-2">
              {cakes.slice(0, 5).map((cake) => (
                <div key={cake.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors">
                  <img src={cake.image} alt={cake.name} className="w-10 h-10 rounded-lg object-cover bg-muted" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{cake.name}</p>
                    <p className="text-xs text-muted-foreground">{cake.category}</p>
                  </div>
                  <span className="text-sm font-semibold text-foreground">₹{cake.price}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
