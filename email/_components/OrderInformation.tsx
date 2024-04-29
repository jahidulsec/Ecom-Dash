import { formatCurrency } from "@/lib/formatters"
import { Button, Column, Img, Row, Section, Text } from "@react-email/components"

type OrderInformationProps = {
    order: {
        id: string
        createdAt: Date
        pricePaidInCents: number
    },
    product: {
        name: string
        imagePath: string
        description: string
    },
    downloadVerificationId: string
}

const dateFormatter = new Intl.DateTimeFormat('en', { dateStyle: 'medium' })

const OrderInformation = ({ order, product, downloadVerificationId }: OrderInformationProps) => {
    return (
        <>
            <Section>
                <Row>
                    <Column>
                        <Text className="text-gray-500 whitespace-nowrap text-nowrap mr-4">
                            Order ID
                        </Text>
                        <Text className="mt-0 mr-4">{order.id}</Text>
                    </Column>
                    <Column>
                        <Text className="text-gray-500 whitespace-nowrap text-nowrap mr-4">
                            Purchase On
                        </Text>
                        <Text className="mt-0 mr-4">{dateFormatter.format(order.createdAt)}</Text>
                    </Column>
                    <Column>
                        <Text className="text-gray-500 whitespace-nowrap text-nowrap mr-4">
                            Price Paid
                        </Text>
                        <Text className="mt-0 mr-4">{formatCurrency(order.pricePaidInCents / 100)}</Text>
                    </Column>
                </Row>
            </Section>
            <Section className="border border-solid border-gray-100 rounded-lg md:p-6 my-4">
                <Img width={`100%`} alt={product.name} src={`http://localhost:3000${product.imagePath}`} />
                <Row>
                    <Column>
                        <Text className="text-lg font-bold m-0 mr-4">{product.name}</Text>
                    </Column>
                    <Column align="right">
                        <Button
                            className="bg-black text-white px-6 py-4 rounded text-lg"
                            href={`http://localhost:3000/products/download/${downloadVerificationId}`}
                        >
                            Download
                        </Button>
                    </Column>
                    <Row>
                        <Column>
                            <Text className="text-gray-500 mb-0">{product.description}</Text>
                        </Column>
                    </Row>
                </Row>
            </Section>
        </>
    )
}

export default OrderInformation