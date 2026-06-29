import { ProductQuery } from "@/generated/graphql";
import { ProductDetail } from "@/types/productDetail";

type ProductItem = NonNullable<
  NonNullable<NonNullable<ProductQuery["products"]>["items"]>[number]
>;

const notNull = <T>(x: T): x is NonNullable<T> => x != null;

export function mapProduct(item: ProductItem): ProductDetail {
  const images = [...(item.media_gallery ?? [])]
    .filter(notNull)
    .sort((a, b) => (a.position ?? 0) - (b.position ?? 0))
    .map((m) => ({ url: m.url ?? "", label: m.label ?? "" }))
    .filter((m) => m.url);

  const price = item.price_range.minimum_price.regular_price;

  const base = {
    uid: item.uid,
    sku: item.sku ?? "",
    name: item.name ?? "",
    urlKey: item.url_key ?? "",
    stockStatus: item.stock_status ?? null,
    price: price.value ?? 0,
    currency: price.currency ?? "USD",
    descriptionHtml: item.description?.html ?? null,
    shortDescriptionHtml: item.short_description?.html ?? null,
    images,
    weight: "weight" in item ? (item.weight ?? null) : null,
    metaTitle: item.meta_title ?? null,
    metaDescription: item.meta_description ?? null,
  };

  if (item.__typename === "ConfigurableProduct") {
    const options = (item.configurable_options ?? [])
      .filter(notNull)
      .map((o) => ({
        uid: o.uid,
        attributeCode: o.attribute_code ?? "",
        label: o.label ?? "",
        values: (o.values ?? [])
          .filter(notNull)
          .map((v) => ({ uid: v.uid ?? "", label: v.label ?? "" })),
      }));

    const variants = (item.variants ?? []).filter(notNull).map((v) => ({
      uid: v.product?.uid ?? "",
      sku: v.product?.sku ?? "",
      stockStatus: v.product?.stock_status ?? null,
      price: v.product?.price_range.minimum_price.regular_price.value ?? null,
      attributes: (v.attributes ?? [])
        .filter(notNull)
        .map((a) => ({ code: a.code ?? "", label: a.label ?? "" })),
    }));

    return { ...base, isConfigurable: true, options, variants };
  }

  return { ...base, isConfigurable: false, options: [], variants: [] };
}
