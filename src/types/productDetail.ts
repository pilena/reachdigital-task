export type ProductImage = { url: string; label: string };

export type ConfigOptionValue = { uid: string; label: string };

export type ConfigOption = {
  uid: string;
  attributeCode: string;
  label: string;
  values: ConfigOptionValue[];
};

export type ProductVariant = {
  uid: string;
  sku: string;
  stockStatus: string | null;
  price: number | null;
  attributes: { code: string; label: string }[];
};

export type ProductDetail = {
  uid: string;
  sku: string;
  name: string;
  urlKey: string;
  stockStatus: string | null;
  price: number;
  currency: string;
  descriptionHtml: string | null;
  shortDescriptionHtml: string | null;
  images: ProductImage[];
  weight: number | null;
  isConfigurable: boolean;
  options: ConfigOption[];
  variants: ProductVariant[];
  metaTitle: string | null;
  metaDescription: string | null;
  category: { name: string; urlPath: string } | null;
  categoryUid: string | null;
  finalPrice: number | null;
  discountPercent: number | null;
};
