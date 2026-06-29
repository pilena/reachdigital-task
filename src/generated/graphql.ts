/** Internal type. DO NOT USE DIRECTLY. */
type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** Internal type. DO NOT USE DIRECTLY. */
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never;
    };
import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
/** The list of available currency codes. */
export type CurrencyEnum =
  | "AED"
  | "AFN"
  | "ALL"
  | "AMD"
  | "ANG"
  | "AOA"
  | "ARS"
  | "AUD"
  | "AWG"
  | "AZM"
  | "AZN"
  | "BAM"
  | "BBD"
  | "BDT"
  | "BGN"
  | "BHD"
  | "BIF"
  | "BMD"
  | "BND"
  | "BOB"
  | "BRL"
  | "BSD"
  | "BTN"
  | "BUK"
  | "BWP"
  | "BYN"
  | "BZD"
  | "CAD"
  | "CDF"
  | "CHE"
  | "CHF"
  | "CHW"
  | "CLP"
  | "CNY"
  | "COP"
  | "CRC"
  | "CUP"
  | "CVE"
  | "CZK"
  | "DJF"
  | "DKK"
  | "DOP"
  | "DZD"
  | "EEK"
  | "EGP"
  | "ERN"
  | "ETB"
  | "EUR"
  | "FJD"
  | "FKP"
  | "GBP"
  | "GEK"
  | "GEL"
  | "GHS"
  | "GIP"
  | "GMD"
  | "GNF"
  | "GQE"
  | "GTQ"
  | "GYD"
  | "HKD"
  | "HNL"
  | "HRK"
  | "HTG"
  | "HUF"
  | "IDR"
  | "ILS"
  | "INR"
  | "IQD"
  | "IRR"
  | "ISK"
  | "JMD"
  | "JOD"
  | "JPY"
  | "KES"
  | "KGS"
  | "KHR"
  | "KMF"
  | "KPW"
  | "KRW"
  | "KWD"
  | "KYD"
  | "KZT"
  | "LAK"
  | "LBP"
  | "LKR"
  | "LRD"
  | "LSL"
  | "LSM"
  | "LTL"
  | "LVL"
  | "LYD"
  | "MAD"
  | "MDL"
  | "MGA"
  | "MKD"
  | "MMK"
  | "MNT"
  | "MOP"
  | "MRO"
  | "MUR"
  | "MVR"
  | "MWK"
  | "MXN"
  | "MYR"
  | "MZN"
  | "NAD"
  | "NGN"
  | "NIC"
  | "NOK"
  | "NPR"
  | "NZD"
  | "OMR"
  | "PAB"
  | "PEN"
  | "PGK"
  | "PHP"
  | "PKR"
  | "PLN"
  | "PYG"
  | "QAR"
  | "RHD"
  | "ROL"
  | "RON"
  | "RSD"
  | "RUB"
  | "RWF"
  | "SAR"
  | "SBD"
  | "SCR"
  | "SDG"
  | "SEK"
  | "SGD"
  | "SHP"
  | "SKK"
  | "SLL"
  | "SOS"
  | "SRD"
  | "STD"
  | "SVC"
  | "SYP"
  | "SZL"
  | "THB"
  | "TJS"
  | "TMM"
  | "TND"
  | "TOP"
  | "TRL"
  | "TRY"
  | "TTD"
  | "TWD"
  | "TZS"
  | "UAH"
  | "UGX"
  | "USD"
  | "UYU"
  | "UZS"
  | "VEB"
  | "VEF"
  | "VND"
  | "VUV"
  | "WST"
  | "XCD"
  | "XOF"
  | "XPF"
  | "YER"
  | "YTL"
  | "ZAR"
  | "ZMK"
  | "ZWD";

/** Defines a filter that matches the input exactly. */
export type FilterEqualTypeInput = {
  /** Use this attribute to exactly match the specified string. For example, to filter on a specific category ID, specify a value such as `5`. */
  eq?: string | null | undefined;
  /** Use this attribute to filter on an array of values. For example, to filter on category IDs 4, 5, and 6, specify a value of `["4", "5", "6"]`. */
  in?: Array<string | null | undefined> | null | undefined;
};

/** Defines a filter that performs a fuzzy search. */
export type FilterMatchTypeInput = {
  /** Use this attribute to exactly match the specified string. For example, to filter on a specific SKU, specify a value such as `24-MB01`. */
  match?: string | null | undefined;
};

