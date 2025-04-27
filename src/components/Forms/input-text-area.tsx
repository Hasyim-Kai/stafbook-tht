import React, { forwardRef } from "react";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { cn } from "@/utils/helper/style-merger";

type TInputProps = {
    type?: string;
    placeholder?: string;
    className?: string;
    label?: string;
    error?: boolean;
    // errorText?: string;
    disabled?: boolean;
    icon?: React.ReactNode;
    value?: string;
    // [key: string]: any;
};

const InputTextArea = forwardRef<HTMLTextAreaElement, TInputProps>(({
    type = "text",
    placeholder = "",
    className,
    label,
    error = false,
    // errorText,
    icon,
    disabled = false,
    ...props
}: TInputProps, ref) => {

    return <div className={cn("",)}>
        {label && <Label className="" >{label}</Label>}

        <Textarea className={cn("mt-1", className)}
            placeholder={placeholder} disabled={disabled} ref={ref} {...props} />

        <div className="">
            {error && <span className="text-red-500">{"Required"}</span>}
        </div>
    </div>
})

InputTextArea.displayName = 'InputTextArea';

export default InputTextArea;
