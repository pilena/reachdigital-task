import { useCallback, useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Pagination from "@mui/material/Pagination";
import Alert from "@mui/material/Alert";
import ProductGrid from "@/components/product/ProductGrid";
import { Product } from "@/types/product";
import { useRouter } from "next/router";
import { Divider } from "@mui/material";

type PlpProps = {
  categoryId: number;
  categoryName: string;
  initialProducts: Product[];
  initialTotalPages: number;
  description: string | null;
  initialTotalCount: number;
};

type LoadParams = {
  page: number;
  sort: string;
  minPrice: string;
  maxPrice: string;
};

export default function Plp({
  categoryId,
  categoryName,
  description,
  initialProducts,
  initialTotalPages,
  initialTotalCount,
}: PlpProps) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [totalPages, setTotalPages] = useState(initialTotalPages);
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalCount, setTotalCount] = useState(initialTotalCount);

  const router = useRouter();
  const [hydrated, setHydrated] = useState(false);

  const load = useCallback(
    async ({ page, sort, minPrice, maxPrice }: LoadParams) => {
      setLoading(true);
      setError(null);
      try {
        const qs = new URLSearchParams({
          categoryId: String(categoryId),
          page: String(page),
        });
        if (sort) qs.set("sort", sort);
        if (minPrice) qs.set("minPrice", minPrice);
        if (maxPrice) qs.set("maxPrice", maxPrice);

        const res = await fetch(`/api/category-products?${qs.toString()}`);
        if (!res.ok) throw new Error("Request failed");
        const data = await res.json();

        setProducts((data.items ?? []).filter(Boolean) as Product[]);
        setTotalPages(data.page_info?.total_pages ?? 1);
        setPage(page);
        setTotalCount(data.total_count ?? 0);

        const urlQuery: Record<string, string | string[]> = {
          slug: router.query.slug as string[],
        };
        if (page > 1) urlQuery.page = String(page);
        if (sort) urlQuery.sort = sort;
        if (minPrice) urlQuery.minPrice = minPrice;
        if (maxPrice) urlQuery.maxPrice = maxPrice;

        router.replace({ pathname: "/[...slug]", query: urlQuery }, undefined, {
          shallow: true,
          scroll: false,
        });
      } catch {
        setError("Something went wrong loading products. Please try again.");
      } finally {
        setLoading(false);
      }
    },
    [categoryId, router],
  );

  useEffect(() => {
    if (!router.isReady || hydrated) return;
    setHydrated(true);

    const q = router.query;
    const urlPage = Number(q.page) || 1;
    const urlSort = typeof q.sort === "string" ? q.sort : "";
    const urlMin = typeof q.minPrice === "string" ? q.minPrice : "";
    const urlMax = typeof q.maxPrice === "string" ? q.maxPrice : "";

    setSort(urlSort);
    setMinPrice(urlMin);
    setMaxPrice(urlMax);

    if (urlPage > 1 || urlSort || urlMin || urlMax) {
      load({
        page: urlPage,
        sort: urlSort,
        minPrice: urlMin,
        maxPrice: urlMax,
      });
    }
  }, [router.isReady, hydrated, load, router.query]);

  const handleSortChange = (e: SelectChangeEvent) => {
    const newSort = e.target.value;
    setSort(newSort);
    load({ page: 1, sort: newSort, minPrice, maxPrice });
  };

  const handleApplyPrice = () => {
    load({ page: 1, sort, minPrice, maxPrice });
  };

  const handlePageChange = (_e: React.ChangeEvent<unknown>, value: number) => {
    load({ page: value, sort, minPrice, maxPrice });
    if (typeof window !== "undefined")
      window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Container maxWidth="xl" sx={{ py: 5 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          mb: 4,
        }}
      >
        <Typography variant="h2" component="h1" sx={{ fontWeight: 600, mb: 3 }}>
          {categoryName}
        </Typography>
        {description && (
          <Box
            sx={{
              color: "text.primary",
              fontSize: "1.1rem",
              textAlign: "center",
              maxWidth: 720,
              mx: "auto",
              mb: 4,
            }}
            dangerouslySetInnerHTML={{ __html: description }}
          />
        )}
      </Box>

      <Stack
        sx={{
          mb: 4,
          flexDirection: { xs: "column", sm: "row" },
          alignItems: { xs: "stretch", sm: "justify-content" },
          justifyContent: "space-between",
          gap: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            gap: 2,
            justifyContent: "space-between",
            flexWrap: "wrap",
          }}
        >
          <Box
            sx={{
              display: "flex",
              gap: 2,
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <TextField
              size="small"
              label="Min price"
              type="number"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              sx={{ width: 120 }}
            />
            <TextField
              size="small"
              label="Max price"
              type="number"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              sx={{ width: 120 }}
            />
          </Box>
          <Button
            variant="outlined"
            onClick={handleApplyPrice}
            disabled={loading}
          >
            Apply
          </Button>
        </Box>

        <FormControl size="small" sx={{ minWidth: 180 }}>
          <InputLabel id="sort-label">Sort by</InputLabel>
          <Select
            labelId="sort-label"
            label="Sort by"
            value={sort}
            onChange={handleSortChange}
          >
            <MenuItem value="">Default</MenuItem>
            <MenuItem value="price_asc">Price: low to high</MenuItem>
            <MenuItem value="price_desc">Price: high to low</MenuItem>
            <MenuItem value="name_asc">Name: A–Z</MenuItem>
            <MenuItem value="name_desc">Name: Z–A</MenuItem>
          </Select>
        </FormControl>
      </Stack>

      {/* display number of products */}
      <Box
        sx={{
          maxWidth: 640,
          mx: "auto",
          display: "grid",
          gridTemplateColumns: "1fr max-content 1fr",
          alignItems: "center",
          gap: 2,
          mb: 6,
        }}
      >
        <Divider />
        <Typography
          color="text.secondary"
          sx={{
            fontSize: "0.85rem",
            textAlign: "center",
            color: "text.secondary",
          }}
        >
          {totalCount} product{totalCount !== 1 ? "s" : ""} found
        </Typography>
        <Divider />
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <Box
        sx={{
          opacity: loading ? 0.5 : 1,
          transition: "opacity 0.2s",
          pointerEvents: loading ? "none" : "auto",
        }}
      >
        <ProductGrid products={products} />
      </Box>

      {totalPages > 1 && (
        <Stack sx={{ mt: 5, alignItems: "center" }}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={handlePageChange}
            color="primary"
            disabled={loading}
          />
        </Stack>
      )}
    </Container>
  );
}
