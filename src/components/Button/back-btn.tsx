import { cn } from "@/utils/helper/style-merger"
import { ArrowLeft } from "lucide-react"
import { Button } from "../ui/button"
import { useNavigate } from "react-router-dom"

type Props = {
    className?: string
}

export default function BackBtn({ className }: Props) {
    const nav = useNavigate();

    const goBack = () => {
        nav(-1);
    }

    return <Button variant={"outline"} className={cn(`items-center gap-1.5`, className)} onClick={goBack}>
        <ArrowLeft size={16} />
        Back
    </Button>
}