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
      target->{title, slug, _id},
      children[]{
        ...,
        target->{title, slug, _id},
        children[]{
          ...,
          target->{title, slug, _id}
        }
      }
    }`);

  return navigation;
}