/** Defines a filter that matches a range of values, such as prices or dates. */
export type FilterRangeTypeInput = {
  /** Use this attribute to specify the lowest possible value in the range. */
  from?: string | null | undefined;
  /** Use this attribute to specify the highest possible value in the range. */
  to?: string | null | undefined;
};

/** Defines the filters to be used in the search. A filter contains at least one attribute, a comparison operator, and the value that is being searched for. */
export type ProductAttributeFilterInput = {
  /** Attribute label: Activity */
  activity?: FilterEqualTypeInput | null | undefined;
  /** Attribute label: Brand */
  brand?: FilterEqualTypeInput | null | undefined;
  /** Attribute label: Category Gear */
  category_gear?: FilterEqualTypeInput | null | undefined;
  /** Deprecated: use `category_uid` to filter product by category ID. */
  category_id?: FilterEqualTypeInput | null | undefined;
  /** Filter product by the unique ID for a `CategoryInterface` object. */
  category_uid?: FilterEqualTypeInput | null | undefined;
  /** Attribute label: Climate */
  climate?: FilterEqualTypeInput | null | undefined;
  /** Attribute label: Collar */
  collar?: FilterEqualTypeInput | null | undefined;
  /** Attribute label: Color */
  color?: FilterEqualTypeInput | null | undefined;
  /** Attribute label: Colors */
  colors?: FilterEqualTypeInput | null | undefined;
  /** Attribute label: Compatible Phones */
  compatible_phones?: FilterEqualTypeInput | null | undefined;
  /** Attribute label: Debug: colors */
  debug_colors?: FilterMatchTypeInput | null | undefined;
  /** Attribute label: Debug: labels */
  debug_labels?: FilterMatchTypeInput | null | undefined;
  /** Attribute label: Debug: landmarks */
  debug_landmarks?: FilterMatchTypeInput | null | undefined;
  /** Attribute label: Description */
  description?: FilterMatchTypeInput | null | undefined;
  /** Attribute label: Dominant color */
  dominant_color?: FilterEqualTypeInput | null | undefined;
  /** Attribute label: Eco Collection */
  eco_collection?: FilterEqualTypeInput | null | undefined;
  /** Attribute label: Erin Recommends */
  erin_recommends?: FilterEqualTypeInput | null | undefined;
  /** Attribute label: Features */
  features_bags?: FilterEqualTypeInput | null | undefined;
  /** Attribute label: Format */
  format?: FilterEqualTypeInput | null | undefined;
  /** Attribute label: Gender */
  gender?: FilterEqualTypeInput | null | undefined;
  /** Attribute label: Material */
  material?: FilterEqualTypeInput | null | undefined;
  /** Attribute label: Product Name */
  name?: FilterMatchTypeInput | null | undefined;
  /** Attribute label: New */
  new?: FilterEqualTypeInput | null | undefined;
  /** Attribute label: Pattern */
  pattern?: FilterEqualTypeInput | null | undefined;
  /** Attribute label: Performance Fabric */
  performance_fabric?: FilterEqualTypeInput | null | undefined;
  /** Attribute label: Price */
  price?: FilterRangeTypeInput | null | undefined;
  /** Attribute label: Art */
  print_art?: FilterEqualTypeInput | null | undefined;
  /** Attribute label: Holiday */
  print_holiday?: FilterEqualTypeInput | null | undefined;
  /** Attribute label: Search Labels */
  print_labels?: FilterEqualTypeInput | null | undefined;
  /** Attribute label: Search Landmarks */
  print_landmarks?: FilterEqualTypeInput | null | undefined;
  /** Attribute label: Landscape */
  print_landscape?: FilterEqualTypeInput | null | undefined;
  /** Attribute label: Mood */
  print_mood?: FilterEqualTypeInput | null | undefined;
  /** Attribute label: Type */
  print_type?: FilterEqualTypeInput | null | undefined;
  /** Attribute label: Sale */
  sale?: FilterEqualTypeInput | null | undefined;
  /** Attribute label: Short Description */
  short_description?: FilterMatchTypeInput | null | undefined;
  /** Attribute label: Size */
  size?: FilterEqualTypeInput | null | undefined;
  /** Attribute label: SKU */
  sku?: FilterEqualTypeInput | null | undefined;
  /** Attribute label: Sleeve */
  sleeve?: FilterEqualTypeInput | null | undefined;
  /** Attribute label: Special Price */
  special_price?: FilterRangeTypeInput | null | undefined;
  /** Attribute label: Strap/Handle */
  strap_bags?: FilterEqualTypeInput | null | undefined;
  /** Attribute label: Style Bags */
  style_bags?: FilterEqualTypeInput | null | undefined;
  /** Attribute label: Style Bottom */
  style_bottom?: FilterEqualTypeInput | null | undefined;
  /** Attribute label: Style General */
  style_general?: FilterEqualTypeInput | null | undefined;
  /** The part of the URL that identifies the product */
  url_key?: FilterEqualTypeInput | null | undefined;
};

