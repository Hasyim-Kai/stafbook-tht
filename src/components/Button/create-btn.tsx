import { cn } from "@/utils/helper/style-merger"
import { Plus } from "lucide-react"
import { Link } from "react-router-dom"
import { Button } from "../ui/button"

type Props = {
    className?: string
    disabled?: boolean
}

export default function CreateBtn({
    className, disabled,
}: Props) {
    return <Link to={`create`}>
        <Button className={cn(`items-center gap-1.5`, className)}
            disabled={disabled}>
            Create
            <Plus size={16} />
        </Button>
    </Link>
}