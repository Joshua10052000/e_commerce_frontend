import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import "@/styles/globals.css";
import RootLayout from "./app/layout";
import Homepage from "./app/page";
import AuthLayout from "./app/auth/layout";
import SignupPage from "./app/auth/signup/page";
import SigninPage from "./app/auth/signin/page";
import { QueryProvider } from "./components/global/query-provider";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<RootLayout />}>
            <Route index element={<Homepage />} />
          </Route>

          <Route path="auth" element={<AuthLayout />}>
            <Route path="signup" element={<SignupPage />} />
            <Route path="signin" element={<SigninPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryProvider>
  </StrictMode>,
);
