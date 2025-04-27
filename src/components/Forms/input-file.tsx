import { cn, loadImgUrlFromBe } from "@/utils/helper/style-merger";
import { FilePlusIcon, X } from "lucide-react";
import { Dispatch, forwardRef, SetStateAction, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import ImageDeleteConfirmationDialog from "../dialog/image-delete-confirmation-dialog";
import { Button } from "../ui/button";
import { Dialog, DialogTrigger } from "../ui/dialog";
import { Label } from "../ui/label";

type TInputProps = {
    type?: string;
    placeholder?: string;
    className?: string;
    label?: string;
    error?: boolean;
    changeFileFn: Dispatch<SetStateAction<File | undefined>>
    file?: File | string
    disabled?: boolean;
    // [key: string]: any;
};

const InputFile = forwardRef<HTMLInputElement, TInputProps>(({
    type = "text",
    placeholder = "Drag & drop file here, or click to select file",
    className,
    label,
    changeFileFn,
    file,
    error = false,
    disabled = false,
    ...props
}: TInputProps, ref) => {

    const [filePreview, setFilePreview] = useState<string>(``);
    const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
        accept: {
            'image/jpeg': [],
            'image/jpg': [],
            'image/png': []
        },
    });

    const removeAll = () => {
        changeFileFn(undefined)
        setFilePreview(``)
    }

    useEffect(() => {
        changeFileFn(acceptedFiles[0])
        if (acceptedFiles[0]) {
            setFilePreview(URL.createObjectURL(acceptedFiles[0]))
        }
        return () => URL.revokeObjectURL(filePreview);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [acceptedFiles])

    useEffect(() => {
        if (typeof file === `string`) {
            setFilePreview(loadImgUrlFromBe(file))
        } else if (!file) {
            removeAll()
        }
    }, [file])


    return <div>
        <Dialog>
            {label && <Label className="">{label && label}</Label>}

            <section className={cn(`mt-1 border border-input p-5 border-dashed rounded-md cursor-pointer`,
                error && `border-red-400`)}>
                <div {...getRootProps({ className: 'dropzone' })}>
                    <input {...getInputProps()} />

                    <div className="flex flex-col gap-2 items-center max-w-48">
                        {filePreview ? <div className="h-32 w-32 relative border border-input rounded-md overflow-hidden">
                            <img
                                src={filePreview}
                                alt="Image"
                                className="w-full h-full" />
                        </div>
                            : <FilePlusIcon />}
                        {/* <p className="text-center text-xs">{
                        file ? typeof file === `string` ? file
                            : file.name : placeholder}</p> */}
                        {!file && <p className="text-center text-xs">{placeholder}</p>}
                        {!file && <em className="text-center text-xs">(*.jpg, *.jpeg and *.png only)</em>}
                    </div>
                </div>
                <div className="mt-3 w-full flex justify-center ">
                    {filePreview && <DialogTrigger asChild>
                        <Button className="items-center gap-2 text-xs" variant="outline" disabled={disabled}>
                            Remove <X size={16} color="red" />
                        </Button>
                    </DialogTrigger>}
                </div>
            </section>

            <ImageDeleteConfirmationDialog onConfirmFn={removeAll} />
        </Dialog>
    </div>
})

InputFile.displayName = 'InputFile';
export default InputFile;
