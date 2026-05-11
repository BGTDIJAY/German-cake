import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { fetchCakes, type CakeProduct } from "@/lib/adminApi";
import SEO from "@/components/SEO";

/**
 * Detail pages have been replaced by an in-place quick-view modal on the
 * catalog. We still render this route so search engines crawling /cake/:id
 * URLs from the sitemap can pick up cake-specific meta tags before the
 * client-side redirect to /catalog?pin=<id>.
 */
export default function CakeDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [cake, setCake] = useState<CakeProduct | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetchCakes()
      .then((cakes) => {
        if (cancelled) return;
        setCake(cakes.find((c) => c.id === id) ?? null);
      })
      .catch(() => {})
      .finally(() => !cancelled && setReady(true));
    return () => {
      cancelled = true;
    };
  }, [id]);

  if (!id) return <Navigate to="/catalog" replace />;

  // Wait one tick so Helmet can apply the cake-specific meta to the document
  if (!ready) {
    return (
      <>
        <SEO
          title="Loading Cake | German Cakes Jaipur"
          description="Loading cake details from German Cakes, Bindayaka's premium bakery in Jaipur."
          path={`/cake/${id}`}
        />
        <div className="min-h-screen flex items-center justify-center bg-background">
          <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
        </div>
      </>
    );
  }

  if (cake) {
    return (
      <>
        <SEO
          title={`${cake.name} | German Cakes Bindayaka Jaipur — ₹${cake.price}`}
          description={
            (cake.description?.slice(0, 155) ||
              `Order ${cake.name} online from German Cakes, Bindayaka. Premium ${cake.category}${cake.subcategory ? ` (${cake.subcategory})` : ""} freshly baked in Jaipur.`).trim()
          }
          path={`/cake/${cake.id}`}
          image={cake.image || undefined}
          type="product"
          keywords={`${cake.name}, ${cake.category}, ${cake.subcategory}, custom cakes Jaipur, German Cakes, order ${cake.name} online, cake delivery Jaipur`}
        />
        <Navigate to={`/catalog?pin=${cake.id}`} replace />
      </>
    );
  }

  return <Navigate to="/catalog" replace />;
}
