interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
  createdAt: Date;
  updatedAt: Date;
}

interface CategoryResponse {
  categories: Category[];
}

export type { Category, CategoryResponse };
