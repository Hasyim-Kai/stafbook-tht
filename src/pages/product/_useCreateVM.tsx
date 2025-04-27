import { defaultProduct, ProductInput } from "@/domain/model/product";
import { IToastInfo, IToastSuccess } from "@/utils/helper/toast";
import { useQueryClient } from "@tanstack/react-query";
import { useFieldArray, useForm } from "react-hook-form";

export default function useVM() {
    const queryClient = useQueryClient()

    // CREATE =================================================================================
    const maxProducts = 5;
    const maxCategories = 3;

    const { control, handleSubmit, register, getValues, reset, formState: { errors } } = useForm<ProductInput>({
        defaultValues: {
            products: [defaultProduct],
        },
    });

    const { fields: productFields, append: appendProduct, remove: removeProduct } = useFieldArray({
        control,
        name: "products",
    });

    const onSubmit = (data: ProductInput) => {
        const formData = new FormData();

        data.products.forEach((product, productIndex) => {
            formData.append(`products[${productIndex}][name]`, product.name);
            product.categories.forEach((category, categoryIndex) => {
                formData.append(`products[${productIndex}][categories][${categoryIndex}][name]`, category.name);
                if (category.image) {
                    formData.append(`products[${productIndex}][categories][${categoryIndex}][image]`, category.image);
                }
            });
        });

        // For debugging: log FormData entries
        for (let [key, value] of formData.entries()) {
            console.log(key, value);
        }

        IToastSuccess(`Produk berhasil ditambahkan`)
    };

    const handleAddProduct = () => {
        const products = getValues("products");

        // if we add new product while products.length is 4, and maxProducts is 5
        // plus 1 products.length, meet the maxProducts condition and fire toast
        if (products.length + 1 === maxProducts) {
            IToastInfo(
                `Batas maksimum produk tercapai`,
                `Anda sudah mencapai batas maksimum 5 produk`
            )
        }
        appendProduct(defaultProduct);
    };

    const handleRemoveProduct = (index: number) => {
        removeProduct(index);
    };

    // const { mutate, error: signinErr, isPending } = useMutation({
    //     onSuccess: (data) => {
    //         localStorage.setItem(`${appConfig.localStorageName}`, JSON.stringify({ token: data.token }))
    //         if (data.role === "ADMIN") {
    //             router("/dashboard")
    //         } else if (data.role === "COURIER") {
    //             router("/shipment")
    //         } else {
    //             router("/product")
    //         }
    //         IToastSuccess('Welcome back', 'Have a look on our goods catalog')
    //     },
    //     onSettled: () => queryClient.invalidateQueries({ queryKey: [QueryKey.userInfo] }),
    //     mutationFn: (input: SignInInputTypes) => authRepo.signin(input)
    // })
    // const onSubmit = (data: SignInInputTypes) => { mutate(data) }


    return {
        maxProducts, maxCategories,
        control, handleSubmit, register, getValues, errors,
        productFields, appendProduct, removeProduct,

        onSubmit, handleAddProduct, handleRemoveProduct
        // isPending, onSubmit,
        // signinErr: (signinErr as any)?.response?.data?.message,

    }
}