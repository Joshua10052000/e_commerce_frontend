interface CheckoutLink {
  href: string;
  method: string;
  rel: string;
}

interface CreateCheckoutServerResponse {
  link: CheckoutLink;
}

export type { CreateCheckoutServerResponse };
