import InputFile from "@/components/Forms/input-file"
import InputTextArea from "@/components/Forms/input-text-area"
import { Button } from "@/components/ui/button"
import { TableCell } from "@/components/ui/table"
import { defaultCategory } from "@/domain/model/category"
import { ProductInput } from "@/domain/model/product"
import { IToastInfo } from "@/utils/helper/toast"
import { Plus, X } from "lucide-react"
import { useEffect } from "react"
import { Control, Controller, FieldErrors, useFieldArray, UseFormGetValues, UseFormRegister } from "react-hook-form"

interface ProductCategoriesProps {
    control: Control<ProductInput>
    register: UseFormRegister<ProductInput>
    getValues: UseFormGetValues<ProductInput>
    errors: FieldErrors
    productIndex: number
    categoryIndex: number
    maxCategories: number
}

export default function ProductCategories({ register, errors, getValues, control, productIndex, categoryIndex, maxCategories }: ProductCategoriesProps) {
    const { append: appendCategory, remove: removeCategory, } = useFieldArray({
        control,
        name: `products.${productIndex}.categories`,
    });

    const categories = getValues(`products.${productIndex}.categories`);
    const handleAddCategory = () => {
        appendCategory(defaultCategory);

        // if we add new category while categories.length is 2, and maxCategories is 3
        // plus 1 categories.length, meet the maxCategories condition and fire toast
        if (categories.length + 1 === maxCategories) {
            IToastInfo(
                `Batas maksimum kategori tercapai`,
                `Anda sudah mencapai batas maksimum 3 kategori untuk 1 produk`
            )
        }
    };

    const handleRemoveCategory = () => {
        control.unregister(`products.${productIndex}.categories.${categoryIndex}.image`);
        removeCategory(categoryIndex);
    };


    return <>
        <TableCell className="">
            <InputTextArea
                placeholder="Product Category"
                className="w-full min-h-32"
                {...register(`products.${productIndex}.categories.${categoryIndex}.name` as const, { required: true })}
            //   error={!!errors.description}
            />
        </TableCell>
        <TableCell className="">
            <Controller
                control={control}
                name={`products.${productIndex}.categories.${categoryIndex}.image` as const}
                rules={{ required: true }}
                render={({ field: { onChange, value, }, formState: { errors }, }) => <>
                    <InputFile changeFileFn={onChange} file={value}
                    // error={!!errors.photo} 
                    />
                </>} />
        </TableCell>
        <TableCell className="">
            <div className='flex flex-col items-center gap-3'>
                {categories.length > 1 && <Button className='flex-col items-center text-center h-fit text-xs' variant="outline"
                    onClick={handleRemoveCategory}>
                    <X className="w-4 h-4 mr-1 text-red-500" /> Remove <br /> Category
                </Button>}
                {categories.length < maxCategories && categories.length - 1 === categoryIndex && (
                    <Button className='flex-col items-center text-center h-fit text-xs' variant="outline"
                        onClick={handleAddCategory}>
                        <Plus className="w-4 h-4 mr-1 text-green-500" /> Add <br /> Category
                    </Button>
                )}
            </div>
        </TableCell>
    </>
}