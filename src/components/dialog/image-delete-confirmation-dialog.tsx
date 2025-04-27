import { Trash2 } from "lucide-react"
import { Button } from "../ui/button"
import { DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog"

type Props = {
    onConfirmFn: () => void
}

export default function ImageDeleteConfirmationDialog({ onConfirmFn }: Props) {
    return <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
            <DialogTitle className=' dark:text-white'>Delete Image Confirmation</DialogTitle>
            <DialogDescription>
                Apakah Anda Yakin untuk Menghapus Gambar?
            </DialogDescription>
        </DialogHeader>
        <DialogFooter className='mt-3 gap-2 items-center'>
            <DialogClose className=''>
                <Button type='button' className='bg-[#808080] hover:bg-[#808080] dark:text-white'>
                    Batalkan
                </Button>
            </DialogClose>
            <DialogClose className=''>
                <Button type='button' onClick={onConfirmFn}
                    className='bg-[#D22B2B] hover:bg-[#D22B2B] dark:text-white'>
                    <Trash2 className="mr-2" size={14} /> Hapus
                </Button>
            </DialogClose>
        </DialogFooter>
    </DialogContent>
}