"use server";

import { Booking } from "@/database";
import connectDB from "../mongodb";

export const createBooking = async ({
  eventId,
  slug,
  email,
}: {
  eventId: string;
  slug: String;
  email: string;
}) => {
  try {
    await connectDB();

    await Booking.create({ eventId, slug, email });
    return { success: true };
  } catch (error) {
    console.error("Create book failed", error);
    return { success: false };
  }
};
