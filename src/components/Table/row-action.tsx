import { Row } from '@tanstack/react-table'
import { Button } from '../ui/button'
import { FileSearch, Pencil, ShoppingCart, Trash2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import InputText from '../Forms/input-text'
import { DialogHeader, DialogFooter, DialogDescription, Dialog, DialogContent, DialogTitle, DialogTrigger, DialogClose } from '../ui/dialog'
import SubmitBtn from '../Button/submit-btn'
import LoadingBtn from '../Button/loading-btn'
import { useState } from 'react'

type Props<T> = {
  row: Row<T & { id: number | string }>
  enableDetail?: boolean
  enableEdit?: boolean
  enableDelete?: boolean
  delFn?: (id: string) => void
  delLoading?: boolean
}

export default function RowAction<T>({
  row,
  enableDetail = true,
  enableEdit = true,
  enableDelete = true,
  delFn = () => { alert('delete ' + row.original.id) },
}: Props<T>): JSX.Element {
  const onConfirmDelete = () => {
    delFn(String(row.original.id))
  }

  return <div className='flex gap-2 items-center'>
    <Dialog>

      {enableDetail && <Link to={`${row.original.id}`}>
        <Button className='w-8 h-8' size="icon" variant={'outline'}>
          <FileSearch size={14} color='blue' />
        </Button>
      </Link>}

      {enableEdit && <Link to={`edit/${row.original.id}`}>
        <Button className='w-8 h-8' size="icon" variant={'outline'}>
          <Pencil size={14} color='orange' />
        </Button>
      </Link>}

      <DialogTrigger asChild>
        {enableDelete && <Button className='w-8 h-8' size="icon" variant="destructive">
          <Trash2 size={14} />
        </Button>}
      </DialogTrigger>

      {/* <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button
        aria-label="Open menu"
        variant="ghost"
        className="flex size-8 p-0 data-[state=open]:bg-muted"
      >
        <Ellipsis size={16} aria-hidden="true" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end" className="w-40">
      <DropdownMenuItem onSelect={() => { }} className="gap-2 items-center">
        <FileSearch size={14} color='blue' />
        Detail {row.original.id}
      </DropdownMenuItem>
      <DropdownMenuItem onSelect={() => { }} className="gap-2 items-center">
        <Pencil size={14} color='orange' />
        Edit {row.original.id}
      </DropdownMenuItem>
      <DropdownMenuItem className="gap-2 items-center">
        <Trash2 size={14} color="red" />
        Delete {row.original.id}
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu> */}

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className=' dark:text-white'>Delete Product Confirmation</DialogTitle>
          <DialogDescription>
            Do you want to delete this product?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className='gap-2'>
          <DialogClose className='gap-2'>Cancel</DialogClose>
          <LoadingBtn title='Delete' type='submit'
            icon={<Trash2 size={16} color='red' />}
            onClickFn={onConfirmDelete}
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </div>
}