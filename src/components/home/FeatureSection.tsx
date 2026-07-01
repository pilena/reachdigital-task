import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import NextLink from "next/link";
import Image from "next/image";

export default function FeatureSplit() {
  return (
    <Box component="section" aria-labelledby="feature-heading" sx={{ py: 10 }}>
      <Container maxWidth="xl">
        <Grid container spacing={6} sx={{ alignItems: "center" }}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Box
              sx={{
                position: "relative",
                width: "100%",
                height: { xs: 420, md: 720 },
                borderRadius: "12px",
                overflow: "hidden",
              }}
            >
              <Image
                src="/feature_image.webp"
                alt="Impressionist and modern master artworks"
                fill
                sizes="(max-width: 900px) 100vw, 50vw"
                style={{ objectFit: "cover" }}
              />
            </Box>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Typography
                component="p"
                sx={{
                  textTransform: "uppercase",
                  fontWeight: 500,
                  letterSpacing: 1,
                  color: "var(--primary)",
                }}
              >
                A peek into history
              </Typography>
              <Typography
                variant="h3"
                component="h2"
                id="feature-heading"
                sx={{ fontWeight: 600, lineHeight: 1.1 }}
              >
                Impressionists and modern masters
              </Typography>
              <Box
                component={NextLink}
                href="/men/art"
                aria-label="Link to men's art category"
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 0.5,
                  mt: 1,
                  color: "var(--text)",
                  textDecoration: "none",
                  width: "fit-content",
                  "&:hover": { textDecoration: "underline", },
                  transition: "color 0.25s ease",
                }}
              >
                <Typography component="span">A complete collection</Typography>
                <ArrowForwardIcon fontSize="small" aria-hidden="true" />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}