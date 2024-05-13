import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import schemas from "./sanity/schemas";
import { deskStructure } from "./sanity/structure/deskStructure";
import { inlineSvgInput } from "@focus-reactive/sanity-plugin-inline-svg-input";
import { visionTool } from "@sanity/vision";

const singletonSchemas = ["siteSettings", "navigation"];

const config = defineConfig({
  projectId: "2nmg5mzk",
  dataset: "production",
  title: "AKQA Intranet Redesign",
  apiVersion: "2024-05-13",
  basePath: "/admin",
  plugins: [
    structureTool({ structure: deskStructure }),
    inlineSvgInput(),
    visionTool(),
  ],
  schema: {
    types: schemas,
  },
  document: {
    newDocumentOptions: (prev, { creationContext }) => {
      const { type } = creationContext;
      if (type === "global") {
        return prev.filter(
          (template) => !singletonSchemas.includes(template.templateId),
        );
      }
      return prev;
    },
  },
});

export default config;
