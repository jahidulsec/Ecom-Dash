import PageHeader from "../_components/PageHeader";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import db from "@/db/db";
import { MoreVertical } from "lucide-react";
import { formatCurrency, formatNumber } from "@/lib/formatters";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DeleteDropDownItem } from "../products/_components/UserActions";

const getUsers = async () => {
    return await db.user.findMany({
        select: {
            id: true,
            email: true,
            orders: {
                select: {
                    pricePaidInCents: true,
                },
            },
        },
        orderBy: { createdAt: "desc" },
    });
};

const UserPage = () => {
    return (
        <>
            <PageHeader>Customers</PageHeader>
            <UsersTable />
        </>
    );
};

const UsersTable = async () => {
    const users = await getUsers();

    if (users.length === 0) {
        return <p>No users found</p>;
    }

    return (
        <>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Email</TableHead>
                        <TableHead>Orders</TableHead>
                        <TableHead>Value</TableHead>
                        <TableHead className="w-0">
                            <span className="sr-only">Actions</span>
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {users.map((user) => (
                        <TableRow key={user.id}>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>{formatNumber(user.orders.length)}</TableCell>
                            <TableCell>
                                {formatCurrency(
                                    user.orders.reduce(
                                        (sum, obj) => obj.pricePaidInCents + sum,
                                        0,
                                    ) / 100,
                                )}
                            </TableCell>
                            <TableCell className="text-center">
                                <DropdownMenu>
                                    <DropdownMenuTrigger>
                                        <MoreVertical />
                                        <span className="sr-only">Actions</span>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        <DeleteDropDownItem id={user.id} />
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </>
    );
};

export default UserPage;
