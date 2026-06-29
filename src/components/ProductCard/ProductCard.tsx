import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Image from "next/image";
import NextLink from "next/link";
import { Product } from "@/types/product";

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
  const price = formatPrice(
    product.price_range.minimum_price.regular_price.value,
    product.price_range.minimum_price.regular_price.currency,
  );

  return (
    <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <CardActionArea
        component={NextLink}
        href={`/product/${product.url_key}`}
        sx={{
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
        </Box>
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography variant="body1" component="h3" sx={{ fontWeight: 500 }}>
            {product.name}
          </Typography>
          <Typography variant="body1" sx={{ mt: 1, fontWeight: 700 }}>
            {price}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
