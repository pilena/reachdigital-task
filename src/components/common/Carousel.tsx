import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

type CarouselProps = {
  children: React.ReactNode;
  title?: string;
  slideBasis?: { xs: string; sm?: string; md?: string };
  ariaLabel?: string;
};

export default function Carousel({
  children,
  title,
  slideBasis = { xs: "80%", sm: "40%", md: "25%" },
  ariaLabel = "Carousel",
}: CarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: false,
    skipSnaps: true,
    dragFree: true,
  });
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanPrev(emblaApi.canScrollPrev());
    setCanNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  return (
    <Box role="region" aria-roledescription="carousel" aria-label={ariaLabel}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 3,
          gap: 2,
        }}
      >
        {title ? (
          <Typography variant="h4" component="h2">
            {title}
          </Typography>
        ) : (
          <span />
        )}

        <Box sx={{ display: "flex", gap: 1, flexShrink: 0 }}>
          <IconButton
            aria-label="Previous slide"
            onClick={() => emblaApi?.scrollPrev()}
            disabled={!canPrev}
            sx={{ border: "1px solid", borderColor: "divider" }}
          >
            <ChevronLeftIcon />
          </IconButton>
          <IconButton
            aria-label="Next slide"
            onClick={() => emblaApi?.scrollNext()}
            disabled={!canNext}
            sx={{ border: "1px solid", borderColor: "divider" }}
          >
            <ChevronRightIcon />
          </IconButton>
        </Box>
      </Box>

      <Box ref={emblaRef} sx={{ overflow: "hidden" }}>
        <Box
          sx={{
            display: "flex",
            gap: 2,
            "& > *": {
              flex: {
                xs: `0 0 ${slideBasis.xs}`,
                sm: slideBasis.sm ? `0 0 ${slideBasis.sm}` : undefined,
                md: slideBasis.md ? `0 0 ${slideBasis.md}` : undefined,
              },
              minWidth: 0,
            },
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
}
