import { Cart, CartInputTypes } from "@/domain/model/cart"
import { productClassStyle } from "@/utils/helper/product-class"
import { cn, loadImgUrlFromBe } from "@/utils/helper/style-merger"
import { Minus, Plus, Trash2 } from "lucide-react"
import { useEffect, useState } from "react"
import Loading from "../Loader/loading"
import { Button } from "../ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import LazyImg from "../Image/lazy-img"

type Props = {
    item: Cart
    classNames?: string
    loading?: boolean
    onChange: (value: CartInputTypes) => void
    onDel: (id: string) => void
}

export default function CartCard({
    item, classNames,
    loading = false,
    onChange,
    onDel,
}: Props) {

    const [qty, setQty] = useState(item.qty)
    useEffect(() => {
        const timeout = setTimeout(() => {
            if (qty !== item.qty) {
                onChange({ productId: String(item.id), qty })
            }
        }, 1500)

        return () => clearTimeout(timeout)
    }, [qty])

    return <Card className={cn("mb-5 bg-transparent border-0 shadow-none cursor-pointer", classNames)}>
        <CardHeader className='p-0 rounded-md mb-3 overflow-hidden'>
            <LazyImg realImgSrc={loadImgUrlFromBe(item.product.photoUrl)} alt="Vegetable & Fruit" />
        </CardHeader>
        <CardContent className='p-0'>
            <div className='flex gap-3 items-center'>
                <div className='pr-1 flex flex-col items-center'>
                    <CardTitle className={cn("text-4xl", productClassStyle(item.product.class))}>{item.product.class}</CardTitle>
                    <CardDescription className=''>Class</CardDescription>
                </div>
                <hr className='h-16 w-0.5 bg-slate-100 dark:bg-slate-700' />
                <div className='flex-1'>
                    <CardTitle className="text-xl ">{item.product.name}</CardTitle>
                    <h1 className='text-lg'>$ {item.product.price} / Kg</h1>
                    <h1 className='text-xl text-slate-400'>{item.qty} <span className='text-xs'>Kg</span>
                    </h1>
                </div>
            </div>
            {loading ? <Loading className="my-2 opacity-50" />
                : <div className='mt-3 flex gap-3 items-center justify-between'>
                    <div className="flex gap-3 items-center">
                        <Button className='w-8 h-8' size="icon" variant={'outline'} onClick={() => setQty(qty - 1)}>
                            <Minus size={14} color='orange' />
                        </Button>
                        <h1>{qty}</h1>
                        <Button className='w-8 h-8' size="icon" variant={'outline'} onClick={() => setQty(qty + 1)}>
                            <Plus size={14} color='orange' />
                        </Button>
                    </div>
                    <Button className='text-xs gap-2' variant="destructive" onClick={() => onDel(String(item.id))}>
                        Delete
                        <Trash2 size={14} />
                    </Button>
                </div>}
        </CardContent>
    </Card>
}