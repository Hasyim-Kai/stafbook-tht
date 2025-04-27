import { productClassStyle } from "@/utils/helper/product-class"
import { loadImgUrlFromBe, cn } from "@/utils/helper/style-merger"
import { Link } from "react-router-dom"
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "../ui/card"
import { Product } from "@/domain/model/product"
import LazyImg from "../Image/lazy-img"

type Props = {
    item: Product
    classNames?: string
}

export default function ProdcutCaard({ item, classNames }: Props) {

    return <Link to={String(item.id)}>
        <Card className={cn("mb-5 max-h-96 bg-transparent border-0 shadow-none hover:scale-105 transition cursor-pointer", classNames)}>
            <CardHeader className='p-0 rounded-md mb-3 overflow-hidden'>
                <LazyImg realImgSrc={loadImgUrlFromBe(item.photoUrl)} alt="Vegetable & Fruit" />
            </CardHeader>
            <CardContent className='p-0 flex gap-3 items-center'>
                <div className='pr-1 flex flex-col items-center'>
                    <CardTitle className={cn("text-4xl", productClassStyle(item.class))}>{item.class}</CardTitle>
                    <CardDescription className=''>Class</CardDescription>
                </div>
                <hr className='h-16 w-0.5 bg-slate-100 dark:bg-slate-700' />
                <div className='flex-1'>
                    <h1 className='text-lg'>{item.name}</h1>
                    <CardTitle className="text-3xl ">$ {item.price} / Kg</CardTitle>
                    <h1 className='text-xl text-slate-400'>{item.stock}
                        <span className='text-xs'>Kg</span>
                    </h1>
                </div>
            </CardContent>
        </Card>
    </Link>
}