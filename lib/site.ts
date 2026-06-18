/**
 * Site-wide constants. Phone/email/whatsapp are fallback placeholders used only
 * when the CMS Contact record leaves them blank — the footer and home-page
 * JSON-LD prefer the CMS values (see lib/content/db.ts → getContact).
 */
export const site = {
  baseUrl: "https://shreyanshrai.com",
  name: "Shreyansh Rai",
  phone: "+91 90000 00000",
  whatsapp: "+91 90000 00000",
  email: "contact@shreyanshrai.com",
  instagram: "https://www.instagram.com/shreyansh__r/",
  linkedin: "https://www.linkedin.com/in/shreyansh-rai-00433b100/",
};

/** Strip everything but digits and a leading + for tel:/wa.me links. */
export function telHref(phone: string) {
  return `tel:${phone.replace(/[^\d+]/g, "")}`;
}

export function whatsappHref(phone: string, message: string) {
  const digits = phone.replace(/\D/g, "");
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}
