import { PaymentStatus } from "@prisma/client";

import { PascalName } from "@/utils/Formaters/formatName";

export default function OrdersPaymentStatus({ params }: { params: any }) {
  return (
    <div
      className={`font-bold w-full py-1 rounded ${
        params.row.paymentStatus === PaymentStatus.Pendente
          ? "bg-rose-200 text-rose-700"
          : "bg-teal-200 text-teal-700"
      }`}
    >
      {PascalName(params.row.paymentStatus)}
    </div>
  );
}
