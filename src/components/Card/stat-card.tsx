import { cn } from "@/utils/helper/style-merger"
import { ReactNode } from "react"
import Loading from "../Loader/loading"
import { Badge } from "../ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"

type Props = {
    value: string | number
    subValue?: string | number
    title: string
    classNames?: string
    loading?: boolean
    icon: ReactNode
}

export default function StatCard({
    classNames,
    loading = false,
    icon,
    value = '',
    subValue = '',
    title = '',
}: Props) {

    return <Card className={cn('', classNames)}>
        <CardHeader>
            <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4">
                {icon}
            </div>
        </CardHeader>
        <CardContent className=''>
            {loading ? <Loading /> : <>
                <CardTitle className='mb-1'>{value}</CardTitle>
                <div className="flex justify-between flex-wrap">
                    <CardDescription>{title}</CardDescription>
                    {subValue && <Badge>{subValue}</Badge>}
                </div>
            </>}
        </CardContent>
    </Card>
}