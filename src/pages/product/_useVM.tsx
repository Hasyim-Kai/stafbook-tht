import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export default function useVM() {
    const queryClient = useQueryClient()
    const router = useNavigate()


    // GET ALL ================================================================================




    return {
        // isPending, onSubmit,
        // signinErr: (signinErr as any)?.response?.data?.message,

    }
}