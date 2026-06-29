import type { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";
import { CacheProvider, EmotionCache } from "@emotion/react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { apolloClient } from "@/lib/apolloClient";
import createEmotionCache from "@/lib/createEmotionCache";
import theme from "@/lib/theme";
import { openSans } from "@/lib/fonts";
import { useCartHydration } from "@/lib/cart";

const clientSideEmotionCache = createEmotionCache();

type MyAppProps = AppProps & {
  emotionCache?: EmotionCache;
};

export default function App({
  Component,
  pageProps,
  emotionCache = clientSideEmotionCache,
}: MyAppProps) {
  useCartHydration();
  return (
    <div className={`${openSans.variable}`}>
      <CacheProvider value={emotionCache}>
        <ApolloProvider client={apolloClient}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Component {...pageProps} />
          </ThemeProvider>
        </ApolloProvider>
      </CacheProvider>
    </div>
  );
}
