import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-dropdown-menu";
import { useFormStatus } from "react-dom";
import { emailOrderHistory } from "../_actions/orders";
import { useFormState } from "react-dom";

const MyOrdersPage = () => {

    const [data, action] = useFormState(emailOrderHistory, {})

    return (
        <form action={action} className="max-2-xl mx-auto">
            <Card>
                <CardHeader>
                    <CardTitle>My Orders</CardTitle>
                    <CardDescription>
                        Enter your email and we will email you your order history and
                        download links
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-2">
                        <Label>Email</Label>
                        <Input type="email" name="email" id="email" required />
                        {
                            data.error &&
                            <div className="ted text-destructive">{data.error}</div>
                        }
                    </div>
                </CardContent>
                <CardFooter>
                    {
                        data.message ? (
                            <p>{data.message}</p>
                        ) : (
                            <SubmitButton />
                        )
                    }
                </CardFooter>
            </Card>
        </form>
    );
};

const SubmitButton = () => {
    const { pending } = useFormStatus();

    return (
        <Button className="w-full" size={`lg`} disabled={pending}>
            {pending ? `Submitting...` : `Submit`}
        </Button>
    );
};

export default MyOrdersPage;
