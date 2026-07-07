import { notFound } from "next/navigation";

import { getRestaurantBySlug } from "@/data/get-restaurant-by-slug";

import RestaurantHeader from "./components/header";

interface RestaurantMenuPageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ consumption_method: string }>;
}

const isConsumptionMethodValid = (consumption_method: string) => {
  return ["DINE_IN", "TAKE_AWAY"].includes(consumption_method.toUpperCase());
};

const RestaurantMenuPage = async ({
  params,
  searchParams,
}: RestaurantMenuPageProps) => {
  const { slug } = await params;
  const { consumption_method } = await searchParams;
  if (!isConsumptionMethodValid(consumption_method)) {
    return notFound();
  }

  const restaurant = await getRestaurantBySlug(slug);
  if (!restaurant) {
    return notFound();
  }

  return (
    <div>
      <RestaurantHeader restaurant={restaurant} />
    </div>
  );
};

export default RestaurantMenuPage;
