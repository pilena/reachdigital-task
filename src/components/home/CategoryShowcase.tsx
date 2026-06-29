import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import NextLink from "next/link";
import { CategoriesQuery } from "@/generated/graphql";

type CategoryShowcaseProps = {
  categories: CategoriesQuery["categories"];
};

const tileColors = [
  "linear-gradient(135deg, #6a11cb, #2575fc)",
  "linear-gradient(135deg, #ff7e5f, #feb47b)",
  "linear-gradient(135deg, #11998e, #38ef7d)",
  "linear-gradient(135deg, #fc466b, #3f5efb)",
];

export default function CategoryShowcase({
  categories,
}: CategoryShowcaseProps) {
  const rootCategories = categories?.items?.[0]?.children ?? [];
  const featuredCategories = rootCategories.slice(0, 3);

  return (
    <Box component="section" aria-label="Shop by category" sx={{ py: 6 }}>
      <Container maxWidth="lg">
        <Typography variant="h4" component="h2" sx={{ mb: 3, fontWeight: 700 }}>
          Shop by Category
        </Typography>
        <Grid container spacing={3}>
          {featuredCategories.map((category, index) => (
            <Grid key={category?.id} size={{ xs: 12, sm: 4 }}>
              <Box
                component={NextLink}
                href={`/${category?.url_key}`}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-end",
                  height: 220,
                  borderRadius: 2,
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
                <Typography
                  variant="h5"
                  component="h3"
                  sx={{ fontWeight: 700 }}
                >
                  {category?.name}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 0.5,
                    mt: 1,
                  }}
                >
                  <Typography variant="body2">Shop now</Typography>
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
