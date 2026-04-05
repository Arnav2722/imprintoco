import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAdmin } from "@/hooks/use-admin";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Pencil, Trash2, LogOut, ArrowLeft, Search, X } from "lucide-react";
import { Constants } from "@/integrations/supabase/types";
import type { DbProduct } from "@/hooks/use-products";

type ProductForm = {
  name: string;
  price: string;
  description: string;
  image_url: string;
  category: "stickers" | "posters" | "combo";
  subcategory: string;
  badge: string;
  available_sizes: string[];
  is_active: boolean;
};

const emptyForm: ProductForm = {
  name: "",
  price: "",
  description: "",
  image_url: "",
  category: "posters",
  subcategory: "custom",
  badge: "",
  available_sizes: [],
  is_active: true,
};

const categories = Constants.public.Enums.product_category;
const subcategories = Constants.public.Enums.product_subcategory;
const sizes = Constants.public.Enums.poster_size;

const Admin = () => {
  const { isAdmin, loading: adminLoading } = useAdmin();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [products, setProducts] = useState<DbProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterCat, setFilterCat] = useState("all");

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<ProductForm>(emptyForm);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!adminLoading && !isAdmin) {
      navigate("/auth");
    }
  }, [isAdmin, adminLoading, navigate]);

  const fetchProducts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });
    if (!error && data) setProducts(data as unknown as DbProduct[]);
    setLoading(false);
  };

  useEffect(() => {
    if (isAdmin) fetchProducts();
  }, [isAdmin]);

  const openNew = () => {
    setEditingId(null);
    setForm(emptyForm);
    setShowForm(true);
  };

  const openEdit = (p: DbProduct) => {
    setEditingId(p.id);
    setForm({
      name: p.name,
      price: String(p.price),
      description: p.description || "",
      image_url: p.image_url || "",
      category: p.category,
      subcategory: p.subcategory,
      badge: p.badge || "",
      available_sizes: p.available_sizes || [],
      is_active: p.is_active,
    });
    setShowForm(true);
  };

  const handleSave = async () => {
    if (!form.name || !form.price) {
      toast({ title: "Name and price are required", variant: "destructive" });
      return;
    }
    setSaving(true);
    const payload = {
      name: form.name,
      price: parseFloat(form.price),
      description: form.description || null,
      image_url: form.image_url || null,
      category: form.category as any,
      subcategory: form.subcategory as any,
      badge: form.badge || null,
      available_sizes: form.available_sizes as any,
      is_active: form.is_active,
    };

    let error;
    if (editingId) {
      ({ error } = await supabase.from("products").update(payload).eq("id", editingId));
    } else {
      ({ error } = await supabase.from("products").insert(payload));
    }

    if (error) {
      toast({ title: "Error saving product", description: error.message, variant: "destructive" });
    } else {
      toast({ title: editingId ? "Product updated" : "Product created" });
      setShowForm(false);
      fetchProducts();
    }
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this product?")) return;
    const { error } = await supabase.from("products").delete().eq("id", id);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Product deleted" });
      fetchProducts();
    }
  };

  const toggleSize = (size: string) => {
    setForm((f) => ({
      ...f,
      available_sizes: f.available_sizes.includes(size)
        ? f.available_sizes.filter((s) => s !== size)
        : [...f.available_sizes, size],
    }));
  };

  const filtered = products.filter((p) => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchCat = filterCat === "all" || p.category === filterCat;
    return matchSearch && matchCat;
  });

  if (adminLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground font-body">Checking access...</p>
      </div>
    );
  }

  if (!isAdmin) return null;

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border sticky top-0 z-50 bg-background/95 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate("/")} className="text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="font-display text-xl font-bold tracking-tight uppercase">Admin Panel</h1>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="cta" size="sm" onClick={openNew}>
              <Plus className="w-4 h-4 mr-1" /> Add Product
            </Button>
            <button
              onClick={async () => { await supabase.auth.signOut(); navigate("/"); }}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 bg-card border-border"
            />
          </div>
          <div className="flex gap-2">
            {["all", ...categories].map((cat) => (
              <button
                key={cat}
                onClick={() => setFilterCat(cat)}
                className={`px-3 py-1.5 text-xs font-display tracking-wider uppercase transition-colors border ${
                  filterCat === cat
                    ? "border-primary text-primary bg-primary/10"
                    : "border-border text-muted-foreground hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          <div className="bg-card border border-border p-4">
            <p className="text-2xl font-display font-bold">{products.length}</p>
            <p className="text-xs text-muted-foreground font-body">Total Products</p>
          </div>
          <div className="bg-card border border-border p-4">
            <p className="text-2xl font-display font-bold">{products.filter((p) => p.is_active).length}</p>
            <p className="text-xs text-muted-foreground font-body">Active</p>
          </div>
          <div className="bg-card border border-border p-4">
            <p className="text-2xl font-display font-bold">{products.filter((p) => p.category === "posters").length}</p>
            <p className="text-xs text-muted-foreground font-body">Posters</p>
          </div>
          <div className="bg-card border border-border p-4">
            <p className="text-2xl font-display font-bold">{products.filter((p) => p.category === "stickers").length}</p>
            <p className="text-xs text-muted-foreground font-body">Stickers</p>
          </div>
        </div>

        {/* Product table */}
        {loading ? (
          <p className="text-muted-foreground text-center py-12">Loading products...</p>
        ) : (
          <div className="border border-border overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-card">
                  <th className="text-left p-3 font-display text-xs tracking-wider uppercase text-muted-foreground">Product</th>
                  <th className="text-left p-3 font-display text-xs tracking-wider uppercase text-muted-foreground">Category</th>
                  <th className="text-left p-3 font-display text-xs tracking-wider uppercase text-muted-foreground">Price</th>
                  <th className="text-left p-3 font-display text-xs tracking-wider uppercase text-muted-foreground">Status</th>
                  <th className="text-right p-3 font-display text-xs tracking-wider uppercase text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((p) => (
                  <tr key={p.id} className="border-b border-border/50 hover:bg-card/50 transition-colors">
                    <td className="p-3">
                      <div className="flex items-center gap-3">
                        {p.image_url ? (
                          <img src={p.image_url} alt={p.name} className="w-10 h-10 object-cover" />
                        ) : (
                          <div className="w-10 h-10 bg-surface-container flex items-center justify-center text-muted-foreground text-xs">?</div>
                        )}
                        <div>
                          <p className="font-display text-sm font-semibold">{p.name}</p>
                          <p className="text-xs text-muted-foreground">{p.subcategory}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-3 font-body text-muted-foreground capitalize">{p.category}</td>
                    <td className="p-3 font-display font-semibold">₹{p.price}</td>
                    <td className="p-3">
                      <span className={`text-xs font-display tracking-wider px-2 py-0.5 ${p.is_active ? "text-green-400 bg-green-400/10" : "text-red-400 bg-red-400/10"}`}>
                        {p.is_active ? "ACTIVE" : "INACTIVE"}
                      </span>
                    </td>
                    <td className="p-3 text-right">
                      <div className="flex justify-end gap-2">
                        <button onClick={() => openEdit(p)} className="p-1.5 text-muted-foreground hover:text-primary transition-colors">
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleDelete(p.id)} className="p-1.5 text-muted-foreground hover:text-destructive transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-muted-foreground">No products found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Form modal */}
      {showForm && (
        <div className="fixed inset-0 z-[100] bg-background/80 backdrop-blur-sm flex items-start justify-center pt-20 px-4 overflow-y-auto">
          <div className="bg-card border border-border w-full max-w-lg p-6 mb-20">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-lg font-bold tracking-tight uppercase">
                {editingId ? "Edit Product" : "New Product"}
              </h2>
              <button onClick={() => setShowForm(false)} className="text-muted-foreground hover:text-foreground">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="font-display text-[10px] tracking-widest text-muted-foreground uppercase block mb-1">Name *</label>
                <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="bg-surface-container-highest border-border" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-display text-[10px] tracking-widest text-muted-foreground uppercase block mb-1">Price (₹) *</label>
                  <Input type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} className="bg-surface-container-highest border-border" />
                </div>
                <div>
                  <label className="font-display text-[10px] tracking-widest text-muted-foreground uppercase block mb-1">Badge</label>
                  <Input value={form.badge} onChange={(e) => setForm({ ...form, badge: e.target.value })} placeholder="e.g. NEW, HOT" className="bg-surface-container-highest border-border" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-display text-[10px] tracking-widest text-muted-foreground uppercase block mb-1">Category</label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value as any })}
                    className="w-full bg-surface-container-highest text-foreground text-sm font-body px-3 py-2 border border-border outline-none focus:border-primary"
                  >
                    {categories.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="font-display text-[10px] tracking-widest text-muted-foreground uppercase block mb-1">Subcategory</label>
                  <select
                    value={form.subcategory}
                    onChange={(e) => setForm({ ...form, subcategory: e.target.value })}
                    className="w-full bg-surface-container-highest text-foreground text-sm font-body px-3 py-2 border border-border outline-none focus:border-primary"
                  >
                    {subcategories.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="font-display text-[10px] tracking-widest text-muted-foreground uppercase block mb-1">Description</label>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  rows={3}
                  className="w-full bg-surface-container-highest text-foreground text-sm font-body px-3 py-2 border border-border outline-none focus:border-primary resize-none"
                />
              </div>

              <div>
                <label className="font-display text-[10px] tracking-widest text-muted-foreground uppercase block mb-1">Image URL</label>
                <Input value={form.image_url} onChange={(e) => setForm({ ...form, image_url: e.target.value })} placeholder="https://..." className="bg-surface-container-highest border-border" />
              </div>

              {form.category === "posters" && (
                <div>
                  <label className="font-display text-[10px] tracking-widest text-muted-foreground uppercase block mb-1">Available Sizes</label>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {sizes.map((size) => (
                      <button
                        key={size}
                        type="button"
                        onClick={() => toggleSize(size)}
                        className={`px-3 py-1 text-xs font-display tracking-wider border transition-colors ${
                          form.available_sizes.includes(size)
                            ? "border-primary text-primary bg-primary/10"
                            : "border-border text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setForm({ ...form, is_active: !form.is_active })}
                  className={`w-10 h-5 rounded-full transition-colors relative ${form.is_active ? "bg-primary" : "bg-border"}`}
                >
                  <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-foreground transition-transform ${form.is_active ? "left-5" : "left-0.5"}`} />
                </button>
                <span className="text-sm font-body text-muted-foreground">{form.is_active ? "Active" : "Inactive"}</span>
              </div>

              <div className="flex gap-3 pt-2">
                <Button variant="outline" className="flex-1" onClick={() => setShowForm(false)}>Cancel</Button>
                <Button variant="cta" className="flex-1" onClick={handleSave} disabled={saving}>
                  {saving ? "Saving..." : editingId ? "Update" : "Create"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
