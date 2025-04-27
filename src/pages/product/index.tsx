import ContentLayout from '@/components/Layout/content-layout';
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Link } from 'react-router-dom';
import useVM from './_useVM';


export default function index() {
    const model = useVM()
    const topRight = <Link to={`create`}>
        <Button className='items-center text-sm' variant="outline">
            <Plus className="w-4 h-4 mr-1" /> Create Product
        </Button>
    </Link>

    return <ContentLayout
        topRight={topRight}
        // loading={model.isDelPending || model.isFetching || model.isLoading}
        // fetching={model.isDelPending || model.isFetching || model.isLoading}
        title='Product Category List' subtitle="Dynamic Form & List for Product Category">

        <h1>Product List</h1>

    </ContentLayout>
}