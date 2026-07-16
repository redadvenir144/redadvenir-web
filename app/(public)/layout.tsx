import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";
import PageTransition from "@/components/PageTransition";
import Breadcrumbs from "@/components/Breadcrumbs";
import { getFaqs } from "@/lib/content";

// El pie de página usa texto editable (ver components/Footer.tsx). Revalidar el
// segmento público cada 60 s asegura que los cambios del admin se reflejen en
// todas las páginas sin reconstruir.
export const revalidate = 60;

export default async function PublicLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const faqs = await getFaqs();

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <Breadcrumbs />
      <main className="flex-1">
        <PageTransition>{children}</PageTransition>
      </main>
      <Footer />
      <Chatbot faqs={faqs} />
    </div>
  );
}
