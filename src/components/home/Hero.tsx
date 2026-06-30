"use client";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useEffect, useRef } from "react";

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);

  // autoplay unless the user prefers reduced motion
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const sync = () => {
      if (motionQuery.matches) {
        video.pause();
        video.currentTime = 0;
      } else {
        video.play().catch(() => {});
      }
    };

    sync();
    motionQuery.addEventListener("change", sync);
    return () => motionQuery.removeEventListener("change", sync);
  }, []);

  return (
    <Box
      component="section"
      aria-labelledby="hero-heading"
      sx={{
        position: "relative",
        height: { xs: 560, md: 650 },
        width: "100%",
      }}
    >
      <Box
        sx={{
          height: "inherit",
          margin: "clamp(1rem, 2vw, 1.5rem)",
          position: "relative",
          borderRadius: "16px",
          overflow: "hidden",
        }}
      >
        <Box
          component="video"
          ref={videoRef}
          muted
          loop
          playsInline
          preload="metadata"
          poster="/hero-image.webp"
          aria-hidden="true"
          sx={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
          }}
        >
          <source
            src="https://eu-central-1.graphassets.com/AGpzN1gCxSsmrRI0YBrr7z/UNmtIZmWSgmnpUAWcAk0"
            type="video/mp4"
          />
          <img
            src="/hero-image.webp"
            alt="New season collection"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </Box>

        <Box
          sx={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to right, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.25) 50%, rgba(0,0,0,0.1) 100%)",
          }}
        />

        <Box
          sx={{
            position: "relative",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "flex-start",
            px: { xs: 3, md: 8 },
          }}
        >
          <Box
            sx={{
              maxWidth: 900,
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: 4,
            }}
          >
            <Typography
              component="p"
              sx={{ textTransform: "uppercase", fontWeight: 500 }}
            >
              A journey through creativity
            </Typography>
            <Typography
              variant="h1"
              component="h1"
              sx={{ lineHeight: 1, fontWeight: 600 }}
            >
              Discover beauty beyond boundaries.
            </Typography>
            <Button
              href="/men/art"
              variant="contained"
              size="large"
              sx={{ textTransform: "none", width: "fit-content" }}
            >
              Shop Art
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
