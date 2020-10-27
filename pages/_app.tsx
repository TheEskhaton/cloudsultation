import { ChakraProvider, extendTheme } from "@chakra-ui/core";
import Head from "next/head";
import { QueryCache, ReactQueryCacheProvider } from "react-query";
import { ReactQueryDevtools } from "react-query-devtools";
import { AppProps } from "next/app";

const theme = extendTheme({
  fonts: {
    body: "Inter, system-ui, sans-serif",
    heading: "Inter, system-ui, sans-serif",
  },
});

const queryCache = new QueryCache({
  defaultConfig: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

function MyApp({ Component, pageProps } : AppProps) {
  return (
    <ChakraProvider theme={theme} resetCSS>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <ReactQueryCacheProvider queryCache={queryCache}>
        <Component {...pageProps} />

        <ReactQueryDevtools initialIsOpen={false} />
      </ReactQueryCacheProvider>
    </ChakraProvider>
  );
}

export default MyApp;
