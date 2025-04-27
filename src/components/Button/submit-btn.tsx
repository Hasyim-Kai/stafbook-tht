import { cn } from '@/utils/helper/style-merger'
import { ArrowRight } from 'lucide-react'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../ui/button'
import LoadingBtn from './loading-btn'

type Props = {
    className?: string
    title?: string
    disabled?: boolean
    loading?: boolean
    icon?: React.ReactNode
    includeCancelBtn?: boolean
}

export default function SubmitBtn({
    className,
    title = 'Submit',
    disabled = false,
    loading = false,
    includeCancelBtn = true,
    icon = <ArrowRight size={18} color="white" />, }: Props) {

    const router = useNavigate()
    function onCancel() {
        router(-1)
    }

    return <div className={cn(`flex gap-3 items-center`, className)}>
        {includeCancelBtn && <Button type='button' onClick={onCancel} variant={"outline"}
            disabled={disabled} className={cn(``,)}>
            Cancel
        </Button>}
        <LoadingBtn title={title}
            type="submit"
            loading={loading}
            disabled={disabled}
            icon={icon}
        />
    </div>
}