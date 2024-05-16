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
      type: "string",
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
};
