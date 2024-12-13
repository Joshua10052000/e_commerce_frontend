import { useQuery } from "@tanstack/react-query";

import { getCategories } from "@/features/categories/actions/categories";

function useCategories() {
  const categories = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  return categories;
}

export { useCategories };
