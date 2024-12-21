import { useMutation } from "@tanstack/react-query";
import { createReview } from "../action/create-review";

function useCreateReview() {
  const create = useMutation({
    mutationFn: createReview,
  });

  return create;
}

export { useCreateReview };
