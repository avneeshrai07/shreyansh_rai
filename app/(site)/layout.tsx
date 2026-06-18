import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { getContact } from "@/lib/content/db";

// Chrome for the public-facing site only. The /admin area lives outside this
// route group, so it does not render the public navbar/footer.
export default async function SiteLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const contact = await getContact();

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:bg-brand-gold focus:text-white focus:px-4 focus:py-2 focus:rounded-lg focus:font-sans focus:text-sm focus:font-medium"
      >
        Skip to main content
      </a>
      <Navbar />
      <div className="flex-1">{children}</div>
      <Footer
        contact={{
          phone: contact?.phone,
          email: contact?.email,
          whatsapp: contact?.whatsapp,
        }}
      />
    </>
  );
}
