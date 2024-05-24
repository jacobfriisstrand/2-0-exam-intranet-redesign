export default {
  name: "canteenMenuSchema",
  type: "document",
  title: "Canteen Menu",

  fields: [
    {
      name: "dayOfWeek",
      type: "number",
      title: "Day of week",
      options: {
        list: [1, 2, 3, 4, 5],
      },
    },
    {
      name: "day",
      type: "string",
      title: "Day",
      options: {
        list: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      },
    },
    {
      name: "Copenhagen",
      type: "object",
      title: "Copenhagen",
      options: { collapsible: true, collapsed: true },
      fields: [
        {
          name: "mainDish",
          type: "string",
          title: "Main dish",
        },
        {
          name: "veganDish",
          type: "string",
          title: "Vegan dish",
        },
      ],
    },
    {
      name: "Berlin",
      type: "object",
      title: "Berlin",
      options: { collapsible: true, collapsed: true },
      fields: [
        {
          name: "mainDish",
          type: "string",
          title: "Main dish",
        },
        {
          name: "veganDish",
          type: "string",
          title: "Vegan dish",
        },
      ],
    },
    {
      name: "Cairo",
      type: "object",
      title: "Cairo",
      options: { collapsible: true, collapsed: true },
      fields: [
        {
          name: "mainDish",
          type: "string",
          title: "Main dish",
        },
        {
          name: "veganDish",
          type: "string",
          title: "Vegan dish",
        },
      ],
    },
    {
      name: "London",
      type: "object",
      title: "London",
      options: { collapsible: true, collapsed: true },
      fields: [
        {
          name: "mainDish",
          type: "string",
          title: "Main dish",
        },
        {
          name: "veganDish",
          type: "string",
          title: "Vegan dish",
        },
      ],
    },
    {
      name: "Aarhus",
      type: "object",
      title: "Aarhus",
      options: { collapsible: true, collapsed: true },
      fields: [
        {
          name: "mainDish",
          type: "string",
          title: "Main dish",
        },
        {
          name: "veganDish",
          type: "string",
          title: "Vegan dish",
        },
      ],
    },
  ],
};
