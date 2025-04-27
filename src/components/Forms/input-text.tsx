import React, { forwardRef, InputHTMLAttributes } from "react";
import { Label } from "../ui/label";
import { cn } from "@/utils/helper/style-merger";
import { Input } from "../ui/input";

type TInputProps = {
    type?: string;
    placeholder?: string;
    className?: string;
    label?: string;
    error?: boolean;
    step?: number;
    // errorText?: string;
    disabled?: boolean;
    icon?: React.ReactNode;
    value?: string;
    // [key: string]: any;
};

const InputText = forwardRef<HTMLInputElement, TInputProps>(({
    type = "text",
    placeholder = "",
    className,
    label,
    step = 1,
    error = false,
    // errorText,
    icon,
    disabled = false,
    ...props
}: TInputProps, ref) => {

    return <div className={cn("flex flex-col",)}>
        {label && <Label className="" >{label}</Label>}

        <div className="relative mt-2">
            {icon && <div className="absolute top-1/2 -translate-y-1/2 left-3">
                {icon}
            </div>}
            <Input type={type} step={step} placeholder={placeholder}
                disabled={disabled} ref={ref} {...props}
                className={cn(``, icon ? 'pl-10' : '', className)} />
        </div>

        <div className="">
            {error && <span className="text-sm text-red-500 mt-2">{"Required"}</span>}
        </div>
    </div>
})

InputText.displayName = 'InputText';

export default InputText;
