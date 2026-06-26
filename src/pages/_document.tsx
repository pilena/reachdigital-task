import * as React from "react";
import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
  DocumentInitialProps,
} from "next/document";
import createEmotionServer from "@emotion/server/create-instance";
import createEmotionCache from "@/lib/createEmotionCache";
import type { AppProps } from "next/app";
import type { EmotionCache } from "@emotion/react";

interface MyDocumentProps extends DocumentInitialProps {
  emotionStyleTags: React.ReactElement[];
}

export default class MyDocument extends Document<MyDocumentProps> {
  render() {
    return (
      <Html lang="en">
        <Head>{this.props.emotionStyleTags}</Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

MyDocument.getInitialProps = async (
  ctx: DocumentContext,
): Promise<
  DocumentInitialProps & { emotionStyleTags: React.ReactElement[] }
> => {
  const originalRenderPage = ctx.renderPage;
  const cache = createEmotionCache();
  const { extractCriticalToChunks } = createEmotionServer(cache);

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (
        App: React.ComponentType<AppProps & { emotionCache?: EmotionCache }>,
      ) =>
        function EnhanceApp(props: AppProps) {
          return <App emotionCache={cache} {...props} />;
        },
    });

  const initialProps = await Document.getInitialProps(ctx);
  const emotionStyles = extractCriticalToChunks(initialProps.html);
  const emotionStyleTags = emotionStyles.styles.map((style) => (
    <style
      data-emotion={`${style.key} ${style.ids.join(" ")}`}
      key={style.key}
      dangerouslySetInnerHTML={{ __html: style.css }}
    />
  ));

  return {
    ...initialProps,
    emotionStyleTags,
  };
};
