import Head from "next/head";
import { SITE_URL } from "@/lib/config";

type SeoProps = {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  siteSchema?: boolean;
};

const SITE_NAME = "GraphCommerce";
const DEFAULT_OG = "/og.jpg";

export default function Seo({
  title,
  description,
  canonical,
  ogImage,
  siteSchema,
}: SeoProps) {
  const fullTitle = `${title} | ${SITE_NAME}`;

  const ogImageUrl = ogImage
    ? ogImage.startsWith("http")
      ? ogImage
      : `${SITE_URL}${ogImage}`
    : `${SITE_URL}${DEFAULT_OG}`;

  return (
    <>
      {siteSchema && (
        <>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Organization",
                name: SITE_NAME,
                url: SITE_URL,
                logo: `${SITE_URL}/graphqcommerce_logo.svg`,
              }),
            }}
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "WebSite",
                name: SITE_NAME,
                url: SITE_URL,
              }),
            }}
          />
        </>
      )}
      <Head>
        <title>{fullTitle}</title>
        <meta name="description" content={description} />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={SITE_NAME} />
        <meta property="og:title" content={fullTitle} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={ogImageUrl} />
        <meta name="twitter:image" content={ogImageUrl} />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={fullTitle} />
        <meta name="twitter:description" content={description} />

        {canonical && <link rel="canonical" href={canonical} />}
      </Head>
    </>
  );
}
