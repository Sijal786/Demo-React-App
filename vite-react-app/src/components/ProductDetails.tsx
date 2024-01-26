import { useContext } from "react";
import { useParams } from "react-router-dom";
import { ProductContext } from "./context/ProductContext";

const ProductDetails = () => {
  const { id } = useParams();
  const { products }: any = useContext(ProductContext);
  console.log("========Product Deatails", products);
  console.log(id);
  const product = products.find((item: any) => item.id == id);
  console.log("==== This product is clicked", product);
  return <div>This is the product details page of product</div>;
};

export default ProductDetails;
