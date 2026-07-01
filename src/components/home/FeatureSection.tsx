import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import NextLink from "next/link";
import Image from "next/image";

type FeatureSectionProps = {
  image: string;
  imageAlt: string;
  eyebrow: string;
  title: string;
  description?: string;
  showLink?: boolean;
  linkHref?: string;
  linkLabel?: string;
};

export default function FeatureSection({
  image,
  imageAlt,
  eyebrow,
  title,
  description,
  showLink = false,
  linkHref,
  linkLabel,
}: FeatureSectionProps) {
  return (
    <Box
      component="section"
      aria-labelledby="feature-heading"
      sx={{ py: { xs: 6, sm: 10 } }}
    >
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
                src={image}
                alt={imageAlt}
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
                {eyebrow}
              </Typography>
              <Typography
                variant="h3"
                component="h2"
                id="feature-heading"
                sx={{ fontWeight: 600, lineHeight: 1.1 }}
              >
                {title}
              </Typography>

              {description && (
                <Typography component="p" sx={{ mt: 1 }}>
                  {description}
                </Typography>
              )}

              {showLink && linkHref && linkLabel && (
                <Box
                  component={NextLink}
                  href={linkHref}
                  sx={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 0.5,
                    mt: 1,
                    color: "var(--text)",
                    textDecoration: "none",
                    width: "fit-content",
                    "&:hover": { textDecoration: "underline" },
                    transition: "color 0.25s ease",
                  }}
                >
                  <Typography component="span">{linkLabel}</Typography>
                  <ArrowForwardIcon fontSize="small" aria-hidden="true" />
                </Box>
              )}
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