/** Specifies the attribute to use for sorting search results and indicates whether the results are sorted in ascending or descending order. It's possible to sort products using searchable attributes with enabled 'Use in Filter Options' option */
export type ProductAttributeSortInput = {
  /** Attribute label: Product Name */
  name?: SortEnum | null | undefined;
  /** Sort by the position assigned to each product. */
  position?: SortEnum | null | undefined;
  /** Attribute label: Price */
  price?: SortEnum | null | undefined;
  /** Sort by the search relevance score (default). */
  relevance?: SortEnum | null | undefined;
};

/** This enumeration states whether a product stock status is in stock or out of stock */
export type ProductStockStatus = "IN_STOCK" | "OUT_OF_STOCK";

/** Indicates whether to return results in ascending or descending order. */
export type SortEnum = "ASC" | "DESC";

export type CategoriesQueryVariables = Exact<{ [key: string]: never }>;

export type CategoriesQuery = {
  categories: {
    items: Array<{
      id: number | null;
      name: string | null;
      url_key: string | null;
      children: Array<{
        id: number | null;
        name: string | null;
        url_key: string | null;
        children: Array<{
          id: number | null;
          name: string | null;
          url_key: string | null;
          children: Array<{
            id: number | null;
            name: string | null;
            url_key: string | null;
          } | null> | null;
        } | null> | null;
      } | null> | null;
    } | null> | null;
  } | null;
};

export type CategoryLandingQueryVariables = Exact<{
  urlKey: string;
}>;

export type CategoryLandingQuery = {
  categories: {
    items: Array<{
      id: number | null;
      name: string | null;
      url_key: string | null;
      meta_title: string | null;
      meta_description: string | null;
      children: Array<{
        uid: string;
        name: string | null;
        url_key: string | null;
        url_path: string | null;
        product_count: number | null;
      } | null> | null;
      products: {
        items: Array<
          | {
              uid: string;
              name: string | null;
              url_key: string | null;
              image: { url: string | null; label: string | null } | null;
              price_range: {
                minimum_price: {
                  regular_price: {
                    value: number | null;
                    currency: CurrencyEnum | null;
                  };
                };
              };
            }
          | {
              uid: string;
              name: string | null;
              url_key: string | null;
              image: { url: string | null; label: string | null } | null;
              price_range: {
                minimum_price: {
                  regular_price: {
                    value: number | null;
                    currency: CurrencyEnum | null;
                  };
                };
              };
            }
          | {
              uid: string;
              name: string | null;
              url_key: string | null;
              image: { url: string | null; label: string | null } | null;
              price_range: {
                minimum_price: {
                  regular_price: {
                    value: number | null;
                    currency: CurrencyEnum | null;
                  };
                };
              };
            }
          | {
              uid: string;
              name: string | null;
              url_key: string | null;
              image: { url: string | null; label: string | null } | null;
              price_range: {
                minimum_price: {
                  regular_price: {
                    value: number | null;
                    currency: CurrencyEnum | null;
                  };
                };
              };
            }
          | {
              uid: string;
              name: string | null;
              url_key: string | null;
              image: { url: string | null; label: string | null } | null;
              price_range: {
                minimum_price: {
                  regular_price: {
                    value: number | null;
                    currency: CurrencyEnum | null;
                  };
                };
              };
            }
          | {
              uid: string;
              name: string | null;
              url_key: string | null;
              image: { url: string | null; label: string | null } | null;
              price_range: {
                minimum_price: {
                  regular_price: {
                    value: number | null;
                    currency: CurrencyEnum | null;
                  };
                };
              };
            }
          | null
        > | null;
      } | null;
    } | null> | null;
  } | null;
};

export type CategoryMetaQueryVariables = Exact<{
  urlKey: string;
}>;

