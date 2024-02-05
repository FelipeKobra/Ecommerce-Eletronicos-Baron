export default interface ProductRows {
  product_id: string;
  variable_id: string;
  name: string;
  category: string;
  brand: string;
  color: string;
  colorCode: string;
  price: number | string;
  quantity: number | string;
  image: string;
  imagePath: string;
  selling: boolean;
}
