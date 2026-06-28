import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Image from "next/image";

export default function Hero() {
  return (
    <Box
      sx={{
        position: "relative",
        height: { xs: 400, md: 560 },
        color: "common.white",
      }}
    >
      <Image
        src="/hero-image.webp"
        alt="New season collection"
        fill
        priority
        style={{ objectFit: "cover" }}
      />
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          bgcolor: "rgba(0,0,0,0.35)",
        }}
      />
      <Container
        maxWidth="lg"
        sx={{
          position: "relative",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          gap: 2,
        }}
      >
        <Typography variant="h2" component="h1" sx={{ fontWeight: 700 }}>
          New Season Arrivals
        </Typography>
        <Typography variant="h6" component="p">
          Discover the latest collection, made for everyone.
        </Typography>
        <Button variant="contained" size="large">
          Shop Now
        </Button>
      </Container>
    </Box>
  );
}
