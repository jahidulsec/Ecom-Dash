import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import db from "@/db/db"
import { formatCurrency, formatNumber } from "@/lib/formatters"



const getSalesData = async () => {
  const data = await db.order.aggregate({
    _sum: { pricePaidInCents: true },
    _count: true
  })

  return {
    amount: (data._sum.pricePaidInCents || 0),
    numberOfSales: data._count
  }

}

const getUserData = async () => {
  const [userCount, orderData] = await Promise.all([
    db.user.count(),
    db.order.aggregate({
      _sum: { pricePaidInCents: true },
    })
  ])

  return {
    userCount,
    averageValuePerUser: userCount === 0 ? 0 : (orderData._sum.pricePaidInCents || 0) / userCount / 100
  }
}

const getProductData = async () => {
  const [activeCount, inactiveCount] = await Promise.all([
    db.product.count({ where: { isAvailableForPurchase: true } }),
    db.product.count({ where: { isAvailableForPurchase: false } })
  ])

  return {
    activeCount, inactiveCount
  }
}

const AdminDashboard = async () => {

  const [salesData, userData, productData] = await Promise.all([
    getSalesData(),
    getUserData(),
    getProductData()
  ])

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
      <DashboardCard
        title={`Sales`}
        subtitle={formatNumber(salesData.numberOfSales)}
        body={formatCurrency(salesData.amount / 100)} />
      <DashboardCard
        title={`Customers`}
        subtitle={`${formatNumber(userData.userCount)} Average Value`}
        body={formatCurrency(userData.averageValuePerUser)} />
      <DashboardCard
        title={`Active Products`}
        subtitle={`${formatNumber(productData.inactiveCount)} Inactive`}
        body={formatCurrency(productData.activeCount)} />
    </div>
  )
}

interface DashboardCardProps {
  title: String
  subtitle: String
  body: String
}

const DashboardCard = ({ title, subtitle, body }: DashboardCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{subtitle}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>{body}</p>
      </CardContent>
    </Card>
  )
}

export default AdminDashboard