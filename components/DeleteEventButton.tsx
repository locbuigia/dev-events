"use client";

import { deleteEventBySlug } from "@/lib/actions/event.actions";
import { useRouter } from "next/navigation";

const DeleteEventButton = ({ slug }: { slug: string }) => {
  const router = useRouter();

  const handleDeleteEvent = async () => {
    const { success } = await deleteEventBySlug(slug);
    if (success) {
      console.log("Event deleted successfully");
      router.push("/");
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
      Delete this event
    </button>
  );
};

export default DeleteEventButton;
