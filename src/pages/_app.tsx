import AuthGuard from "@/components/authGuard";
import Navbar from "@/components/navbar";
import Spinner from "@/components/spinner";
import { AuthProvider } from "@/context/AuthContext";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <AuthGuard fallback={<Spinner />}>
        <Navbar />
        <Component {...pageProps} />
      </AuthGuard>
    </AuthProvider>
  );
}
