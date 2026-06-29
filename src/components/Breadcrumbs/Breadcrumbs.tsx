import Head from "next/head";
import Link from "next/link";
import MuiBreadcrumbs from "@mui/material/Breadcrumbs";
import MuiLink from "@mui/material/Link";
import Typography from "@mui/material/Typography";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://reachdigital-task.vercel.app";

export type Crumb = { name: string; href: string };

export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  if (items.length === 0) return null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: `${SITE_URL}${c.href}`,
    })),
  };

  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>
      <MuiBreadcrumbs aria-label="Breadcrumb" sx={{ color: "#888", mb: 3 }}>
        {items.map((c, i) => {
          const isLast = i === items.length - 1;
          return isLast ? (
            <Typography key={c.href} sx={{ color: "#fff" }} aria-current="page">
              {c.name}
            </Typography>
          ) : (
            <MuiLink
              key={c.href}
              component={Link}
              href={c.href}
              underline="hover"
              sx={{ color: "#888", "&:hover": { color: "#fff" } }}
            >
              {c.name}
            </MuiLink>
          );
        })}
      </MuiBreadcrumbs>
    </>
  );
}
