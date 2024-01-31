import { SetStateAction } from "react";

export interface Product {
    id: string;
    name: string;
    images: string[];
    description: string;
}
  
export interface ProductContextType {
  products: Product[];
  setProducts: React.Dispatch<SetStateAction<Product[]>>;
}



  