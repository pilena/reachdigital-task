export type Product = {
  uid: string;
  name: string | null;
  url_key: string | null;
  image?: {
    url: string | null;
    label: string | null;
  } | null;
  price_range: {
    minimum_price: {
      regular_price: {
        value: number | null;
        currency: string | null;
      };
      final_price: {
        value: number | null;
        currency: string | null;
      };
      discount: {
        percent_off: number | null;
      } | null;
    };
  };
};
