import type { Metadata } from "next";
import { getAllTestimonials } from "@/lib/content/db";
import { TestimonialsView } from "./TestimonialsView";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Client Testimonials",
  description:
    "Read what clients of Advocate Shreyansh Rai say about their experience with criminal law representation at the High Court Allahabad and Lucknow Bench.",
  alternates: { canonical: "https://shreyanshrai.com/testimonials" },
  openGraph: { url: "https://shreyanshrai.com/testimonials" },
};

export default async function TestimonialsPage() {
  const testimonials = await getAllTestimonials();
  return <TestimonialsView testimonials={testimonials} />;
}
