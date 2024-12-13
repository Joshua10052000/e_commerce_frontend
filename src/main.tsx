import "@/styles/globals.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryProvider } from "./context/query-provider";
import { BrowserRouter, Route, Routes } from "react-router";
import RootLayout from "@/app/layout";
import Homepage from "@/app/page";

import AuthLayout from "@/app/auth/layout";
import AuthPage from "@/app/auth/page";

import SignupPage from "@/app/auth/signup/page";
import SigninPage from "@/app/auth/signin/page";

import ProductsLayout from "@/app/products/layout";
import ProductsPage from "@/app/products/page";

import CartLayout from "@/app/cart/layout";
import CartPage from "@/app/cart/page";
import CheckoutLayout from "./app/checkout/layout";
import CheckoutPage from "./app/checkout/page";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <QueryProvider>
        <Routes>
          <Route element={<RootLayout />}>
            <Route index element={<Homepage />} />

            <Route path="products" element={<ProductsLayout />}>
              <Route index element={<ProductsPage />} />
            </Route>

            <Route path="cart" element={<CartLayout />}>
              <Route index element={<CartPage />} />
            </Route>
            <Route path="checkout" element={<CheckoutLayout />}>
              <Route index element={<CheckoutPage />} />
            </Route>
          </Route>

          <Route path="auth" element={<AuthLayout />}>
            <Route index element={<AuthPage />} />
            <Route path="signup" element={<SignupPage />} />
            <Route path="signin" element={<SigninPage />} />
          </Route>
        </Routes>
      </QueryProvider>
    </BrowserRouter>
  </StrictMode>,
);
