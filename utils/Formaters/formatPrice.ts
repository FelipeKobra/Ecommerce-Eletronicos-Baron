import { Decimal } from "@prisma/client/runtime/library";

export default function formatPrice(amount: number| Decimal) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(amount as number);
}