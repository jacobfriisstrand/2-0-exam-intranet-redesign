import { InlineSvgPreviewItem } from "@focus-reactive/sanity-plugin-inline-svg-input";

export default {
  name: "navigation.link",
  type: "object",
  title: "Link",
  fields: [
    {
      type: "reference",
      name: "target",
      title: "Target page",
      to: [{ type: "page" }],
      description: "No target page turns the item into a subheading.",
    },
    {
      name: "svgIcon",
      title: "SVG Icon",
      type: "inlineSvg",
    },
    {
      type: "string",
      name: "title",
      title: "Title",
      description: "Override title from the target page.",
      validation: (Rule) =>
        Rule.custom((title, context) => {
          const targetTitle = context.document.target?.title;
          return targetTitle && title !== targetTitle
            ? `Title must be the same as the target page's title: ${targetTitle}`
            : true;
        }),
    },
    {
      type: "array",
      name: "children",
      title: "Children",
      of: [{ type: "navigation.link" }],
    },
  ],
  preview: {
    select: {
      icon: "svgIcon",
      title: "title",
      subtitle: "target.title",
    },
    prepare(selection) {
      const { icon, title, subtitle } = selection;
      return {
        title: title || subtitle,
        subtitle,
        icon,
      };
    },
    component: InlineSvgPreviewItem,
  },
  components: {
    preview: ({ icon, title, subtitle }) => {
      return (
        <InlineSvgPreviewItem icon={icon} title={title} subtitle={subtitle} />
      );
    },
  },
};