export type CategoryMetaQuery = {
  categories: {
    items: Array<{
      id: number | null;
      name: string | null;
      url_key: string | null;
      meta_title: string | null;
      meta_description: string | null;
    } | null> | null;
  } | null;
};

export type CategoryProductsQueryVariables = Exact<{
  filter: ProductAttributeFilterInput;
  sort?: ProductAttributeSortInput | null | undefined;
  pageSize: number;
  currentPage: number;
}>;

export type CategoryProductsQuery = {
  products: {
    total_count: number | null;
    page_info: {
      current_page: number | null;
      total_pages: number | null;
      page_size: number | null;
    } | null;
    items: Array<
      | {
          uid: string;
          name: string | null;
          url_key: string | null;
          image: { url: string | null; label: string | null } | null;
          price_range: {
            minimum_price: {
              regular_price: {
                value: number | null;
                currency: CurrencyEnum | null;
              };
            };
          };
        }
      | {
          uid: string;
          name: string | null;
          url_key: string | null;
          image: { url: string | null; label: string | null } | null;
          price_range: {
            minimum_price: {
              regular_price: {
                value: number | null;
                currency: CurrencyEnum | null;
              };
            };
          };
        }
      | {
          uid: string;
          name: string | null;
          url_key: string | null;
          image: { url: string | null; label: string | null } | null;
          price_range: {
            minimum_price: {
              regular_price: {
                value: number | null;
                currency: CurrencyEnum | null;
              };
            };
          };
        }
      | {
          uid: string;
          name: string | null;
          url_key: string | null;
          image: { url: string | null; label: string | null } | null;
          price_range: {
            minimum_price: {
              regular_price: {
                value: number | null;
                currency: CurrencyEnum | null;
              };
            };
          };
        }
      | {
          uid: string;
          name: string | null;
          url_key: string | null;
          image: { url: string | null; label: string | null } | null;
          price_range: {
            minimum_price: {
              regular_price: {
                value: number | null;
                currency: CurrencyEnum | null;
              };
            };
          };
        }
      | {
          uid: string;
          name: string | null;
          url_key: string | null;
          image: { url: string | null; label: string | null } | null;
          price_range: {
            minimum_price: {
              regular_price: {
                value: number | null;
                currency: CurrencyEnum | null;
              };
            };
          };
        }
      | null
    > | null;
  } | null;
};

export type HomepageProductsQueryVariables = Exact<{ [key: string]: never }>;

export type HomepageProductsQuery = {
  products: {
    items: Array<
      | {
          uid: string;
          name: string | null;
          url_key: string | null;
          image: { url: string | null; label: string | null } | null;
          price_range: {
            minimum_price: {
              regular_price: {
                value: number | null;
                currency: CurrencyEnum | null;
              };
            };
          };
        }
      | {
          uid: string;
          name: string | null;
          url_key: string | null;
          image: { url: string | null; label: string | null } | null;
          price_range: {
            minimum_price: {
              regular_price: {
                value: number | null;
                currency: CurrencyEnum | null;
              };
            };
          };
        }
      | {
          uid: string;
          name: string | null;
          url_key: string | null;
          image: { url: string | null; label: string | null } | null;
          price_range: {
            minimum_price: {
              regular_price: {
                value: number | null;
                currency: CurrencyEnum | null;
              };
            };
          };
        }
      | {
          uid: string;
          name: string | null;
          url_key: string | null;
          image: { url: string | null; label: string | null } | null;
          price_range: {
            minimum_price: {
              regular_price: {
                value: number | null;
                currency: CurrencyEnum | null;
              };
            };
          };
        }
      | {
          uid: string;
          name: string | null;
          url_key: string | null;
          image: { url: string | null; label: string | null } | null;
          price_range: {
            minimum_price: {
              regular_price: {
                value: number | null;
                currency: CurrencyEnum | null;
              };
            };
          };
        }
      | {
          uid: string;
          name: string | null;
          url_key: string | null;
          image: { url: string | null; label: string | null } | null;
          price_range: {
            minimum_price: {
              regular_price: {
                value: number | null;
                currency: CurrencyEnum | null;
              };
            };
          };
        }
      | null
    > | null;
  } | null;
};

export type ProductQueryVariables = Exact<{
  urlKey: string;
}>;

