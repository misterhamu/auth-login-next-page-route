// ** React Imports
import { ReactNode, ReactElement, useEffect } from "react";

// ** Next Import
import { useRouter } from "next/router";

// ** Hooks Import
import { Storage } from "@/services/storage";
import LoginPage from "@/pages/login/index";
import { useAuth } from "@/context/AuthContext";

interface AuthGuardProps {
  children: ReactNode;
  fallback: ReactElement | null;
}

const AuthGuard = (props: AuthGuardProps) => {
  const { children, fallback } = props;
  const auth = useAuth();
  const router = useRouter();
  const storage = Storage.getInstance();

  useEffect(
    () => {
      if (!router.isReady) {
        return;
      }

      if (!storage.getSessionToken()) {
        if (router.asPath !== "/") {
          router.replace({
            pathname: "/login",
            query: { returnUrl: router.asPath },
          });
        } else {
          router.replace("/login");
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [router.route]
  );

  if (auth.user === null && !auth.loading) {
    return <LoginPage />;
  }

  if (auth.loading) {
    return <></>;
  }

  return <>{children}</>;
};

export default AuthGuard;
