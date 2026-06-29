import { GetServerSideProps } from "next";
import { apolloClient } from "@/lib/apolloClient";
import { CategoriesDocument, CategoriesQuery } from "@/generated/graphql";
import { getHomepageProducts } from "@/lib/queries/getHomepageProducts";

const SITE_URL = "https://reachdigital-task.vercel.app";

const toUrl = (loc: string) => `<url><loc>${SITE_URL}${loc}</loc></url>`;

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const [catRes, productsRes] = await Promise.all([
    apolloClient.query<CategoriesQuery>({ query: CategoriesDocument }),
    getHomepageProducts(),
  ]);

  const paths: string[] = ["/"];

  const root = catRes.data.categories?.items?.[0]?.children ?? [];
  for (const top of root) {
    if (!top?.url_key) continue;
    paths.push(`/${top.url_key}`);
    for (const child of top.children ?? []) {
      if (child?.url_key) paths.push(`/${top.url_key}/${child.url_key}`);
    }
  }

  for (const p of productsRes.products?.items ?? []) {
    if (p?.url_key) paths.push(`/product/${p.url_key}`);
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${paths
    .map(toUrl)
    .join("")}</urlset>`;

  res.setHeader("Content-Type", "text/xml");
  res.write(xml);
  res.end();

  return { props: {} };
};

export default function Sitemap() {
  return null;
}