export type ProductQuery = {
  products: {
    items: Array<
      | {
          __typename: "BundleProduct";
          weight: number | null;
          uid: string;
          sku: string | null;
          name: string | null;
          url_key: string | null;
          stock_status: ProductStockStatus | null;
          meta_title: string | null;
          meta_description: string | null;
          categories: Array<{
            name: string | null;
            url_path: string | null;
            level: number | null;
          } | null> | null;
          description: { html: string } | null;
          short_description: { html: string } | null;
          media_gallery: Array<
            | {
                url: string | null;
                label: string | null;
                position: number | null;
              }
            | {
                url: string | null;
                label: string | null;
                position: number | null;
              }
            | null
          > | null;
          price_range: {
            minimum_price: {
              regular_price: {
                value: number | null;
                currency: CurrencyEnum | null;
              };
            };
          };
        }
      | {
          __typename: "ConfigurableProduct";
          weight: number | null;
          uid: string;
          sku: string | null;
          name: string | null;
          url_key: string | null;
          stock_status: ProductStockStatus | null;
          meta_title: string | null;
          meta_description: string | null;
          configurable_options: Array<{
            uid: string;
            attribute_code: string | null;
            label: string | null;
            values: Array<{
              uid: string | null;
              label: string | null;
            } | null> | null;
          } | null> | null;
          variants: Array<{
            attributes: Array<{
              code: string | null;
              label: string | null;
              value_index: number | null;
            } | null> | null;
            product: {
              uid: string;
              sku: string | null;
              stock_status: ProductStockStatus | null;
              price_range: {
                minimum_price: {
                  regular_price: {
                    value: number | null;
                    currency: CurrencyEnum | null;
                  };
                };
              };
            } | null;
          } | null> | null;
          categories: Array<{
            name: string | null;
            url_path: string | null;
            level: number | null;
          } | null> | null;
          description: { html: string } | null;
          short_description: { html: string } | null;
          media_gallery: Array<
            | {
                url: string | null;
                label: string | null;
                position: number | null;
              }
            | {
                url: string | null;
                label: string | null;
                position: number | null;
              }
            | null
          > | null;
          price_range: {
            minimum_price: {
              regular_price: {
                value: number | null;
                currency: CurrencyEnum | null;
              };
            };
          };
        }
      | {
          __typename: "DownloadableProduct";
          uid: string;
          sku: string | null;
          name: string | null;
          url_key: string | null;
          stock_status: ProductStockStatus | null;
          meta_title: string | null;
          meta_description: string | null;
          categories: Array<{
            name: string | null;
            url_path: string | null;
            level: number | null;
          } | null> | null;
          description: { html: string } | null;
          short_description: { html: string } | null;
          media_gallery: Array<
            | {
                url: string | null;
                label: string | null;
                position: number | null;
              }
            | {
                url: string | null;
                label: string | null;
                position: number | null;
              }
            | null
          > | null;
          price_range: {
            minimum_price: {
              regular_price: {
                value: number | null;
                currency: CurrencyEnum | null;
              };
            };
          };
        }
      | {
          __typename: "GroupedProduct";
          weight: number | null;
          uid: string;
          sku: string | null;
          name: string | null;
          url_key: string | null;
          stock_status: ProductStockStatus | null;
          meta_title: string | null;
          meta_description: string | null;
          categories: Array<{
            name: string | null;
            url_path: string | null;
            level: number | null;
          } | null> | null;
          description: { html: string } | null;
          short_description: { html: string } | null;
          media_gallery: Array<
            | {
                url: string | null;
                label: string | null;
                position: number | null;
              }
            | {
                url: string | null;
                label: string | null;
                position: number | null;
              }
            | null
          > | null;
          price_range: {
            minimum_price: {
              regular_price: {
                value: number | null;
                currency: CurrencyEnum | null;
              };
            };
          };
        }
      | {
          __typename: "SimpleProduct";
          weight: number | null;
          uid: string;
          sku: string | null;
          name: string | null;
          url_key: string | null;
          stock_status: ProductStockStatus | null;
          meta_title: string | null;
          meta_description: string | null;
          categories: Array<{
            name: string | null;
            url_path: string | null;
            level: number | null;
          } | null> | null;
          description: { html: string } | null;
          short_description: { html: string } | null;
          media_gallery: Array<
            | {
                url: string | null;
                label: string | null;
                position: number | null;
              }
            | {
                url: string | null;
                label: string | null;
                position: number | null;
              }
            | null
          > | null;
          price_range: {
            minimum_price: {
              regular_price: {
                value: number | null;
                currency: CurrencyEnum | null;
              };
            };
          };
        }
      | {
          __typename: "VirtualProduct";
          uid: string;
          sku: string | null;
          name: string | null;
          url_key: string | null;
          stock_status: ProductStockStatus | null;
          meta_title: string | null;
          meta_description: string | null;
          categories: Array<{
            name: string | null;
            url_path: string | null;
            level: number | null;
          } | null> | null;
          description: { html: string } | null;
          short_description: { html: string } | null;
          media_gallery: Array<
            | {
                url: string | null;
                label: string | null;
                position: number | null;
              }
            | {
                url: string | null;
                label: string | null;
                position: number | null;
              }
            | null
          > | null;
          price_range: {
            minimum_price: {
              regular_price: {
                value: number | null;
                currency: CurrencyEnum | null;
              };
            };
          };
        }
      | null
    > | null;
  } | null;
};

