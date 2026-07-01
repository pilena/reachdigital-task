import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import NextLink from "next/link";
import ProductCarousel from "@/components/product/ProductCarousel";
import { Product } from "@/types/product";
import { Subcategory } from "@/types/subcategory";
import FeatureSection from "../home/FeatureSection";

type CategoryLandingProps = {
  name: string;
  subcategories: Subcategory[];
  products: Product[];
};

const tileColors = [
  "linear-gradient(135deg, #E8D5C4, #D0A88C)",
  "linear-gradient(135deg, #D9DCCB, #B4BFA4)",
  "linear-gradient(135deg, #D2DBDE, #A7BAC2)",
  "linear-gradient(135deg, #E7D3CD, #CBA9A0)",
  "linear-gradient(135deg, #DAD0DA, #B5A4B8)",
  "linear-gradient(135deg, #E6DDCE, #C7B59B)",
];

export default function CategoryLanding({
  name,
  subcategories,
  products,
}: CategoryLandingProps) {
  const subtitle =
    subcategories.length > 0
      ? `Browse ${subcategories.length} categories and shop our most popular ${name.toLowerCase()} styles.`
      : `Shop our most popular ${name.toLowerCase()} styles.`;

  return (
    <Box component="section" sx={{ py: 5 }}>
      <Container maxWidth="xl">
        <Box
          sx={{
            mb: "96px!important",
            width: "100%",
            margin: "0 auto",
            textAlign: "center",
          }}
        >
          <Typography
            component="p"
            sx={{
              textTransform: "uppercase",
              letterSpacing: 1,
              fontWeight: 500,
              color: "var(--primary)",
              mb: 1,
            }}
          >
            Collection
          </Typography>
          <Typography
            variant="h3"
            component="h1"
            id="category-heading"
            sx={{ fontWeight: 700, mb: 2 }}
          >
            {name}
          </Typography>
          <Typography
            sx={{ color: "var(--text-muted)", fontSize: 18, lineHeight: 1.6 }}
          >
            {subtitle}
          </Typography>
        </Box>

        {subcategories.length > 0 && (
          <>
            <Typography
              variant="h5"
              component="h2"
              sx={{ fontWeight: 700, mb: 3 }}
            >
              Shop by category
            </Typography>
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
          </>
        )}
      </Container>

      <FeatureSection
        image="/feature_image.webp"
        imageAlt="Our latest collection"
        eyebrow="Crafted with care"
        title="Socks worth showing off"
        description="From bold prints to everyday essentials, every pair is made from soft combed cotton designed to last wash after wash. Find your new favorites across the collection."
      />

      <ProductCarousel title={`Popular in ${name}`} products={products} />
    </Box>
  );
}
