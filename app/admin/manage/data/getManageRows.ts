import formatPrice from "@/utils/Formaters/formatPrice";
import { ProductArrayType } from "@/utils/interfaces/getPrismaItems/getProducts";

export default function getManageRows(products: ProductArrayType) {
  let rows: any = [];

  for (const product of products) {
    for (const variable of product.ProductVariable) {
      rows.push({
        id: `${product.id}-${variable.id}`,
        product_id: product.id,
        variable_id: variable.id,
        name: product.name,
        category: product.category,
        brand: product.brand,
        color: variable.color,
        colorCode: variable.colorCode,
        price: formatPrice(variable.price),
        quantity: variable.stock,
        image: variable.image,
        imagePath: variable.imagePath,
        selling: product.selling,
      });
    }
  }

  return rows
}
