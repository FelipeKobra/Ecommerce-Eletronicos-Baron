import formatPrice from "@/utils/Formaters/formatPrice";
import GMTtoBrazil from "@/utils/Formaters/GMTtoBrazil";
import { OrdersByUserIdType } from "@/utils/interfaces/getPrismaItems/getOrdersByUserId";

export default function getPedidosRows(orders: OrdersByUserIdType) {
  let rows: any = [];

  for (const order of orders!) {
    rows.push({
      id: `${order.id}-${order.userId}`,
      order_id: order.id,
      client: order.user.name,
      paymentStatus: order.status,
      amount: formatPrice(order.amount),
      date: GMTtoBrazil(order.createDate),
      deliveryStatus: order.deliveryStatus,
    });
  }

  return rows
}
