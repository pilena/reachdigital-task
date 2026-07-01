import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Carousel from "@/components/common/Carousel";
import ProductCard from "@/components/product/ProductCard";
import { Product } from "@/types/product";

type ProductCarouselProps = {
  title: string;
  products: Product[];
};

export default function ProductCarousel({
  title,
  products,
}: ProductCarouselProps) {
  if (products.length === 0) return null;

  return (
    <Box component="section" aria-label={title} sx={{ py: { xs: 6, sm: 12 } }}>
      <Container maxWidth="xl">
        <Carousel title={title} ariaLabel={title}>
          {products.map((product) => (
            <ProductCard key={product.uid} product={product} />
          ))}
        </Carousel>
      </Container>
    </Box>
  );
}
