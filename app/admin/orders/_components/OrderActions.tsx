"use client";

import { DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { useTransition } from "react"
import { deleteProduct } from "../../_actions/products"
import { useRouter } from "next/navigation";
import { deleteOrder } from "../../_actions/orders";


export const DeleteDropDownItem = ({id}: {id:string}) => {

    const [isPending, startTransition] = useTransition()
    const router = useRouter()

    return (
        <DropdownMenuItem
            variant="destructive"
            disabled={isPending}
            onClick={() => {
                startTransition(async() => {
                    await deleteOrder(id)
                    router.refresh()
                })
            }}
        >
            Delete
        </DropdownMenuItem>
    )

}