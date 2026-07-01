import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Image from "next/image";
import NextLink from "next/link";
import { Product } from "@/types/product";
import Chip from "@mui/material/Chip";

type ProductCardProps = {
  product: Product;
};

function formatPrice(value: number | null, currency: string | null) {
  if (value == null) return "";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency ?? "USD",
  }).format(value);
}

export default function ProductCard({ product }: ProductCardProps) {
  const minimnumPrice = product.price_range.minimum_price;
  const regularPrice = minimnumPrice.regular_price.value;
  const finalPrice = minimnumPrice.final_price.value ?? regularPrice;
  const currency = minimnumPrice.regular_price.currency;
  const onSale =
    finalPrice != null && regularPrice != null && finalPrice < regularPrice;
  const discountPercent = minimnumPrice.discount?.percent_off ?? null;

  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        borderRadius: 4,
        boxShadow: 1,
      }}
    >
      <CardActionArea
        component={NextLink}
        href={`/product/${product.url_key}`}
        sx={{
          backgroundColor: "background.paper",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "stretch",
        }}
      >
        <Box
          sx={{
            position: "relative",
            width: "100%",
            aspectRatio: "1 / 1",
            bgcolor: "grey.100",
          }}
        >
          {product.image?.url && (
            <Image
              src={product.image.url}
              alt={product.image.label ?? product.name ?? "Product image"}
              fill
              sizes="(max-width: 600px) 50vw, 250px"
              style={{ objectFit: "cover" }}
            />
          )}
          {onSale && discountPercent != null && (
            <Chip
              label={`-${Math.round(discountPercent)}%`}
              color="error"
              size="small"
              sx={{ position: "absolute", top: 8, left: 8, fontWeight: 700 }}
            />
          )}
        </Box>
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography variant="body1" component="h3" sx={{ fontWeight: 500 }}>
            {product.name}
          </Typography>
          {onSale ? (
            <Box
              sx={{ mt: 1, display: "flex", alignItems: "baseline", gap: 1 }}
            >
              <Typography
                variant="body1"
                sx={{ fontWeight: 700, color: "error.main" }}
              >
                {formatPrice(finalPrice, currency)}
              </Typography>
              <Typography
                variant="body2"
                sx={{ textDecoration: "line-through", color: "text.secondary" }}
              >
                {formatPrice(regularPrice, currency)}
              </Typography>
            </Box>
          ) : (
            <Typography
              variant="body1"
              sx={{ mt: 1, fontWeight: 700, color: "primary.dark" }}
            >
              {formatPrice(regularPrice, currency)}
            </Typography>
          )}
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
