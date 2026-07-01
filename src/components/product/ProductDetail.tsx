import { useMemo, useState } from "react";
import { Box, Button, Chip, Stack, Typography } from "@mui/material";
import ProductGallery from "@/components/product/ProductGallery";
import Specifications from "@/components/product/Specifications";
import { ProductDetail as ProductDetailType } from "@/types/productDetail";
import { addToCart } from "@/lib/cart";
import OptionSelector from "./OptionsSelector";
import QuantitySelector from "./QtySelector";
import Breadcrumbs, { Crumb } from "../common/Breadcrumbs";

function formatPrice(value: number, currency: string) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(value);
}

export default function ProductDetail({
  product,
  breadcrumbs,
}: {
  product: ProductDetailType;
  breadcrumbs: Crumb[];
}) {
  const [selected, setSelected] = useState<Record<string, string>>({});
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const allSelected = product.options.every((o) => selected[o.attributeCode]);

  // Resolve the chosen variant by matching option labels to variant attributes.
  const selectedVariant = useMemo(() => {
    if (!product.isConfigurable || !allSelected) return null;

    const chosenLabels: Record<string, string> = {};
    for (const o of product.options) {
      const val = o.values.find((v) => v.uid === selected[o.attributeCode]);
      if (val) chosenLabels[o.attributeCode] = val.label;
    }

    return (
      product.variants.find((variant) =>
        variant.attributes.every((a) => chosenLabels[a.code] === a.label),
      ) ?? null
    );
  }, [product, selected, allSelected]);

  const baseFinal = product.finalPrice ?? product.price;
  const onSale = !selectedVariant && baseFinal < product.price;
  const displayPrice =
    selectedVariant?.price ?? (onSale ? baseFinal : product.price);
  const stockStatus = selectedVariant?.stockStatus ?? product.stockStatus;
  const inStock = stockStatus !== "OUT_OF_STOCK";

  const canAdd =
    inStock &&
    (!product.isConfigurable || (allSelected && selectedVariant !== null));

  const handleAdd = () => {
    if (!canAdd) return;
    addToCart(
      {
        uid: selectedVariant?.uid || product.uid,
        sku: selectedVariant?.sku || product.sku,
        name: product.name,
        price: displayPrice,
        currency: product.currency,
      },
      qty,
    );
    setAdded(true);
    window.setTimeout(() => setAdded(false), 2000);
  };

  const specRows = [
    { label: "SKU", value: product.sku },
    { label: "Availability", value: inStock ? "In stock" : "Out of stock" },
    ...(product.weight != null
      ? [{ label: "Weight", value: String(product.weight) }]
      : []),
    ...product.options.map((o) => ({
      label: o.label,
      value: o.values.map((v) => v.label).join(", "),
    })),
  ];

  return (
    <Box
      component="article"
      sx={{
        maxWidth: 1200,
        mx: "auto",
        px: { xs: 2, md: 4 },
        py: { xs: 4, md: 6 },
      }}
    >
      <Breadcrumbs items={breadcrumbs} />
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
          gap: { xs: 4, md: 6 },
          alignItems: "start",
        }}
      >
        <ProductGallery images={product.images} productName={product.name} />

        <Stack spacing={3}>
          <Box>
            <Typography
              variant="h1"
              sx={{ fontSize: { xs: 28, md: 34 }, fontWeight: 700 }}
            >
              {product.name}
            </Typography>
            <Typography sx={{ color: "#888", mt: 0.5 }}>
              SKU: {product.sku}
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              flexWrap: "wrap",
            }}
          >
            <Typography
              sx={{
                fontSize: 28,
                fontWeight: 700,
                color: onSale ? "error.main" : "inherit",
              }}
            >
              {formatPrice(displayPrice, product.currency)}
            </Typography>
            {onSale && (
              <>
                <Typography
                  sx={{
                    fontSize: 20,
                    textDecoration: "line-through",
                    color: "#888",
                  }}
                >
                  {formatPrice(product.price, product.currency)}
                </Typography>
              </>
            )}
          </Box>

          {product.shortDescriptionHtml && (
            <Box
              sx={{ color: "#bbb" }}
              dangerouslySetInnerHTML={{ __html: product.shortDescriptionHtml }}
            />
          )}

          {product.options.map((option) => (
            <OptionSelector
              key={option.uid}
              option={option}
              selectedUid={selected[option.attributeCode]}
              onSelect={(valueUid) =>
                setSelected((prev) => ({
                  ...prev,
                  [option.attributeCode]: valueUid,
                }))
              }
            />
          ))}

          <Box>
            <Typography component="p" sx={{ mb: 1, fontWeight: 600 }}>
              Quantity
            </Typography>
            <QuantitySelector value={qty} onChange={setQty} />
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              flexWrap: "wrap",
            }}
          >
            <Button
              variant="contained"
              size="large"
              disabled={!canAdd}
              onClick={handleAdd}
              sx={{
                bgcolor: "#fff",
                color: "#000",
                px: 4,
                "&:hover": { bgcolor: "#ddd" },
              }}
            >
              {inStock ? "Add to Cart" : "Out of Stock"}
            </Button>
            {product.isConfigurable && !allSelected && (
              <Typography sx={{ color: "#888" }}>
                Please select all options
              </Typography>
            )}
            <Box role="status" aria-live="polite">
              {added && <Chip label="Added to cart" color="success" />}
            </Box>
          </Box>
        </Stack>
      </Box>

      {product.descriptionHtml && (
        <Box component="section" aria-labelledby="desc-heading" sx={{ mt: 6 }}>
          <Typography
            id="desc-heading"
            variant="h2"
            sx={{ fontSize: 24, mb: 2 }}
          >
            Description
          </Typography>
          <Box
            sx={{ color: "#bbb", lineHeight: 1.7 }}
            dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
          />
        </Box>
      )}

      <Specifications rows={specRows} />
    </Box>
  );
}
