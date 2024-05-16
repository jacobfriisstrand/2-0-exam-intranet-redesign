import { createClient, groq } from "next-sanity";

export async function getNavigation() {
  // Create the Sanity client
  const client = createClient({
    projectId: "2nmg5mzk",
    dataset: "production",
    apiVersion: "2024-05-13",
  });

  // Fetch the navigation data using a GROQ query
  const navigation =
    await client.fetch(groq` *[_id == 'navigation'][0].sections[_key == '2799662b29fa'][0].links[]{
  ...,
  target->{title, "slug": slug.current, _id},
  children[]{
    ...,
    target->{title, "slug": slug.current, _id},
    children[]{
      ...,
      target->{title, "slug": slug.current, _id}
    }
  }
}
`);

  return navigation;
}

export async function getPage(slug: string) {
  const client = createClient({
    projectId: "2nmg5mzk",
    dataset: "production",
    apiVersion: "2024-05-13",
  });

  const page = await client.fetch(
    groq`*[_type == "page" && slug.current == $slug][0]{
      _id,
      title,
      slug,
      subheadline,
    }`,
    { slug },
  );

  return page;
}
