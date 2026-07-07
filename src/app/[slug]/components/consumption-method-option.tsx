import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import { ConsumptionMehtod } from "../../../../generated/prisma/client";

interface ConsumptionMethodOption {
  imageUrl: string;
  imageAlt: string;
  buttonText: string;
  option: ConsumptionMehtod;
  slug: string;
}

const ConsumptionMethodOption = ({
  imageUrl,
  imageAlt,
  buttonText,
  option,
  slug,
}: ConsumptionMethodOption) => {
  return (
    <Card>
      <CardContent className="flex flex-col items-center gap-8 py-8">
        <div className="relative h-20 w-20">
          <Image
            src={imageUrl}
            alt={imageAlt}
            fill
            className="object-contain"
          />
        </div>
        <Button variant="secondary" className="rounded-full" asChild>
          <Link href={`/${slug}/menu?consumption_method=${option}`}>
            {buttonText}
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
};

export default ConsumptionMethodOption;
