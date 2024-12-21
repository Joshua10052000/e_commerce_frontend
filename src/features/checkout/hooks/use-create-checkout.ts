import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCheckout } from "../actions/checkout";

function useCreateCheckout() {
  const queryClient = useQueryClient();
  const createCheckoutMutation = useMutation({
    mutationFn: createCheckout,
    onSuccess: async ({ order }) => {
      const { links } = order;
      const payerActionLink = links.find((link) => link.rel === "payer-action");
      await queryClient.invalidateQueries({ queryKey: ["cart"] });

      window.location.href = payerActionLink?.href!;
    },
  });

  return createCheckoutMutation;
}

export { useCreateCheckout };
