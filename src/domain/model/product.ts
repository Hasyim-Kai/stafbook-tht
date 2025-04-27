import { Category, defaultCategory } from "./category";

export interface Product {
    id?: number;
    name: string;
    createdAt?: Date;
    updatedAt?: Date;
    categories: Category[];
}

export const defaultProduct: Product = {
    name: '',
    categories: [defaultCategory],
}

export interface ProductInput {
    products: Product[];
}