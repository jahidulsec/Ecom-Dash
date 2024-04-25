import Nav, { NavLink } from "@/components/Nav"

const AdminLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
    return (
        <>
            <Nav>
                <NavLink href={`/admin`}>Dashboard</NavLink>
                <NavLink href={`/admin/product`}>Dashboard</NavLink>
            </Nav>
            <div className="container my-6">
                {children}
            </div>
        </>
    )
}

export default AdminLayout