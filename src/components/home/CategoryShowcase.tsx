import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import NextLink from "next/link";
import { CategoriesQuery } from "@/generated/graphql";
import Image from "next/image";

type CategoryShowcaseProps = {
  categories: CategoriesQuery["categories"];
};

const tileColors = [
  "linear-gradient(135deg, #6a11cb, #2575fc)",
  "linear-gradient(135deg, #ff7e5f, #feb47b)",
  "linear-gradient(135deg, #11998e, #38ef7d)",
  "linear-gradient(135deg, #fc466b, #3f5efb)",
];

const categoryImages: Record<string, string> = {
  men: "/category_images/men_category_main_image.webp",
  women: "/category_images/women_category_main_image.webp",
  kids: "/category_images/kids_category_main_image1.webp",
};

export default function CategoryShowcase({
  categories,
}: CategoryShowcaseProps) {
  const rootCategories = categories?.items?.[0]?.children ?? [];
  const featuredCategories = rootCategories.slice(0, 3);

  return (
    <Box
      component="section"
      aria-label="Shop by category"
      sx={{ py: { xs: 6, sm: 10 } }}
    >
      <Container maxWidth="xl">
        <Typography variant="h4" component="h2" sx={{ mb: 3, fontWeight: 500 }}>
          Shop by Category
        </Typography>
        <Grid container spacing={3}>
          {featuredCategories.map((category, index) => (
            <Grid key={category?.id} size={{ xs: 12, sm: 4 }}>
              <Box
                component={NextLink}
                aria-label={"Shop " + category?.name}
                href={`/${category?.url_key}`}
                sx={{
                  position: "relative",
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-end",
                  height: 320,
                  borderRadius: 4,
                  p: 3,
                  color: "common.white",
                  textDecoration: "none",
                  background: tileColors[index % tileColors.length],
                  transition: "transform 0.2s ease",
                  "&:hover": {
                    transform: "scale(1.02)",
                  },
                }}
              >
                {category?.url_key && categoryImages[category.url_key] && (
                  <>
                    <Image
                      src={categoryImages[category.url_key]}
                      alt=""
                      fill
                      sizes="(max-width: 600px) 50vw, 25vw"
                      style={{ objectFit: "cover" }}
                    />
                    <Box
                      sx={{
                        position: "absolute",
                        inset: 0,
                        background:
                          "linear-gradient(to top, rgba(0,0,0,0.25), rgba(0,0,0,0))",
                      }}
                    />
                  </>
                )}

                <Typography
                  variant="h5"
                  component="h3"
                  sx={{ fontWeight: 700, position: "relative", zIndex: 1 }}
                >
                  {category?.name}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 0.5,
                    mt: 1,
                    position: "relative",
                    zIndex: 1,
                  }}
                >
                  <Typography
                    aria-label={"Shop " + category?.name}
                    variant="body2"
                  >
                    Shop now
                  </Typography>
                  <ArrowForwardIcon fontSize="small" />
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