export const CategoriesDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "Categories" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "categories" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "filters" },
                value: {
                  kind: "ObjectValue",
                  fields: [
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "ids" },
                      value: {
                        kind: "ObjectValue",
                        fields: [
                          {
                            kind: "ObjectField",
                            name: { kind: "Name", value: "eq" },
                            value: {
                              kind: "StringValue",
                              value: "2",
                              block: false,
                            },
                          },
                        ],
                      },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "items" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "url_key" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "children" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "id" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "name" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "url_key" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "children" },
                              selectionSet: {
                                kind: "SelectionSet",
                                selections: [
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "id" },
                                  },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "name" },
                                  },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "url_key" },
                                  },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "children" },
                                    selectionSet: {
                                      kind: "SelectionSet",
                                      selections: [
                                        {
                                          kind: "Field",
                                          name: { kind: "Name", value: "id" },
                                        },
                                        {
                                          kind: "Field",
                                          name: { kind: "Name", value: "name" },
                                        },
                                        {
                                          kind: "Field",
                                          name: {
                                            kind: "Name",
                                            value: "url_key",
                                          },
                                        },
                                      ],
                                    },
                                  },
                                ],
                              },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<CategoriesQuery, CategoriesQueryVariables>;
export const CategoryLandingDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "CategoryLanding" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "urlKey" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "categories" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "filters" },
                value: {
                  kind: "ObjectValue",
                  fields: [
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "url_key" },
                      value: {
                        kind: "ObjectValue",
                        fields: [
                          {
                            kind: "ObjectField",
                            name: { kind: "Name", value: "eq" },
                            value: {
                              kind: "Variable",
                              name: { kind: "Name", value: "urlKey" },
                            },
                          },
                        ],
                      },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "items" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "url_key" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "meta_title" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "meta_description" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "children" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "uid" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "name" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "url_key" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "url_path" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "product_count" },
                            },
                          ],
                        },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "products" },
                        arguments: [
                          {
                            kind: "Argument",
                            name: { kind: "Name", value: "pageSize" },
                            value: { kind: "IntValue", value: "10" },
                          },
                        ],
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "items" },
                              selectionSet: {
                                kind: "SelectionSet",
                                selections: [
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "uid" },
                                  },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "name" },
                                  },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "url_key" },
                                  },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "image" },
                                    selectionSet: {
                                      kind: "SelectionSet",
                                      selections: [
                                        {
                                          kind: "Field",
                                          name: { kind: "Name", value: "url" },
                                        },
                                        {
                                          kind: "Field",
                                          name: {
                                            kind: "Name",
                                            value: "label",
                                          },
                                        },
                                      ],
                                    },
                                  },
                                  {
                                    kind: "Field",
                                    name: {
                                      kind: "Name",
                                      value: "price_range",
                                    },
                                    selectionSet: {
                                      kind: "SelectionSet",
                                      selections: [
                                        {
                                          kind: "Field",
                                          name: {
                                            kind: "Name",
                                            value: "minimum_price",
                                          },
                                          selectionSet: {
                                            kind: "SelectionSet",
                                            selections: [
                                              {
                                                kind: "Field",
                                                name: {
                                                  kind: "Name",
                                                  value: "regular_price",
                                                },
                                                selectionSet: {
                                                  kind: "SelectionSet",
                                                  selections: [
                                                    {
                                                      kind: "Field",
                                                      name: {
                                                        kind: "Name",
                                                        value: "value",
                                                      },
                                                    },
                                                    {
                                                      kind: "Field",
                                                      name: {
                                                        kind: "Name",
                                                        value: "currency",
                                                      },
                                                    },
                                                  ],
                                                },
                                              },
                                            ],
                                          },
                                        },
                                      ],
                                    },
                                  },
                                ],
                              },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  CategoryLandingQuery,
  CategoryLandingQueryVariables
