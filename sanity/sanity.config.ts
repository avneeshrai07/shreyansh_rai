"use client";

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./schemaTypes";
import { projectId, dataset } from "@/lib/sanity/client";

// Documents that should appear as a single editable entry (not a list).
const singletons = ["about", "contact"] as const;

export default defineConfig({
  name: "shreyansh-rai-studio",
  title: "Shreyansh Rai — Admin Dashboard",
  basePath: "/studio",
  projectId: projectId || "placeholder",
  dataset,
  schema: { types: schemaTypes },
  tools: (prev) => prev,
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Content")
          .items([
            S.listItem()
              .title("About Page")
              .id("about")
              .child(S.document().schemaType("about").documentId("about")),
            S.listItem()
              .title("Contact Page")
              .id("contact")
              .child(
                S.document().schemaType("contact").documentId("contact"),
              ),
            S.divider(),
            ...S.documentTypeListItems().filter(
              (listItem) =>
                !singletons.includes(
                  (listItem.getId() ?? "") as (typeof singletons)[number],
                ),
            ),
          ]),
    }),
  ],
});
