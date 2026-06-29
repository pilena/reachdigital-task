import type { NextApiRequest, NextApiResponse } from "next";
import { getCategoryProducts } from "@/lib/queries/getCategoryProducts";
import type {
  CategoryProductsQuery,
  ProductAttributeFilterInput,
  ProductAttributeSortInput,
} from "@/generated/graphql";

type SortKey = "price_asc" | "price_desc" | "name_asc" | "name_desc";

const SORT_MAP: Record<SortKey, ProductAttributeSortInput> = {
  price_asc: { price: "ASC" },
  price_desc: { price: "DESC" },
  name_asc: { name: "ASC" },
  name_desc: { name: "DESC" },
};

type ResponseData =
  | NonNullable<CategoryProductsQuery["products"]>
  | { error: string };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>,
) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { categoryId, page, sort, minPrice, maxPrice } = req.query;

  const id = Array.isArray(categoryId) ? categoryId[0] : categoryId;
  if (!id) {
    return res.status(400).json({ error: "Missing categoryId parameter" });
  }

  const filter: ProductAttributeFilterInput = {
    category_id: { eq: id },
  };

  const from = Array.isArray(minPrice) ? minPrice[0] : minPrice;
  const to = Array.isArray(maxPrice) ? maxPrice[0] : maxPrice;

  if (from || to) {
    filter.price = {
      ...(from ? { from } : {}),
      ...(to ? { to } : {}),
    };
  }

  const sortKey = (Array.isArray(sort) ? sort[0] : sort) as SortKey | undefined;
  const sortInput =
    sortKey && SORT_MAP[sortKey] ? SORT_MAP[sortKey] : undefined;

  const currentPage = Math.max(1, Number(page) || 1);

  try {
    const data = await getCategoryProducts({
      filter,
      sort: sortInput,
      pageSize: 12,
      currentPage,
    });

    if (!data.products) {
      return res.status(404).json({ error: "No products found" });
    }
    return res.status(200).json(data.products);
  } catch (err) {
    console.error("category-products API error:", err);
    return res.status(500).json({ error: "Failed to fetch products" });
  }
}
