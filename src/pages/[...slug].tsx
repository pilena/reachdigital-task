import type { GetStaticPaths, GetStaticProps } from "next";
import Layout from "@/components/Layout/Layout";
import Seo from "@/components/Seo/Seo";
import CategoryLanding from "@/components/CategoryLanding/CategoryLanding";
import Plp from "@/components/Plp/Plp";
import { CategoriesQuery } from "@/generated/graphql";
import { getCategories } from "@/lib/queries/getCategories";
import { getCategoryLanding } from "@/lib/queries/getCategoryLanding";
import { getCategoryMeta } from "@/lib/queries/getCategoryMeta";
import { getCategoryProducts } from "@/lib/queries/getCategoryProducts";
import { Product } from "@/types/product";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://reachdigital-task.vercel.app";

type Subcategory = {
  uid: string;
  name: string | null;
  url_key: string | null;
  url_path: string | null;
  product_count: number | null;
};

type Seo = { title: string; description: string; canonical: string };
type Categories = CategoriesQuery["categories"];

type LandingProps = {
  variant: "landing";
  categories: Categories;
  seo: Seo;
  name: string;
  subcategories: Subcategory[];
  products: Product[];
};

type PlpProps = {
  variant: "plp";
  categories: Categories;
  seo: Seo;
  categoryId: number;
  categoryName: string;
  initialProducts: Product[];
  initialTotalPages: number;
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

const notNull = <T,>(x: T): x is NonNullable<T> => x != null;

export const getStaticPaths: GetStaticPaths = async () => {
  const data = await getCategories();
  const roots = data.categories?.items?.[0]?.children ?? [];

  const paths: { params: { slug: string[] } }[] = [];
  for (const cat of roots) {
    if (!cat?.url_key) continue;
    paths.push({ params: { slug: [cat.url_key] } });
    for (const sub of cat.children ?? []) {
      if (sub?.url_key) {
        paths.push({ params: { slug: [cat.url_key, sub.url_key] } });
      }
    }
  }

  return { paths, fallback: "blocking" };
};

export const getStaticProps: GetStaticProps<PageProps> = async ({ params }) => {
  const slug = (params?.slug as string[] | undefined) ?? [];
  const categoriesData = await getCategories();
  const categories = categoriesData.categories;

  // Landing page: /[category]
  if (slug.length === 1) {
    const data = await getCategoryLanding(slug[0]);
    const cat = data.categories?.items?.[0];
    if (!cat) return { notFound: true };

    return {
      props: {
        variant: "landing",
        categories,
        seo: {
          title: cat.meta_title || cat.name || "Category",
          description: cat.meta_description || `Shop ${cat.name} at our store.`,
          canonical: `${SITE_URL}/${slug.join("/")}`,
        },
        name: cat.name ?? "",
        subcategories: (cat.children ?? []).filter(notNull),
        products: (cat.products?.items ?? []).filter(notNull),
      },
      revalidate: 60,
    };
  }

  // PLP: /[category]/[subcategory]
  if (slug.length === 2) {
    const meta = await getCategoryMeta(slug[1]);
    const cat = meta.categories?.items?.[0];
    if (!cat?.id) return { notFound: true };

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
          canonical: `${SITE_URL}/${slug.join("/")}`,
        },
        categoryId: cat.id,
        categoryName: cat.name ?? "",
        initialProducts: (productsData.products?.items ?? []).filter(notNull),
        initialTotalPages: productsData.products?.page_info?.total_pages ?? 1,
      },
      revalidate: 60,
    };
  }

  return { notFound: true };
};