>;
export const CategoryMetaDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "CategoryMeta" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "urlKey" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "categories" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "filters" },
                value: {
                  kind: "ObjectValue",
                  fields: [
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "url_key" },
                      value: {
                        kind: "ObjectValue",
                        fields: [
                          {
                            kind: "ObjectField",
                            name: { kind: "Name", value: "eq" },
                            value: {
                              kind: "Variable",
                              name: { kind: "Name", value: "urlKey" },
                            },
                          },
                        ],
                      },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "items" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "url_key" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "meta_title" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "meta_description" },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<CategoryMetaQuery, CategoryMetaQueryVariables>;
export const CategoryProductsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "CategoryProducts" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "filter" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "ProductAttributeFilterInput" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "sort" } },
          type: {
            kind: "NamedType",
            name: { kind: "Name", value: "ProductAttributeSortInput" },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "pageSize" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "currentPage" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "products" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "filter" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "filter" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "sort" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "sort" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "pageSize" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "pageSize" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "currentPage" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "currentPage" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "total_count" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "page_info" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "current_page" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "total_pages" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "page_size" },
                      },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "items" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "uid" } },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "url_key" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "image" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "url" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "label" },
                            },
                          ],
                        },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "price_range" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "minimum_price" },
                              selectionSet: {
                                kind: "SelectionSet",
                                selections: [
                                  {
                                    kind: "Field",
                                    name: {
                                      kind: "Name",
                                      value: "regular_price",
                                    },
                                    selectionSet: {
                                      kind: "SelectionSet",
                                      selections: [
                                        {
                                          kind: "Field",
                                          name: {
                                            kind: "Name",
                                            value: "value",
                                          },
                                        },
                                        {
                                          kind: "Field",
                                          name: {
                                            kind: "Name",
                                            value: "currency",
                                          },
                                        },
                                      ],
                                    },
                                  },
                                ],
                              },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  CategoryProductsQuery,
  CategoryProductsQueryVariables
>;
export const HomepageProductsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "HomepageProducts" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "products" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "filter" },
                value: {
                  kind: "ObjectValue",
                  fields: [
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "category_id" },
                      value: {
                        kind: "ObjectValue",
                        fields: [
                          {
                            kind: "ObjectField",
                            name: { kind: "Name", value: "eq" },
                            value: {
                              kind: "StringValue",
                              value: "102",
                              block: false,
                            },
                          },
                        ],
                      },
                    },
                  ],
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "pageSize" },
                value: { kind: "IntValue", value: "10" },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "items" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "uid" } },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "url_key" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "image" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "url" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "label" },
                            },
                          ],
                        },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "price_range" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "minimum_price" },
                              selectionSet: {
                                kind: "SelectionSet",
                                selections: [
                                  {
                                    kind: "Field",
                                    name: {
                                      kind: "Name",
                                      value: "regular_price",
                                    },
                                    selectionSet: {
                                      kind: "SelectionSet",
                                      selections: [
                                        {
                                          kind: "Field",
                                          name: {
                                            kind: "Name",
                                            value: "value",
                                          },
                                        },
                                        {
                                          kind: "Field",
                                          name: {
                                            kind: "Name",
                                            value: "currency",
                                          },
                                        },
                                      ],
                                    },
                                  },
                                ],
                              },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  HomepageProductsQuery,
  HomepageProductsQueryVariables
