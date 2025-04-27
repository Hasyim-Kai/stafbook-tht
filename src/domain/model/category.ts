export interface Category {
  id?: number;
  name: string;
  productId: string;
  image_path?: string;
  image?: File;
  createdAt?: Date;
  updatedAt?: Date;
}

export const defaultCategory: Category = {
  name: '',
  productId: `1`,
}