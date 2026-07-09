import { ChevronLeftIcon, ChevronRightIcon, Trash2Icon } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/helpers/format-currency";

import { CartProduct, useCartContext } from "../contexts/cart";
interface CartItemProps {
  product: CartProduct;
}

const CartProductItem = ({ product }: CartItemProps) => {
  const { decreaseProductQuantity, increaseProductQuantity, deleteProduct } =
    useCartContext();

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="relative h-20 w-20 rounded-xl bg-gray-100">
          <Image src={product.imageUrl} alt={product.name} fill />
        </div>
        <div className="space-y-1">
          <p
            className="max-w-[90%] truncate text-xs"
            title={product.name}
            aria-label={product.name}
          >
            {product.name}
          </p>
          <p className="text-sm font-semibold">
            {formatCurrency(product.price)}
          </p>
          <div className="flex items-center gap-1 text-center">
            <Button
              variant="outline"
              className="h-7 w-7 rounded-xl"
              onClick={() => decreaseProductQuantity(product.id)}
            >
              <ChevronLeftIcon size={14} />
            </Button>
            <p className="w-4 text-sm">{product.quantity}</p>
            <Button
              variant="outline"
              className="h-7 w-7 rounded-xl"
              onClick={() => increaseProductQuantity(product.id)}
            >
              <ChevronRightIcon size={14} />
            </Button>
          </div>
        </div>
      </div>
      <Button
        variant="outline"
        className="h-7 w-7"
        onClick={() => deleteProduct(product.id)}
      >
        <Trash2Icon className="text-red-500" />
      </Button>
    </div>
  );
};

export default CartProductItem;
