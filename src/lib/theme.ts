import { createTheme, responsiveFontSizes } from "@mui/material/styles";

declare module "@mui/material/Button" {
  interface ButtonPropsVariantOverrides {
    navLink: true;
  }
}

let theme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#0E1014",
      paper: "#16191F",
    },
    text: {
      primary: "#F3F4F6",
      secondary: "#9CA3AF",
      disabled: "#6B7280",
    },
    primary: {
      main: "#FF6B4A",
      dark: "#F0552F",
      contrastText: "#0E1014",
    },
    secondary: {
      main: "#8B8CFF",
      contrastText: "#0E1014",
    },
    divider: "#2A2F38",
  },
  typography: {
    fontFamily: "var(--font-open-sans), sans-serif",
  },
  components: {
    MuiButton: {
      variants: [
        {
          props: { variant: "navLink" },
          style: {
            color: "var(--text)",
            fontSize: "20px",
            textTransform: "none",
            "&:hover": {
              backgroundColor: "transparent",
              color: "primary.main",
              transition: "color 0.3s ease",
            },
          },
        },
      ],
    },
    MuiLink: {
      styleOverrides: {
        root: {
          textDecoration: "none",
          color: "inherit",
          "&:hover": {
            color: "primary.main",
            transition: "color 0.3s ease",
          },
        },
      },
    },
  },
});

theme = responsiveFontSizes(theme);

export default theme;
