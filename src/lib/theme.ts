import { createTheme } from "@mui/material/styles";

declare module "@mui/material/Button" {
  interface ButtonPropsVariantOverrides {
    navLink: true;
  }
}

const theme = createTheme({
  palette: {
    mode: "dark",
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
            color: "#ffffff",
            fontSize: "20px",
            textTransform: "none",
            "&:hover": {
              backgroundColor: "transparent",
              color: "#BDBDBD",
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
          marginRight: "0px",
          color: "inherit",
          "&:hover": {
            color: "#BDBDBD",
            transition: "color 0.3s ease",
          },
        },
      },
    },
  },
});

export default theme;
