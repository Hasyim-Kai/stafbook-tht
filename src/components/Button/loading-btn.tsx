import { ArrowRight } from 'lucide-react'
import React from 'react'
import { Button } from '../ui/button'
import Loading from '../Loader/loading'
import { useNavigate } from 'react-router-dom'
import { cn } from '@/utils/helper/style-merger'
import { BtnTypes } from './types'

type Props = {
    className?: string
    type: BtnTypes,
    title?: string
    disabled?: boolean
    loading?: boolean
    icon?: React.ReactNode
    onClickFn?: () => void
}

export default function LoadingBtn({
    className,
    type,
    title = 'Submit',
    disabled = false,
    loading = false,
    onClickFn = () => { },
    icon = <ArrowRight size={18} color="white" />, }: Props) {

    return <Button type={type} disabled={disabled}
        className={cn(`items-center gap-2`, className)} onClick={onClickFn}>
        {title}
        {loading ? <Loading className='w-fit' isSmall /> : icon}
    </Button>
}