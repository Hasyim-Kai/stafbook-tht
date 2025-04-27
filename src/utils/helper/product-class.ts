import { ProductClass } from "@/domain/model/product";

export function productClassStyle(productClass: ProductClass): string {
    return productClass === 'A' ? 'text-green-500'
        : productClass === 'B' ? 'text-yellow-500'
            : productClass === 'C' ? 'text-red-500 dark:text-red-400'
                : productClass === 'D' ? 'text-slate-500 dark:text-slate-400' : ''
}