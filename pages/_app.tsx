import type { AppProps } from "next/app";
import "@/styles/reset.css";
import { ThemeProvider } from "styled-components";
import { theme } from "@/styles/theme";
import "@/utils/firebase";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
