import type { Metadata } from "next";
import { sanityFetch } from "@/lib/sanity/client";
import {
  ALL_TESTIMONIALS_QUERY,
  type Testimonial,
} from "@/lib/sanity/queries";
import { dummyTestimonials } from "@/lib/sanity/dummy";
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
  const testimonials = await sanityFetch<Testimonial[]>(
    ALL_TESTIMONIALS_QUERY,
    dummyTestimonials,
  );
  return (
    <TestimonialsView
      testimonials={testimonials?.length ? testimonials : dummyTestimonials}
    />
  );
}
