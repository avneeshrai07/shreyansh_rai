import type { SchemaTypeDefinition } from "sanity";

import { about } from "./about";
import { contact } from "./contact";
import { caseResult } from "./caseResult";
import { testimonial } from "./testimonial";

export const schemaTypes: SchemaTypeDefinition[] = [
  about,
  contact,
  caseResult,
  testimonial,
];
