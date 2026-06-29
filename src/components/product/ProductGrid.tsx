import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import ProductCard from "@/components/product/ProductCard";
import { Product } from "@/types/product";

type ProductGridProps = {
  products: Product[];
};

export default function ProductGrid({ products }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <Typography color="text.secondary" sx={{ py: 4 }}>
        No products found.
      </Typography>
    );
  }

  return (
    <Grid container spacing={3}>
      {products.map((product) => (
        <Grid key={product.uid} size={{ xs: 6, sm: 4, md: 3 }}>
          <ProductCard product={product} />
        </Grid>
      ))}
    </Grid>
  );
}
