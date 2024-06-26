import Link from "next/link"
import { Button } from "./ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card"
import Image from "next/image"
import { formatCurrency } from "@/lib/formatters"

type ProductCardProps = {
    id: string
    name: string
    priceInCents: number
    description: string
    imagePath: string
}


const ProductCard = ({ id, name, priceInCents, description, imagePath }: ProductCardProps) => {
    return (
        <Card className="flex overflow-hidden flex-col">
            <div className="relative w-full h-auto aspect-video">
                <Image src={imagePath} fill alt={name} className="object-cover" />
            </div>
            <CardHeader>
                <CardTitle>{name}</CardTitle>
                <CardDescription>{formatCurrency(priceInCents)}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
                <p className="line-clamp-4">{description}</p>
            </CardContent>
            <CardFooter>
                <Button asChild size='lg' className="w-full">
                    <Link href={`/products/${id}/purchase`}>Purchase</Link>
                </Button>
            </CardFooter>
        </Card>
    )
}

export const ProductCardSkeleton = () => {
    return (
        <Card className="flex overflow-hidden flex-col animate-pulse">
            <div className="relative w-full bg-gray-300 aspect-video">
            </div>
            <CardHeader>
                <CardTitle>
                    <div className="w-3/4 h-6 rounded-full bg-gray-300"></div>
                </CardTitle>
                <CardDescription>
                    <div className="w-1/2 h-4 rounded-full bg-gray-300"></div>
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
                <div className="w-full h-4 rounded-full bg-gray-300"></div>
                <div className="w-full h-4 rounded-full bg-gray-300"></div>
                <div className="w-full h-4 rounded-full bg-gray-300"></div>
            </CardContent>
            <CardFooter>
                <Button disabled className="w-full" size='lg'>
                </Button>
            </CardFooter>
        </Card>
    )
}

export default ProductCard