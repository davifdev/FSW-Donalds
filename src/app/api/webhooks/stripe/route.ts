import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import Stripe from "stripe";

import { db } from "@/lib/prisma";

import { OrderStatus } from "../../../../../generated/prisma/enums";

export async function POST(request: Request) {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error("Missing Stripe secret key");
  }

  if (!process.env.STRIPE_WEBHOOK_SECRET_KEY) {
    throw new Error("Missing Stripe Webhook secret");
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2025-02-24.acacia",
  });

  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.error();
  }

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET_KEY;
  const text = await request.text();
  const event = stripe.webhooks.constructEvent(text, signature, webhookSecret);

  switch (event.type) {
    case "checkout.session.completed": {
      const orderId = event.data.object.metadata?.orderId;
      if (!orderId) {
        return NextResponse.json({
          receveid: true,
        });
      }
      const order = await db.order.update({
        where: {
          id: Number(orderId),
        },
        data: {
          status: OrderStatus.PAYMENT_CONFIRMED,
        },
        include: {
          restaurant: {
            select: {
              slug: true,
            },
          },
        },
      });
      revalidatePath(`/${order.restaurant.slug}/orders`);
      break;
    }

    case "charge.failed": {
      const orderId = event.data.object.metadata?.orderId;
      if (!orderId) {
        return NextResponse.json({
          receveid: true,
        });
      }
      const order = await db.order.update({
        where: {
          id: Number(orderId),
        },
        data: {
          status: OrderStatus.PAYMENT_FAILED,
        },
        include: {
          restaurant: {
            select: {
              slug: true,
            },
          },
        },
      });
      revalidatePath(`/${order.restaurant.slug}/orders`);
      break;
    }
  }

  return NextResponse.json({ receveid: true });
}
