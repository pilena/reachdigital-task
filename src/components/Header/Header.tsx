import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Badge from "@mui/material/Badge";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Box from "@mui/material/Box";
import SearchIcon from "@mui/icons-material/Search";
import PersonOutlineIcon from "@mui/icons-material/PersonOutlineOutlined";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCartOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import Link from "next/link";
import { CategoriesQuery } from "@/generated/graphql";
import Image from "next/image";
import { useCartCount } from "@/lib/cart";
import CartDrawer from "../CartDrawer/CartDrawer";

type CategoryNode = {
  id: number | null;
  name: string | null;
  url_key: string | null;
  children?: (CategoryNode | null)[] | null;
};

type HeaderProps = {
  categories: CategoriesQuery["categories"];
};

export default function Header({ categories }: HeaderProps) {
  const cartCount = useCartCount();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const rootCategories =
    categories?.items?.[0]?.children ?? ([] as CategoryNode[]);
  const quickLinks = rootCategories.slice(0, 2);
  const [cartOpen, setCartOpen] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);
  const [navStack, setNavStack] = useState<CategoryNode[]>([]);

  const currentLevel: (CategoryNode | null)[] =
    navStack.length === 0
      ? rootCategories
      : (navStack[navStack.length - 1]?.children ?? []);

  const currentTitle =
    navStack.length === 0 ? "Shop" : navStack[navStack.length - 1]?.name;

  const handleCategoryClick = (category: CategoryNode | null) => {
    if (category?.children && category.children.length > 0) {
      setNavStack((prev) => [...prev, category]);
    } else {
      setShopOpen(false);
      setNavStack([]);
    }
  };

  const handleBack = () => {
    setNavStack((prev) => prev.slice(0, -1));
  };

  const closeShop = () => {
    setShopOpen(false);
    setNavStack([]);
  };

  return (
    <AppBar
      position="static"
      sx={{ bgcolor: "common.black", height: 100, justifyContent: "center" }}
      elevation={0}
    >
      <Toolbar
        sx={{ height: 100, display: "flex", justifyContent: "space-between" }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Link href="/" aria-label="Homepage link">
            <Image
              src="/graphqcommerce_logo.svg"
              alt="Company logo"
              width={220}
              height={25}
              priority
            />
          </Link>

          {!isMobile && (
            <>
              {quickLinks.map((category) => (
                <Button
                  key={category?.id}
                  component={Link}
                  href={`/${category?.url_key}`}
                  variant="navLink"
                >
                  {category?.name}
                </Button>
              ))}
              <Button onClick={() => setShopOpen(true)} variant="navLink">
                Shop
              </Button>
              <Button component={Link} href="/blog" variant="navLink">
                Blog
              </Button>
            </>
          )}
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          {isMobile && (
            <IconButton
              aria-label="Open menu"
              onClick={() => setShopOpen(true)}
              sx={{ color: "common.white" }}
            >
              <MenuIcon />
            </IconButton>
          )}
          <IconButton aria-label="Search" sx={{ color: "common.white" }}>
            <SearchIcon />
          </IconButton>
          <IconButton aria-label="Account" sx={{ color: "common.white" }}>
            <PersonOutlineIcon />
          </IconButton>
          <IconButton
            aria-label="Cart"
            onClick={() => setCartOpen(true)}
            sx={{ color: "common.white" }}
          >
            <Badge badgeContent={cartCount} color="primary">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        </Box>
      </Toolbar>

      <Drawer anchor="left" open={shopOpen} onClose={closeShop}>
        <Box
          sx={{ width: 280 }}
          role="navigation"
          aria-label="Category navigation"
        >
          <Box sx={{ display: "flex", alignItems: "center", px: 2, py: 2 }}>
            {navStack.length > 0 && (
              <IconButton
                aria-label="Back"
                onClick={handleBack}
                size="small"
                sx={{ mr: 1 }}
              >
                <ArrowBackIcon />
              </IconButton>
            )}
            <Typography variant="h6">{currentTitle}</Typography>
          </Box>
          <List>
            {currentLevel.map((category) => (
              <ListItemButton
                key={category?.id}
                onClick={() => handleCategoryClick(category)}
              >
                <ListItemText primary={category?.name} />
                {category?.children && category.children.length > 0 && (
                  <ChevronRightIcon fontSize="small" />
                )}
              </ListItemButton>
            ))}
          </List>
        </Box>
      </Drawer>
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </AppBar>
  );
}
