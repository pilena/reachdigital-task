import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import NextLink from "next/link";
import ProductCarousel from "@/components/product/ProductCarousel";
import { Product } from "@/types/product";
import { Subcategory } from "@/types/subcategory";

type CategoryLandingProps = {
  name: string;
  subcategories: Subcategory[];
  products: Product[];
};

const tileColors = [
  "linear-gradient(135deg, #d8d3c8, #b8b0a2)",
  "linear-gradient(135deg, #cdd3c8, #a9b2a0)",
  "linear-gradient(135deg, #d3cdd3, #b2a9b8)",
  "linear-gradient(135deg, #d3c9c0, #b8a99c)",
];

export default function CategoryLanding({
  name,
  subcategories,
  products,
}: CategoryLandingProps) {
  return (
    <Box component="section" sx={{ py: 5 }}>
      <Container maxWidth="lg">
        <Typography variant="h3" component="h1" sx={{ fontWeight: 700, mb: 4 }}>
          {name}
        </Typography>

        {subcategories.length > 0 && (
          <Grid container spacing={3} sx={{ mb: 6 }}>
            {subcategories.map((sub, index) => (
              <Grid key={sub.uid} size={{ xs: 6, sm: 4, md: 3 }}>
                <Box
                  component={NextLink}
                  href={`/${sub.url_path}`}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-end",
                    height: 160,
                    borderRadius: 2,
                    p: 2,
                    color: "grey.900",
                    textDecoration: "none",
                    background: tileColors[index % tileColors.length],
                    transition: "transform 0.2s ease",
                    "&:hover": { transform: "scale(1.02)" },
                  }}
                >
                  <Typography
                    variant="h6"
                    component="h2"
                    sx={{ fontWeight: 700 }}
                  >
                    {sub.name}
                  </Typography>
                  {sub.product_count != null && (
                    <Typography variant="body2">
                      {sub.product_count} products
                    </Typography>
                  )}
                </Box>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>

      <ProductCarousel title={`Popular in ${name}`} products={products} />
    </Box>
  );
}
