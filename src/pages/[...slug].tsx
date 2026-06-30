import type { GetStaticPaths, GetStaticProps } from "next";
import Container from "@mui/material/Container";
import Layout from "@/components/layout/Layout";
import Seo from "@/components/common/Seo";
import Breadcrumbs, { Crumb } from "@/components/common/Breadcrumbs";
import CategoryLanding from "@/components/category/CategoryLanding";
import Plp from "@/components/category/Plp";
import { CategoriesQuery } from "@/generated/graphql";
import { getCategories } from "@/lib/queries/getCategories";
import { getCategoryLanding } from "@/lib/queries/getCategoryLanding";
import { getCategoryProducts } from "@/lib/queries/getCategoryProducts";
import { Product } from "@/types/product";
import { Subcategory } from "@/types/subcategory";
import { SITE_URL } from "@/lib/config";
import { notNull } from "@/lib/utils";

type SeoData = { title: string; description: string; canonical: string };
type Categories = CategoriesQuery["categories"];

type LandingProps = {
  variant: "landing";
  categories: Categories;
  seo: SeoData;
  name: string;
  subcategories: Subcategory[];
  products: Product[];
  breadcrumbs: Crumb[];
};

type PlpProps = {
  variant: "plp";
  categories: Categories;
  seo: SeoData;
  categoryId: number;
  categoryName: string;
  initialProducts: Product[];
  initialTotalPages: number;
  breadcrumbs: Crumb[];
};

type PageProps = LandingProps | PlpProps;

export default function CategoryPage(props: PageProps) {
  return (
    <Layout categories={props.categories}>
      <Seo
        title={props.seo.title}
        description={props.seo.description}
        canonical={props.seo.canonical}
      />
      <Container maxWidth="lg" sx={{ pt: 3 }}>
        <Breadcrumbs items={props.breadcrumbs} />
      </Container>
      {props.variant === "landing" ? (
        <CategoryLanding
          name={props.name}
          subcategories={props.subcategories}
          products={props.products}
        />
      ) : (
        <Plp
          categoryId={props.categoryId}
          categoryName={props.categoryName}
          initialProducts={props.initialProducts}
          initialTotalPages={props.initialTotalPages}
        />
      )}
    </Layout>
  );
}

type OneCategoryNode = {
  name: string | null;
  url_key: string | null;
  children?: (OneCategoryNode | null)[] | null;
};

// build breadcrums on tree of categories
function buildCrumbs(
  roots: (OneCategoryNode | null)[],
  slug: string[],
): Crumb[] {
  const crumbs: Crumb[] = [{ name: "Home", href: "/" }];
  let level: (OneCategoryNode | null)[] = roots;
  let acc = "";
  for (const key of slug) {
    const node = level.find((c) => c?.url_key === key) ?? null;
    acc += `/${key}`;
    crumbs.push({ name: node?.name ?? key, href: acc });
    level = node?.children ?? [];
  }
  return crumbs;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const data = await getCategories();
  const roots = (data.categories?.items?.[0]?.children ??
    []) as unknown as (OneCategoryNode | null)[];

  const paths: { params: { slug: string[] } }[] = [];
  const walk = (
    nodes: (OneCategoryNode | null)[] | null | undefined,
    parent: string[],
  ) => {
    for (const n of nodes ?? []) {
      if (!n?.url_key) continue;
      const slug = [...parent, n.url_key];
      paths.push({ params: { slug } });
      walk(n.children, slug);
    }
  };
  walk(roots, []);

  return { paths, fallback: "blocking" };
};

export const getStaticProps: GetStaticProps<PageProps> = async ({ params }) => {
  const slug = (params?.slug as string[] | undefined) ?? [];
  if (slug.length === 0) return { notFound: true };

  const categoriesData = await getCategories();
  const categories = categoriesData.categories;
  const roots = (categories?.items?.[0]?.children ??
    []) as unknown as (OneCategoryNode | null)[];

  const urlPath = slug.join("/");
  const data = await getCategoryLanding(urlPath);
  const cat = data.categories?.items?.[0];
  if (!cat) return { notFound: true };

  const breadcrumbs = buildCrumbs(roots, slug);
  const children = (cat.children ?? []).filter(notNull);
  const canonical = `${SITE_URL}/${urlPath}`;

  if (children.length > 0) {
    return {
      props: {
        variant: "landing",
        categories,
        seo: {
          title: cat.meta_title || cat.name || "Category",
          description: cat.meta_description || `Shop ${cat.name} at our store.`,
          canonical,
        },
        name: cat.name ?? "",
        subcategories: children,
        products: (cat.products?.items ?? []).filter(notNull),
        breadcrumbs,
      },
      revalidate: 60,
    };
  }

  if (!cat.id) return { notFound: true };

  const productsData = await getCategoryProducts({
    filter: { category_id: { eq: String(cat.id) } },
    pageSize: 12,
    currentPage: 1,
  });

  return {
    props: {
      variant: "plp",
      categories,
      seo: {
        title: cat.meta_title || cat.name || "Products",
        description: cat.meta_description || `Browse ${cat.name} products.`,
        canonical,
      },
      categoryId: cat.id,
      categoryName: cat.name ?? "",
      initialProducts: (productsData.products?.items ?? []).filter(notNull),
      initialTotalPages: productsData.products?.page_info?.total_pages ?? 1,
      breadcrumbs,
    },
    revalidate: 60,
  };
};
