import CreateEventForm from "@/components/CreateEventForm";
import { Suspense } from "react";

const CreateEvent = () => {
  return (
    <main id="event">
      <Suspense fallback={<div>Loading...</div>}>
        <div className="header">
          <h1>Input your event details</h1>
        </div>
        <CreateEventForm />
      </Suspense>
    </main>
  );
};

export default CreateEvent;
