"use server";

import { Event } from "@/database";
import connectDB from "../mongodb";
import { revalidateTag } from "next/cache";

export const getSimilarEventBySlug = async (slug: string) => {
  try {
    await connectDB();
    const event = await Event.findOne({ slug });

    return await Event.find({
      _id: { $ne: event?._id },
      tags: { $in: event.tags },
    }).lean();
  } catch {
    return [];
  }
};

export const deleteEventBySlug = async (slug: string) => {
  try {
    await connectDB();

    await Event.deleteOne({ slug });

    revalidateTag("events", "max");
    return { success: true };
  } catch (error) {
    console.error("Delete event failed", error);
    return { success: false };
  }
};
