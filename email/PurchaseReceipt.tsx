import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Tailwind,
} from "@react-email/components";
import OrderInformation from "./_components/OrderInformation";

type PurchaseReceiptEmailProps = {
  product: {
    name: string
    imagePath: string
    description: string
  };
  order: {
    id: string
    createdAt: Date
    pricePaidInCents: number
  },
  downloadVerificationId: string
};



const PurchaseReceiptEmail = ({ product, order, downloadVerificationId }: PurchaseReceiptEmailProps) => {
  return (
    <Html>
      <Preview>Download {product.name} and view receipt</Preview>
      <Tailwind>
        <Head />
        <Body className="font-sans bg-white">
          <Container className="max-w-2xl">
            <Heading>Purchase Receipt</Heading>
            <OrderInformation order={order} product={product} downloadVerificationId={downloadVerificationId} />
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};


PurchaseReceiptEmail.PreviewProps = {
  product: { name: 'product name', imagePath: '/products/4846b16e-6d4c-4417-a74f-c497c23bc0b6-Screenshot (4).png' },
  order: {
    id: crypto.randomUUID(),
    createdAt: new Date(),
    pricePaidInCents: 10000,
  },
  downloadVerificationId: crypto.randomUUID()
}

export default PurchaseReceiptEmail;
