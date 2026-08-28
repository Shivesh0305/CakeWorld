import { useEffect, useMemo, useState, type FormEvent } from "react";
import { ArrowLeft, Check, Eye, EyeOff, LogOut, Pencil, Plus, Save, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { apiErrorMessage, useAuth } from "@/lib/auth";
import { apiGet, apiPatch, apiPost } from "@/lib/api";

type MenuItem = {
  id: string;
  name: string;
  name_kn: string;
  category: string;
  category_kn: string;
  description: string;
  description_kn: string;
  price_inr: number | null;
  image_url: string;
  alt: string;
  is_visible: boolean;
  is_featured: boolean;
  sort_order: number;
};

type Draft = {
  name: string;
  name_kn: string;
  category: string;
  category_kn: string;
  description: string;
  description_kn: string;
  price_inr: string;
  image_url: string;
  alt: string;
  is_visible: boolean;
  is_featured: boolean;
  sort_order: string;
};

const emptyDraft: Draft = {
  name: "",
  name_kn: "",
  category: "",
  category_kn: "",
  description: "",
  description_kn: "",
  price_inr: "",
  image_url: "",
  alt: "Bakery menu item",
  is_visible: true,
  is_featured: false,
  sort_order: "0",
};

function draftFromItem(item: MenuItem): Draft {
  return {
    name: item.name,
    name_kn: item.name_kn,
    category: item.category,
    category_kn: item.category_kn,
    description: item.description,
    description_kn: item.description_kn,
    price_inr: item.price_inr === null ? "" : String(item.price_inr),
    image_url: item.image_url,
    alt: item.alt,
    is_visible: item.is_visible,
    is_featured: item.is_featured,
    sort_order: String(item.sort_order),
  };
}

function payloadFromDraft(draft: Draft) {
  const price = draft.price_inr.trim() ? Number(draft.price_inr) : null;
  const sortOrder = Number(draft.sort_order || 0);
  if ((price !== null && Number.isNaN(price)) || Number.isNaN(sortOrder)) throw new Error("Use numbers for price and order.");
  return { ...draft, price_inr: price, sort_order: sortOrder };
}

export default function OwnerMenu() {
  const { user, logout } = useAuth();
  const [items, setItems] = useState<MenuItem[]>([]);
  const [draft, setDraft] = useState<Draft>(emptyDraft);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const visibleCount = useMemo(() => items.filter((item) => item.is_visible).length, [items]);

  const loadItems = async () => {
    setLoading(true);
    try {
      setItems(await apiGet<MenuItem[]>("/menu/admin"));
    } catch (nextError) {
      setError(apiErrorMessage(nextError));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadItems();
  }, []);

  const updateDraft = (field: keyof Draft, value: string | boolean) => {
    setDraft((current) => ({ ...current, [field]: value }));
  };

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaving(true);
    setError("");
    setNotice("");
    try {
      const payload = payloadFromDraft(draft);
      if (editingId) await apiPatch<MenuItem>(`/menu/admin/${editingId}`, payload);
      else await apiPost<MenuItem>("/menu/admin", payload);
      setDraft(emptyDraft);
      setEditingId(null);
      setNotice("Menu saved. The public counter is updated.");
      await loadItems();
    } catch (nextError) {
      setError(nextError instanceof Error && !(nextError as { body?: unknown }).body ? nextError.message : apiErrorMessage(nextError));
    } finally {
      setSaving(false);
    }
  };

  const toggleVisibility = async (item: MenuItem) => {
    setError("");
    setNotice("");
    try {
      await apiPatch<MenuItem>(`/menu/admin/${item.id}`, { ...item, is_visible: !item.is_visible });
      setNotice(item.is_visible ? "Item hidden from the public menu." : "Item is visible again.");
      await loadItems();
    } catch (nextError) {
      setError(apiErrorMessage(nextError));
    }
  };

  const hideItem = async (item: MenuItem) => {
    if (item.is_visible) await toggleVisibility(item);
  };

  const signOut = async () => {
    await logout();
    window.location.href = "/owner/login";
  };

  return (
    <main className="admin-shell" data-testid="owner-menu-page">
      <header className="admin-header">
        <div>
          <Link className="admin-back-link" to="/" data-testid="owner-menu-home-link"><ArrowLeft size={16} /> Cake World Bakery</Link>
          <h1>Live counter editor</h1>
        </div>
        <div className="admin-account"><span>{user?.email}</span><button type="button" onClick={signOut} data-testid="owner-logout-button"><LogOut size={15} /> Sign out</button></div>
      </header>
      <div className="admin-layout">
        <section className="admin-panel admin-list-panel">
          <div className="admin-panel-heading"><div><span className="eyebrow">Public menu</span><h2>{String(visibleCount).padStart(2, "0")} visible choices</h2></div><button className="admin-outline-button" type="button" onClick={() => { setEditingId(null); setDraft(emptyDraft); setNotice(""); }} data-testid="owner-new-item-button"><Plus size={16} /> Add item</button></div>
          {loading && <p className="admin-muted" data-testid="owner-menu-loading">Loading the counter…</p>}
          <div className="admin-items-list">
            {items.map((item) => (
              <article className={`admin-menu-item ${item.is_visible ? "" : "is-hidden"}`} key={item.id} data-testid={`owner-menu-item-${item.id}`}>
                {item.image_url ? <img src={item.image_url} alt="" /> : <div className="admin-thumb-fallback">CW</div>}
                <div className="admin-item-info"><div className="admin-item-title"><strong>{item.name}</strong>{item.is_featured && <span>Featured</span>}</div><small>{item.category} · {item.price_inr === null ? "Price not set" : `₹${item.price_inr}`}</small><p>{item.is_visible ? "Visible to visitors" : "Hidden from visitors"}</p></div>
                <div className="admin-item-actions"><button type="button" onClick={() => { setEditingId(item.id); setDraft(draftFromItem(item)); setNotice(""); }} aria-label={`Edit ${item.name}`} data-testid={`owner-edit-${item.id}`}><Pencil size={15} /></button><button type="button" onClick={() => toggleVisibility(item)} aria-label={`${item.is_visible ? "Hide" : "Show"} ${item.name}`} data-testid={`owner-toggle-${item.id}`}>{item.is_visible ? <EyeOff size={15} /> : <Eye size={15} />}</button>{item.is_visible && <button type="button" onClick={() => hideItem(item)} aria-label={`Hide ${item.name}`} data-testid={`owner-hide-${item.id}`}><Trash2 size={15} /></button>}</div>
              </article>
            ))}
          </div>
        </section>
        <section className="admin-panel admin-editor-panel">
          <div className="admin-panel-heading"><div><span className="eyebrow">{editingId ? "Editing item" : "New item"}</span><h2>{editingId ? "Shape the counter card." : "Add today's choice."}</h2></div>{editingId && <button className="admin-close-button" type="button" onClick={() => { setEditingId(null); setDraft(emptyDraft); }} data-testid="owner-cancel-edit-button">Clear</button>}</div>
          <form className="admin-form editor-form" onSubmit={submit}>
            <div className="admin-form-grid">
              <label className="admin-field"><span>English name</span><input value={draft.name} onChange={(event) => updateDraft("name", event.target.value)} required data-testid="owner-item-name-input" /></label>
              <label className="admin-field"><span>Kannada name</span><input value={draft.name_kn} onChange={(event) => updateDraft("name_kn", event.target.value)} data-testid="owner-item-name-kn-input" /></label>
              <label className="admin-field"><span>English category</span><input value={draft.category} onChange={(event) => updateDraft("category", event.target.value)} required data-testid="owner-item-category-input" /></label>
              <label className="admin-field"><span>Kannada category</span><input value={draft.category_kn} onChange={(event) => updateDraft("category_kn", event.target.value)} data-testid="owner-item-category-kn-input" /></label>
            </div>
            <label className="admin-field"><span>English description</span><textarea value={draft.description} onChange={(event) => updateDraft("description", event.target.value)} required data-testid="owner-item-description-input" /></label>
            <label className="admin-field"><span>Kannada description</span><textarea value={draft.description_kn} onChange={(event) => updateDraft("description_kn", event.target.value)} data-testid="owner-item-description-kn-input" /></label>
            <div className="admin-form-grid admin-form-grid-three"><label className="admin-field"><span>Price in ₹</span><input type="number" min="0" value={draft.price_inr} onChange={(event) => updateDraft("price_inr", event.target.value)} placeholder="Leave blank to ask" data-testid="owner-item-price-input" /></label><label className="admin-field"><span>Display order</span><input type="number" min="0" value={draft.sort_order} onChange={(event) => updateDraft("sort_order", event.target.value)} data-testid="owner-item-order-input" /></label><label className="admin-field"><span>Image URL</span><input value={draft.image_url} onChange={(event) => updateDraft("image_url", event.target.value)} placeholder="Optional" data-testid="owner-item-image-input" /></label></div>
            <label className="admin-field"><span>Image alt text</span><input value={draft.alt} onChange={(event) => updateDraft("alt", event.target.value)} data-testid="owner-item-alt-input" /></label>
            <div className="admin-checks"><label><input type="checkbox" checked={draft.is_visible} onChange={(event) => updateDraft("is_visible", event.target.checked)} data-testid="owner-item-visible-checkbox" /><span>Show on public menu</span></label><label><input type="checkbox" checked={draft.is_featured} onChange={(event) => updateDraft("is_featured", event.target.checked)} data-testid="owner-item-featured-checkbox" /><span>Feature this item</span></label></div>
            {error && <p className="admin-error" role="alert" data-testid="owner-menu-error">{error}</p>}
            {notice && <p className="admin-notice" role="status" data-testid="owner-menu-notice"><Check size={15} /> {notice}</p>}
            <button className="admin-primary-button" type="submit" disabled={saving} data-testid="owner-save-item-button"><Save size={16} /> {saving ? "Saving…" : editingId ? "Save changes" : "Add to live menu"}</button>
          </form>
        </section>
      </div>
    </main>
  );
}
