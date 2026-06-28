import { CategoriesQuery } from "@/generated/graphql";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

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
