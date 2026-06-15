/**
 * Site-wide constants. Phone/email are placeholders until the real values are
 * entered in Sanity (Contact singleton) — update here for the footer + JSON-LD.
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
