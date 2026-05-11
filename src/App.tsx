import { useState, useCallback, lazy, Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CartProvider } from "@/context/CartContext";
import SplashScreen from "@/components/SplashScreen";
import SocialSidebar from "@/components/SocialSidebar";
import CartDrawer from "@/components/CartDrawer";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";

const GalleryPage = lazy(() => import("./pages/GalleryPage.tsx"));
const AboutPage = lazy(() => import("./pages/AboutPage.tsx"));
const ReviewsPage = lazy(() => import("./pages/ReviewsPage.tsx"));
const ContactPage = lazy(() => import("./pages/ContactPage.tsx"));
const CatalogPage = lazy(() => import("./pages/CatalogPage.tsx"));
const CustomCakePage = lazy(() => import("./pages/CustomCakePage.tsx"));
const CakeDetailPage = lazy(() => import("./pages/CakeDetailPage.tsx"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard.tsx"));
const AddCakePage = lazy(() => import("./pages/admin/AddCakePage.tsx"));
const ManageCakesPage = lazy(() => import("./pages/admin/ManageCakesPage.tsx"));
const AdminLoginPage = lazy(() => import("./pages/admin/AdminLoginPage.tsx"));
import AdminLayout from "@/components/admin/AdminLayout";

const queryClient = new QueryClient();

const App = () => {
  const [showSplash, setShowSplash] = useState(true);
  const handleSplashFinish = useCallback(() => setShowSplash(false), []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <CartProvider>
          <Toaster />
          <Sonner />
          {showSplash && <SplashScreen onFinish={handleSplashFinish} />}
          <BrowserRouter>
            <Suspense fallback={
              <div className="min-h-screen flex items-center justify-center bg-background">
                <div className="flex flex-col items-center gap-4">
                  <div className="relative w-12 h-12">
                    <div className="absolute inset-0 rounded-full border-2 border-primary/20" />
                    <div className="absolute inset-0 rounded-full border-2 border-primary border-t-transparent animate-spin" />
                    <div className="absolute inset-2 rounded-full border-2 border-secondary border-b-transparent animate-spin" style={{ animationDirection: "reverse", animationDuration: "0.8s" }} />
                  </div>
                  <p className="text-xs text-muted-foreground tracking-widest uppercase animate-pulse">Loading...</p>
                </div>
              </div>
            }>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/catalog" element={<CatalogPage />} />
                <Route path="/cake/:id" element={<CakeDetailPage />} />
                <Route path="/gallery" element={<GalleryPage />} />
                <Route path="/reviews" element={<ReviewsPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/custom-cake" element={<CustomCakePage />} />
                <Route path="/admin/login" element={<AdminLoginPage />} />
                <Route path="/admin" element={<AdminLayout><AdminDashboard /></AdminLayout>} />
                <Route path="/admin/add" element={<AdminLayout><AddCakePage /></AdminLayout>} />
                <Route path="/admin/manage" element={<AdminLayout><ManageCakesPage /></AdminLayout>} />
                <Route path="*" element={<NotFound />} />
              </Routes>
              <SocialSidebar />
              <CartDrawer />
            </Suspense>
          </BrowserRouter>
        </CartProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
