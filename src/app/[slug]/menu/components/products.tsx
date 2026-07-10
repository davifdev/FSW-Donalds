import Image from "next/image";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";

import { formatCurrency } from "@/helpers/format-currency";

import { Product } from "../../../../../generated/prisma/client";
interface ProductsProps {
  products: Product[];
}

const Products = ({ products }: ProductsProps) => {
  const { slug } = useParams<{ slug: string }>();
  const searchParams = useSearchParams();
  const consumptionMethod = searchParams.get("consumption_method");

  return (
    <div className="space-y-3">
      {products.map((product) => (
        <Link
          href={`/${slug}/menu/${product.id}?consumption_method=${consumptionMethod}`}
          className="flex items-center justify-between gap-10 border-b py-3"
          key={product.id}
        >
          <div>
            <h3 className="text-sm font-medium">{product.name}</h3>
            <p className="line-clamp-2 text-sm text-muted-foreground">
              {product.description}
            </p>
            <p className="pt-3 text-sm font-semibold">
              {formatCurrency(product.price)}
            </p>
          </div>
          <div className="relative min-h-[82px] min-w-[120px]">
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              className="rounded-lg object-contain"
            />
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Products;
