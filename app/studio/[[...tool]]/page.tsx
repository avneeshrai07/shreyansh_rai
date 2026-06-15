import { NextStudio } from "next-sanity/studio";
import config from "@/sanity/sanity.config";

// The studio is a fully client-driven, single-page app — render it dynamically
// and never prerender. (next-sanity recommended route config.)
export const dynamic = "force-static";

export { metadata, viewport } from "next-sanity/studio";

export default function StudioPage() {
  return <NextStudio config={config} />;
}
