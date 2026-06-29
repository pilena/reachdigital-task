import { CategoriesQuery } from "@/generated/graphql";
import Header from "./Header";
import Footer from "./Footer";

type LayoutProps = {
  categories: CategoriesQuery["categories"];
  children: React.ReactNode;
};

export default function Layout({ categories, children }: LayoutProps) {
  return (
    <div>
      <Header categories={categories} />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
