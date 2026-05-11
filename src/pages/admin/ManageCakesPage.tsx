import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Trash2, Pencil, PlusCircle, Cake, LayoutGrid, ListOrdered, Search, X } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { fetchCakes, deleteCake, type CakeProduct } from "@/lib/adminApi";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

type ViewMode = "all" | "az";

export default function ManageCakesPage() {
  const [cakes, setCakes] = useState<CakeProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<ViewMode>("all");
  const [search, setSearch] = useState("");
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  const load = async () => {
    setLoading(true);
    const data = await fetchCakes();
    setCakes(data);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const handleDelete = async (id: string, name: string) => {
    await deleteCake(id);
    setCakes((prev) => prev.filter((c) => c.id !== id));
    toast.success(`"${name}" deleted`);
  };

  // Group cakes by category, sorted A-Z; cakes inside each group sorted by name A-Z
  const grouped = useMemo(() => {
    const map = new Map<string, CakeProduct[]>();
    for (const c of cakes) {
      const key = c.category || "Uncategorised";
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(c);
    }
    const sortedCats = Array.from(map.keys()).sort((a, b) => a.localeCompare(b));
    return sortedCats.map((cat) => ({
      category: cat,
      items: map.get(cat)!.slice().sort((a, b) => a.name.localeCompare(b.name)),
    }));
  }, [cakes]);

  const jumpTo = (cat: string) => {
    const el = sectionRefs.current[cat];
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
      </div>
    );
  }

  if (cakes.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <Cake className="w-12 h-12 text-muted-foreground mb-3" />
        <h3 className="text-lg font-semibold text-foreground mb-1">No cakes yet</h3>
        <p className="text-sm text-muted-foreground mb-4">Start by adding your first cake to the catalog.</p>
        <Link to="/admin/add">
          <Button className="gap-2">
            <PlusCircle className="w-4 h-4" /> Add First Cake
          </Button>
        </Link>
      </div>
    );
  }

  const renderCard = (cake: CakeProduct) => (
    <Card key={cake.id} className="group overflow-hidden hover:shadow-lg transition-all duration-300">
      <div className="aspect-[4/3] overflow-hidden bg-muted">
        <img
          src={cake.image}
          alt={cake.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <CardContent className="p-4 space-y-2">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <h3 className="font-semibold text-foreground text-sm truncate">{cake.name}</h3>
            <p className="text-xs text-muted-foreground">{cake.category} • {cake.size}</p>
          </div>
          <span className="text-sm font-bold text-primary whitespace-nowrap">₹{cake.price}</span>
        </div>
        <div className="flex gap-2 pt-1">
          <Link to={`/admin/add?edit=${cake.id}`} className="flex-1">
            <Button variant="outline" size="sm" className="w-full gap-1.5 text-xs">
              <Pencil className="w-3 h-3" /> Edit
            </Button>
          </Link>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline" size="sm" className="gap-1.5 text-xs text-destructive hover:text-destructive">
                <Trash2 className="w-3 h-3" /> Delete
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete "{cake.name}"?</AlertDialogTitle>
                <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => handleDelete(cake.id, cake.name)} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-muted-foreground">{cakes.length} cake{cakes.length !== 1 ? "s" : ""}</p>
        <div className="flex items-center gap-2">
          <div className="inline-flex rounded-md border border-border bg-background p-0.5">
            <Button
              type="button"
              size="sm"
              variant={view === "all" ? "default" : "ghost"}
              className="gap-1.5 text-xs h-8"
              onClick={() => setView("all")}
            >
              <LayoutGrid className="w-3.5 h-3.5" /> All
            </Button>
            <Button
              type="button"
              size="sm"
              variant={view === "az" ? "default" : "ghost"}
              className="gap-1.5 text-xs h-8"
              onClick={() => setView("az")}
            >
              <ListOrdered className="w-3.5 h-3.5" /> Categories A–Z
            </Button>
          </div>
          <Link to="/admin/add">
            <Button size="sm" className="gap-2">
              <PlusCircle className="w-3.5 h-3.5" /> Add Cake
            </Button>
          </Link>
        </div>
      </div>

      {view === "all" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {cakes.map(renderCard)}
        </div>
      )}

      {view === "az" && (() => {
        const q = search.trim().toLowerCase();
        const filtered = q
          ? grouped
              .map((g) => {
                const catMatch = g.category.toLowerCase().includes(q);
                const items = catMatch ? g.items : g.items.filter((i) => i.name.toLowerCase().includes(q));
                return { ...g, items };
              })
              .filter((g) => g.items.length > 0 || g.category.toLowerCase().includes(q))
          : grouped;

        return (
          <div className="space-y-6">
            {/* Jump-to bar */}
            <div className="sticky top-0 z-10 -mx-1 px-1 py-2 bg-background/80 backdrop-blur border-b border-border space-y-2">
              <div className="relative w-full sm:max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search categories or cakes…"
                  className="h-9 pl-9 pr-9"
                />
                {search && (
                  <button
                    type="button"
                    onClick={() => setSearch("")}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-foreground"
                    aria-label="Clear search"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <div className="w-full sm:w-64">
                  <Select onValueChange={(v) => jumpTo(v)}>
                    <SelectTrigger className="h-9">
                      <SelectValue placeholder="Jump to category…" />
                    </SelectTrigger>
                    <SelectContent>
                      {filtered.map((g) => (
                        <SelectItem key={g.category} value={g.category}>
                          {g.category} ({g.items.length})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="hidden md:flex flex-wrap gap-1.5">
                  {filtered.map((g) => (
                    <button
                      key={g.category}
                      onClick={() => jumpTo(g.category)}
                      className="text-xs px-2.5 py-1 rounded-full border border-border bg-muted/40 hover:bg-primary hover:text-primary-foreground transition-colors"
                    >
                      {g.category}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {filtered.length === 0 && (
              <p className="text-sm text-muted-foreground py-8 text-center">
                No matches for "{search}".
              </p>
            )}

            {filtered.map((g) => (
              <section
                key={g.category}
                ref={(el) => { sectionRefs.current[g.category] = el; }}
                className="scroll-mt-24"
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-serif text-xl text-foreground">
                    {g.category}{" "}
                    <span className="text-sm text-muted-foreground font-sans">
                      ({g.items.length})
                    </span>
                  </h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {g.items.map(renderCard)}
                </div>
              </section>
            ))}
          </div>
        );
      })()}
    </div>
  );
}
