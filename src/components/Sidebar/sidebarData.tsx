import { Boxes, DollarSign, Layers3, PackageSearch, Truck } from "lucide-react"
import { ReactNode } from "react"

type ChildSidebarDataTypes = {
    name: string
    path: string
}

type ParentSidebarDataTypes = {
    type: "nav-item" | "title"
    name: string
    path: string
    icon?: ReactNode,
    children?: ChildSidebarDataTypes[]
}

export const adminSdebarData: ParentSidebarDataTypes[] = [
    {
        type: "title",
        name: "MENU",
        path: "#",
    },
    {
        type: "nav-item",
        name: "Products",
        path: "/product",
        icon: <PackageSearch size={18} />,
    },
]

