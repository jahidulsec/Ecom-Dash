'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { formatCurrency } from "@/lib/formatters";
import { Label } from "@radix-ui/react-label";
import { useState } from "react";
import { addProduct } from "../../_actions/products";
import { useFormState, useFormStatus } from "react-dom";

const ProductForm = () => {

    const [error, action] = useFormState(addProduct, {})
    const [priceInCents, setPriceInCents] = useState<number>(0)

    return (
        <form action={action} className="space-y-8">
            <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input type="text" id="name" name="name" required />
                {
                    error.name &&
                    <div className="text-destructive">{error.name}</div>
                }
            </div>
            <div className="space-y-2">
                <Label htmlFor="priceInCents">Price In Cents</Label>
                <Input
                    type="number"
                    id="priceInCents"
                    name="priceInCents"
                    value={priceInCents}
                    onChange={(e) => { setPriceInCents(Number(e.target.value)) }}
                    required />
                {
                    error.priceInCents &&
                    <div className="text-destructive">{error.priceInCents}</div>
                }
            </div>
            <div className="text-muted-foreground">
                {formatCurrency((priceInCents || 0) / 100)}
            </div>
            <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" name="description" required />
                {
                    error.description &&
                    <div className="text-destructive">{error.description}</div>
                }
            </div>
            <div className="space-y-2">
                <Label htmlFor="file">File</Label>
                <Input type="file" id="file" name="file" required />
                {
                    error.file &&
                    <div className="text-destructive">{error.file}</div>
                }
            </div>
            <div className="space-y-2">
                <Label htmlFor="image">Image</Label>
                <Input type="file" id="image" name="image" required />
                {
                    error.image &&
                    <div className="text-destructive">{error.image}</div>
                }
            </div>
            <SubmitButton />
        </form>
    )
}


const SubmitButton = () => {
    const { pending } = useFormStatus()
    return <Button type="submit" disabled={pending}>{pending ? `Saving...` : `Save`}</Button>
}


export default ProductForm