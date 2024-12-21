interface CheckoutLink {
  href: string;
  method: string;
  rel: string;
}

interface Order {
  links: CheckoutLink[];
}

interface CreateCheckoutServerResponse {
  order: Order;
}

export type { CreateCheckoutServerResponse };
