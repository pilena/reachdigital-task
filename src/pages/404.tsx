import { GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";
import { Box, Button, Typography } from "@mui/material";
import { apolloClient } from "@/lib/apolloClient";
import { CategoriesDocument, CategoriesQuery } from "@/generated/graphql";
import Layout from "@/components/layout/Layout";

type NotFoundProps = {
  categories: CategoriesQuery["categories"];
};

export default function NotFound({ categories }: NotFoundProps) {
  return (
    <Layout categories={categories}>
      <Head>
        <title>Page not found</title>
        <meta name="robots" content="noindex" />
      </Head>
      <Box
        component="main"
        sx={{
          minHeight: "60vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          px: 2,
          py: { xs: 8, md: 12 },
          gap: 2,
        }}
      >
        <Typography
          sx={{ fontSize: { xs: 64, md: 96 }, fontWeight: 800, lineHeight: 1 }}
        >
          404
        </Typography>
        <Typography
          variant="h1"
          sx={{ fontSize: { xs: 22, md: 28 }, fontWeight: 700 }}
        >
          Page not found
        </Typography>
        <Typography sx={{ color: "#888", maxWidth: 420 }}>
          The page you&apos;re looking for doesn&apos;t exist or may have been
          moved.
        </Typography>
        <Button
          component={Link}
          href="/"
          variant="contained"
          size="large"
          sx={{
            mt: 2,
            bgcolor: "#fff",
            color: "#000",
            px: 4,
            "&:hover": { bgcolor: "#ddd" },
          }}
        >
          Back to home
        </Button>
      </Box>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps<NotFoundProps> = async () => {
  const { data } = await apolloClient.query<CategoriesQuery>({
    query: CategoriesDocument,
  });

  return {
    props: {
      categories: data.categories,
    },
  };
};
