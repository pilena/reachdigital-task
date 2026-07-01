import Head from "next/head";
import { SITE_URL } from "@/lib/config";
import { Product } from "@/types/product";

export default function ProductListJsonLd({
  products,
}: {
  products: Product[];
}) {
  if (products.length === 0) return null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: products.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${SITE_URL}/product/${p.url_key}`,
      name: p.name ?? undefined,
    })),
  };

  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </Head>
  );
}
