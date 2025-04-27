import { cn } from '@/utils/helper/style-merger'
import { Link } from 'react-router-dom'

type Props = {
    divClassName?: string
    textClassName?: string
    isInLandingPage?: boolean
}

export default function Logo({ isInLandingPage = false, divClassName, textClassName }: Props) {

    return <Link to={`/`}
        className={cn(`cursor-pointer`, divClassName)}>
        <h1 className={cn(`text-lg lg:text-3xl font-semibold bg-gradient-to-br from-indigo-200 via-green-500 to-blue-300 inline-block text-transparent bg-clip-text`, textClassName)}>
            Stafbook
        </h1>
    </Link>
}