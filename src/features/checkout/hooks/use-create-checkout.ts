import { useMutation } from "@tanstack/react-query";
import { createCheckout } from "../actions/checkout";

function useCreateCheckout() {
  const createCheckoutMutation = useMutation({
    mutationFn: createCheckout,
    onSuccess: ({ link }) => {
      window.location.href = link.href;
    },
  });

  return createCheckoutMutation;
}

export { useCreateCheckout };
