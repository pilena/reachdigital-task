import Image from "next/image";
import { Box } from "@mui/material";
import Carousel from "@/components/common/Carousel";
import { ProductImage } from "@/types/productDetail";

type Props = { images: ProductImage[]; productName: string };

export default function ProductGallery({ images, productName }: Props) {
  if (images.length === 0) {
    return (
      <Box
        sx={{
          aspectRatio: "1 / 1",
          width: "100%",
          bgcolor: "#111",
          borderRadius: 1,
        }}
      />
    );
  }

  return (
    <Carousel ariaLabel={`${productName} images`} slideBasis={{ xs: "100%" }}>
      {images.map((img, i) => (
        <Box
          key={img.url}
          sx={{
            position: "relative",
            aspectRatio: "1 / 1",
            width: "100%",
            bgcolor: "#fff",
            borderRadius: 1,
            overflow: "hidden",
          }}
        >
          <Image
            src={img.url}
            alt={img.label || `${productName} — image ${i + 1}`}
            fill
            sizes="(max-width: 900px) 100vw, 50vw"
            style={{ objectFit: "contain" }}
            priority={i === 0}
          />
        </Box>
      ))}
    </Carousel>
  );
}
