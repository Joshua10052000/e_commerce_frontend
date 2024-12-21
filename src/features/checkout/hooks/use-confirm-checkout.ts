import { useMutation, useQueryClient } from "@tanstack/react-query";
import { confirmCheckout } from "../actions/confirm";
import { useNavigate } from "react-router";

function useConfirmCheckout() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const confirm = useMutation({
    mutationFn: confirmCheckout,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["cart"] });
      navigate("/checkout/callback?success=true");
    },
    onError: () => {
      navigate("/cart");
    },
  });

  return confirm;
}

export { useConfirmCheckout };