>;
export const ProductDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "Product" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "urlKey" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "products" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "filter" },
                value: {
                  kind: "ObjectValue",
                  fields: [
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "url_key" },
                      value: {
                        kind: "ObjectValue",
                        fields: [
                          {
                            kind: "ObjectField",
                            name: { kind: "Name", value: "eq" },
                            value: {
                              kind: "Variable",
                              name: { kind: "Name", value: "urlKey" },
                            },
                          },
                        ],
                      },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "items" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "__typename" },
                      },
                      { kind: "Field", name: { kind: "Name", value: "uid" } },
                      { kind: "Field", name: { kind: "Name", value: "sku" } },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "url_key" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "stock_status" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "meta_title" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "meta_description" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "categories" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "name" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "url_path" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "level" },
                            },
                          ],
                        },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "description" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "html" },
                            },
                          ],
                        },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "short_description" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "html" },
                            },
                          ],
                        },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "media_gallery" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "url" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "label" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "position" },
                            },
                          ],
                        },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "price_range" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "minimum_price" },
                              selectionSet: {
                                kind: "SelectionSet",
                                selections: [
                                  {
                                    kind: "Field",
                                    name: {
                                      kind: "Name",
                                      value: "regular_price",
                                    },
                                    selectionSet: {
                                      kind: "SelectionSet",
                                      selections: [
                                        {
                                          kind: "Field",
                                          name: {
                                            kind: "Name",
                                            value: "value",
                                          },
                                        },
                                        {
                                          kind: "Field",
                                          name: {
                                            kind: "Name",
                                            value: "currency",
                                          },
                                        },
                                      ],
                                    },
                                  },
                                ],
                              },
                            },
                          ],
                        },
                      },
                      {
                        kind: "InlineFragment",
                        typeCondition: {
                          kind: "NamedType",
                          name: {
                            kind: "Name",
                            value: "PhysicalProductInterface",
                          },
                        },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "weight" },
                            },
                          ],
                        },
                      },
                      {
                        kind: "InlineFragment",
                        typeCondition: {
                          kind: "NamedType",
                          name: { kind: "Name", value: "ConfigurableProduct" },
                        },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: {
                                kind: "Name",
                                value: "configurable_options",
                              },
                              selectionSet: {
                                kind: "SelectionSet",
                                selections: [
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "uid" },
                                  },
                                  {
                                    kind: "Field",
                                    name: {
                                      kind: "Name",
                                      value: "attribute_code",
                                    },
                                  },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "label" },
                                  },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "values" },
                                    selectionSet: {
                                      kind: "SelectionSet",
                                      selections: [
                                        {
                                          kind: "Field",
                                          name: { kind: "Name", value: "uid" },
                                        },
                                        {
                                          kind: "Field",
                                          name: {
                                            kind: "Name",
                                            value: "label",
                                          },
                                        },
                                      ],
                                    },
                                  },
                                ],
                              },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "variants" },
                              selectionSet: {
                                kind: "SelectionSet",
                                selections: [
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "attributes" },
                                    selectionSet: {
                                      kind: "SelectionSet",
                                      selections: [
                                        {
                                          kind: "Field",
                                          name: { kind: "Name", value: "code" },
                                        },
                                        {
                                          kind: "Field",
                                          name: {
                                            kind: "Name",
                                            value: "label",
                                          },
                                        },
                                        {
                                          kind: "Field",
                                          name: {
                                            kind: "Name",
                                            value: "value_index",
                                          },
                                        },
                                      ],
                                    },
                                  },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "product" },
                                    selectionSet: {
                                      kind: "SelectionSet",
                                      selections: [
                                        {
                                          kind: "Field",
                                          name: { kind: "Name", value: "uid" },
                                        },
                                        {
                                          kind: "Field",
                                          name: { kind: "Name", value: "sku" },
                                        },
                                        {
                                          kind: "Field",
                                          name: {
                                            kind: "Name",
                                            value: "stock_status",
                                          },
                                        },
                                        {
                                          kind: "Field",
                                          name: {
                                            kind: "Name",
                                            value: "price_range",
                                          },
                                          selectionSet: {
                                            kind: "SelectionSet",
                                            selections: [
                                              {
                                                kind: "Field",
                                                name: {
                                                  kind: "Name",
                                                  value: "minimum_price",
                                                },
                                                selectionSet: {
                                                  kind: "SelectionSet",
                                                  selections: [
                                                    {
                                                      kind: "Field",
                                                      name: {
                                                        kind: "Name",
                                                        value: "regular_price",
                                                      },
                                                      selectionSet: {
                                                        kind: "SelectionSet",
                                                        selections: [
                                                          {
                                                            kind: "Field",
                                                            name: {
                                                              kind: "Name",
                                                              value: "value",
                                                            },
                                                          },
                                                          {
                                                            kind: "Field",
                                                            name: {
                                                              kind: "Name",
                                                              value: "currency",
                                                            },
                                                          },
                                                        ],
                                                      },
                                                    },
                                                  ],
                                                },
                                              },
                                            ],
                                          },
                                        },
                                      ],
                                    },
                                  },
                                ],
                              },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<ProductQuery, ProductQueryVariables>;
