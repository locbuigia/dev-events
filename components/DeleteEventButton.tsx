"use client";

import { deleteEventBySlug } from "@/lib/actions/event.actions";
import { redirect } from "next/navigation";

const DeleteEventButton = ({ slug }: { slug: string }) => {
  const handleDeleteEvent = async () => {
    const { success } = await deleteEventBySlug(slug);
    if (success) {
      console.log("Event deleted successfully");
      redirect("/");
    } else {
      console.error("Delete event failed");
    }
  };
  return (
    <button
      type="button"
      id="explore-btn"
      className="mt-7 mx-auto bg-red-400 text-black font-bold"
      onClick={handleDeleteEvent}
    >
      <a>Delete this event</a>
    </button>
  );
};

export default DeleteEventButton;
