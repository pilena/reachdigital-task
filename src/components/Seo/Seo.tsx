import Head from "next/head";

type SeoProps = {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
};

const SITE_NAME = "ReachDigital Store";

export default function Seo({
  title,
  description,
  canonical,
  ogImage,
}: SeoProps) {
  const fullTitle = `${title} | ${SITE_NAME}`;

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      {ogImage && <meta property="og:image" content={ogImage} />}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />

      {canonical && <link rel="canonical" href={canonical} />}
    </Head>
  );
}
