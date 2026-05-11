import { useState, useRef, useEffect, useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Upload, ImageIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { addCake, updateCake, fetchCakes, uploadCakeImage } from "@/lib/adminApi";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { CATEGORY_TREE, getSubcategoriesFor } from "@/data/categoryTree";

// Per-cake selectable sizes (admin) — capped at 3 kg per business rule
const SELECTABLE_SIZES = ["0.5 kg", "1 kg", "1.5 kg", "2 kg", "2.5 kg", "3 kg"];

// Stable numeric order for displaying smallest → largest
function sizeRank(s: string) {
  const n = parseFloat(s);
  return Number.isFinite(n) ? n : 999;
}
import { toast } from "sonner";

export default function AddCakePage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const editId = searchParams.get("edit");
  const { userId } = useAdminAuth();
  const fileRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: "",
    category: "",
    subcategory: "",
    description: "",
  });
  // Size → price (e.g. { "0.5 kg": 650, "1 kg": 1200 })
  const [sizePrices, setSizePrices] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  const subcategoryOptions = useMemo(
    () => getSubcategoriesFor(form.category),
    [form.category]
  );

  useEffect(() => {
    if (!editId) return;
    fetchCakes().then((cakes) => {
      const cake = cakes.find((c) => c.id === editId);
      if (cake) {
        setForm({
          name: cake.name,
          category: cake.category,
          subcategory: cake.subcategory ?? "",
          description: cake.description ?? "",
        });
        // Pre-populate per-size prices: prefer stored sizePrices, otherwise seed from legacy size+price
        const seeded: Record<string, string> = {};
        if (cake.sizePrices && Object.keys(cake.sizePrices).length > 0) {
          for (const [s, p] of Object.entries(cake.sizePrices)) {
            if (SELECTABLE_SIZES.includes(s)) seeded[s] = String(p);
          }
        } else if (cake.size && SELECTABLE_SIZES.includes(cake.size)) {
          seeded[cake.size] = String(cake.price);
        }
        setSizePrices(seeded);
        setPreview(cake.image);
      }
    });
  }, [editId]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  // Build a clean numeric size→price map from form input, sorted by weight
  const cleanSizePrices = useMemo(() => {
    const out: Record<string, number> = {};
    for (const s of SELECTABLE_SIZES) {
      const raw = sizePrices[s];
      const n = Number(raw);
      if (raw !== undefined && raw !== "" && Number.isFinite(n) && n > 0) {
        out[s] = n;
      }
    }
    return out;
  }, [sizePrices]);

  const orderedSelectedSizes = useMemo(
    () => Object.keys(cleanSizePrices).sort((a, b) => sizeRank(a) - sizeRank(b)),
    [cleanSizePrices]
  );

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = "Cake name is required";
    if (orderedSelectedSizes.length === 0) {
      errs.sizes = "Select at least one size and enter a valid price";
    }
    if (!form.category) errs.category = "Select a category";
    if (!preview && !editId) errs.image = "Upload an image";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const toggleSize = (s: string, checked: boolean) => {
    setSizePrices((prev) => {
      const next = { ...prev };
      if (checked) {
        if (next[s] === undefined) next[s] = "";
      } else {
        delete next[s];
      }
      return next;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate() || !userId) return;
    setLoading(true);
    try {
      let imageUrl = preview ?? "";

      if (imageFile) {
        imageUrl = await uploadCakeImage(imageFile);
      }

      const smallestSize = orderedSelectedSizes[0];
      const basePrice = cleanSizePrices[smallestSize];

      const payload = {
        name: form.name.trim(),
        price: basePrice,
        size: smallestSize,
        category: form.category,
        subcategory: form.subcategory,
        description: form.description.trim(),
        image: imageUrl,
        sizePrices: cleanSizePrices,
      };

      if (editId) {
        await updateCake(editId, payload);
        toast.success("Cake updated successfully!");
      } else {
        await addCake(payload, userId);
        toast.success("Cake added successfully!");
      }

      navigate("/admin/manage");
    } catch (err: any) {
      toast.error(err.message ?? "Failed to save cake");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardContent className="p-6">
          <h2 className="text-lg font-semibold text-foreground mb-5">
            {editId ? "Edit Cake" : "Add New Cake"}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <Label className="mb-2 block">Cake Image</Label>
              <div
                onClick={() => fileRef.current?.click()}
                className="border-2 border-dashed border-border rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer hover:border-primary/50 hover:bg-muted/30 transition-all min-h-[160px]"
              >
                {preview ? (
                  <img src={preview} alt="Preview" className="w-32 h-32 object-cover rounded-xl" />
                ) : (
                  <>
                    <ImageIcon className="w-10 h-10 text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground">Click to upload image</p>
                  </>
                )}
              </div>
              <input ref={fileRef} type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
              {errors.image && <p className="text-xs text-destructive mt-1">{errors.image}</p>}
            </div>

            <div>
              <Label htmlFor="name">Cake Name</Label>
              <Input
                id="name"
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                placeholder="e.g. Spider-Man Special Cake"
                className="mt-1.5"
              />
              {errors.name && <p className="text-xs text-destructive mt-1">{errors.name}</p>}
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={form.description}
                onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                placeholder="Tell customers what makes this cake special — flavour, ingredients, serving suggestion..."
                className="mt-1.5 min-h-[100px]"
              />
            </div>

            <div>
              <Label className="block">Sizes & Prices</Label>
              <p className="text-[11px] text-muted-foreground mt-0.5 mb-2">
                Tick the sizes this cake is available in (up to 3 kg) and enter the price for each.
                The smallest selected size becomes the default shown in the catalog.
              </p>
              <div className="space-y-2 rounded-xl border border-border p-3 bg-muted/20">
                {SELECTABLE_SIZES.map((s) => {
                  const checked = sizePrices[s] !== undefined;
                  return (
                    <div key={s} className="flex items-center gap-3">
                      <label className="flex items-center gap-2 w-24 shrink-0 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={(e) => toggleSize(s, e.target.checked)}
                          className="w-4 h-4 accent-primary cursor-pointer"
                        />
                        <span className="text-sm text-foreground">{s}</span>
                      </label>
                      <div className="flex-1 flex items-center gap-1">
                        <span className="text-sm text-muted-foreground">₹</span>
                        <Input
                          type="number"
                          min="0"
                          inputMode="numeric"
                          disabled={!checked}
                          value={sizePrices[s] ?? ""}
                          onChange={(e) =>
                            setSizePrices((prev) => ({ ...prev, [s]: e.target.value }))
                          }
                          placeholder={checked ? "e.g. 1200" : "—"}
                          className="h-9"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
              {errors.sizes && <p className="text-xs text-destructive mt-1">{errors.sizes}</p>}
            </div>

            <div>
              <Label>Category</Label>
              <Select
                value={form.category}
                onValueChange={(v) =>
                  setForm((f) => ({ ...f, category: v, subcategory: "" }))
                }
              >
                <SelectTrigger className="mt-1.5">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {[...CATEGORY_TREE]
                    .sort((a, b) => a.label.localeCompare(b.label))
                    .map((c) => (
                      <SelectItem key={c.label} value={c.label}>{c.label}</SelectItem>
                    ))}
                </SelectContent>
              </Select>
              {errors.category && <p className="text-xs text-destructive mt-1">{errors.category}</p>}
            </div>

            {subcategoryOptions.length > 0 && (
              <div>
                <Label>Sub-category (optional)</Label>
                <Select
                  value={form.subcategory}
                  onValueChange={(v) => setForm((f) => ({ ...f, subcategory: v }))}
                >
                  <SelectTrigger className="mt-1.5">
                    <SelectValue placeholder={`e.g. Spiderman Cakes (inside ${form.category})`} />
                  </SelectTrigger>
                  <SelectContent className="max-h-64">
                    {[...subcategoryOptions]
                      .sort((a, b) => a.localeCompare(b))
                      .map((s) => (
                        <SelectItem key={s} value={s}>{s}</SelectItem>
                      ))}
                  </SelectContent>
                </Select>
                <p className="text-[10px] text-muted-foreground mt-1">
                  Pick the exact sub-menu where this cake should appear (optional).
                </p>
              </div>
            )}

            <Button type="submit" className="w-full gap-2" disabled={loading}>
              <Upload className="w-4 h-4" />
              {loading ? "Saving..." : editId ? "Update Cake" : "Add Cake"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
