"use client";

import { ChevronLeftIcon, ScrollTextIcon } from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

import { Restaurant } from "../../../../../generated/prisma/client";

interface RestaurantHeaderProps {
  restaurant: Pick<Restaurant, "coverImageUrl" | "name">;
}

const RestaurantHeader = ({ restaurant }: RestaurantHeaderProps) => {
  const { slug } = useParams<{ slug: string }>();
  const router = useRouter();

  const handleBackClick = () => {
    router.back();
  };

  const handleOrdersClick = () => router.push(`/${slug}/orders`);

  return (
    <header className="relative h-[250px] w-full">
      <Image
        fill
        src={restaurant.coverImageUrl}
        alt={restaurant.name}
        className="object-cover"
      />
      <Button
        variant="secondary"
        size="icon"
        className="absolute left-4 top-4 z-10 rounded-full"
        onClick={handleBackClick}
      >
        <ChevronLeftIcon />
      </Button>
      <Button
        variant="secondary"
        size="icon"
        className="absolute right-4 top-4 z-10 rounded-full"
        onClick={handleOrdersClick}
      >
        <ScrollTextIcon />
      </Button>
    </header>
  );
};

export default RestaurantHeader;
