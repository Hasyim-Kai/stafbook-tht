import ErrorCard from '@/components/Card/error-card';
import ProductCategories from '@/components/features/product/product-categories-table-col';
import InputTextArea from '@/components/Forms/input-text-area';
import ContentLayout from '@/components/Layout/content-layout';
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ArrowLeft, Plus, Trash2, Upload } from "lucide-react";
import { Link } from 'react-router-dom';
import useCreateVM from './_useCreateVM';


export default function index() {
    const model = useCreateVM()
    const topRight = <Link to={`/product`}>
        <Button className='items-center text-sm' variant="outline">
            <ArrowLeft className="w-4 h-4 mr-1" /> Back
        </Button>
    </Link>

    return <ContentLayout
        topRight={topRight}
        // loading={model.isDelPending || model.isFetching || model.isLoading}
        // fetching={model.isDelPending || model.isFetching || model.isLoading}
        title='Product Form' subtitle="Dynamic Form for Product Category">

        <form onSubmit={model.handleSubmit(model.onSubmit)}>
            <Table>
                <TableHeader className='dark:bg-boxdark-2 '>
                    <TableRow className=''>
                        <TableHead className="font-bold w-fit">No</TableHead>
                        <TableHead className={`font-bold`}>Produk</TableHead>
                        <TableHead className={`font-bold`}>Deskripsi Produk</TableHead>
                        <TableHead className={`font-bold`}>Gambar Produk</TableHead>
                        <TableHead className={`font-bold`}>Aksi</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {model.productFields.map((product, productIdx) =>
                        model.getValues(`products.${productIdx}.categories`).map((_, categoryIdx) =>
                            <TableRow key={categoryIdx + 1}>
                                {categoryIdx === 0 && <>
                                    <TableCell className=""
                                        rowSpan={model.getValues(`products.${productIdx}.categories`).length}>{productIdx + 1}</TableCell>
                                    <TableCell className=""
                                        rowSpan={model.getValues(`products.${productIdx}.categories`).length}>
                                        <InputTextArea
                                            placeholder="Product Name"
                                            className="w-full min-h-32"
                                            {...model.register(`products.${productIdx}.name` as const, { required: true })}
                                        //   error={!!errors.products[`productIdx`].name}
                                        />
                                    </TableCell>
                                </>}

                                <ProductCategories
                                    control={model.control}
                                    register={model.register}
                                    getValues={model.getValues}
                                    errors={model.errors}
                                    productIndex={productIdx}
                                    categoryIndex={categoryIdx}
                                    maxCategories={model.maxCategories}
                                />

                                {categoryIdx === 0 && <>
                                    <TableCell className=""
                                        rowSpan={product.categories.length}>
                                        <Button className='flex-col items-center text-center h-fit text-xs' variant="outline" onClick={() => model.handleRemoveProduct(productIdx)}>
                                            <Trash2 className="w-4 h-4 mr-1 text-red-500" /> Remove <br /> Product
                                        </Button>
                                    </TableCell>
                                </>}
                            </TableRow>
                        ))}
                </TableBody>
            </Table>

            {model.getValues("products").length < model.maxProducts && (
                <Button className='w-full mt-5' onClick={model.handleAddProduct}>
                    <Plus className="w-4 h-4 mr-2" /> Add Product
                </Button>
            )}

            <Button type='submit' className='w-full mt-5 bg-green-400 hover:bg-green-500'>
                <Upload className="mr-2" size={14} /> Submit
            </Button>

            {model.errors.products && <ErrorCard className='mt-5'
                msg={`Pastikan Semua form terisi untuk melakukan submit form`} />}

        </form>

    </ContentLayout>
}