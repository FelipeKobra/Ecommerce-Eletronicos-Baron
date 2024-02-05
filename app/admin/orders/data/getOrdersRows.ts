import moment from "moment";

import formatPrice from "@/utils/Formaters/formatPrice";
import { OrdersQueryResult } from "@/utils/interfaces/getPrismaItems/getOrders";

export default function getOrdersRows(orders:OrdersQueryResult){
let rows: any = [];

for (const order of orders!) {
  rows.push({
    id: `${order.id}-${order.userId}`,
    order_id: order.id,
    client: order.user.name,
    paymentStatus: order.status,
    amount: formatPrice(order.amount),
    date: moment(order.createDate).fromNow(),
    deliveryStatus: order.deliveryStatus,
  });
}

return rows
}