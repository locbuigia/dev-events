"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import DateTimePicker from "react-datetime-picker";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import { Value } from "react-datetime-picker/dist/shared/types.js";
import Select from "react-dropdown-select";

const CreateEventForm = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [description, setDescription] = useState(
    "Google's premier cloud computing event, showcasing innovations in AI, infrastructure, and enterprise solutions."
  );
  const [overview, setOverview] = useState(
    "Cloud Next 2025 highlights the latest in cloud-native development, Kubernetes, AI, and enterprise scalability. Developers, architects, and executives gather to learn about new Google Cloud services, best practices, and success stories."
  );
  const [venue, setVenue] = useState("Climate Pledge Arena");
  const [location, setLocation] = useState("Seattle, WA, USA");
  const [dateTime, setDateTime] = useState<Value>(new Date());
  const [organizer, setOrganizer] = useState(
    "Google Cloud organizes Cloud Next to connect global businesses, developers, and innovators with the latest technologies and best practices in cloud computing."
  );
  const [mode, setMode] = useState<{ id: number; name: string }[] | null>([]);
  const [tags, setTags] = useState<{ id: number; name: string }[]>([]);
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const modeOptions = [
    { id: 1, name: "Online" },
    { id: 2, name: "Offline" },
    { id: 3, name: "Hybrid" },
  ];

  const tagOptions = [
    { id: 1, name: "Cloud" },
    { id: 2, name: "AI" },
    { id: 3, name: "Frontend" },
    { id: 4, name: "Backend" },
    { id: 5, name: "DevOps" },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!image) {
      alert("Please select an image");
      return;
    }

    if (mode && mode.length === 0) {
      alert("Please select an event mode");
      return;
    }

    if (tags && tags.length === 0) {
      alert("Please select at least one event tag");
      return;
    }

    let dateOnly = null;
    let timeOnly = null;

    if (dateTime instanceof Date) {
      // Get local date as YYYY-MM-DD
      dateOnly = dateTime.toLocaleDateString("en-CA"); // en-CA format is YYYY-MM-DD

      // Get local time as HH:MM:SS
      timeOnly = dateTime.toLocaleTimeString("en-GB", {
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
      });
    }

    const tagNames = tags.reduce(
      (acc: string[], tag: { id: number; name: string }) => [...acc, tag.name],
      []
    );

    console.log(mode, tags);

    // Create JSON payload with base64 image
    const payload = {
      title: name,
      description,
      overview,
      venue,
      location,
      date: dateOnly,
      time: timeOnly,
      organizer,
      mode: mode ? mode[0].name.toLowerCase() : "",
      tags: tagNames,
      audience: "Developers, Architects, Executives",
      agenda: [
        "08:30 AM - 09:30 AM | Keynote: AI-Driven Cloud Infrastructure",
        "09:45 AM - 11:00 AM | Deep Dives: Kubernetes, Data Analytics, Security",
        "11:15 AM - 12:30 PM | Product Demos & Networking",
        "12:30 PM - 01:30 PM | Lunch",
        "01:30 PM - 03:00 PM | Workshops: Scaling with GCP",
        "03:15 PM - 04:30 PM | Fireside Chat: The Future of Enterprise Cloud",
      ],
      image: imagePreview, // Already base64
    };

    try {
      //   const response = await fetch(
      //     `${process.env.NEXT_PUBLIC_BASE_URL}/api/events`,
      //     {
      //       method: "POST",
      //       headers: {
      //         "Content-Type": "application/json",
      //       },
      //       body: JSON.stringify(payload),
      //     }
      //   );
      //   const result = await response.json();
      //   if (response.ok) {
      //     alert("Event created successfully!");
      //     // Revalidate the events cache
      //     await fetch(
      //       `${process.env.NEXT_PUBLIC_BASE_URL}/api/revalidate?tag=events`
      //     );
      //     // Redirect to home page
      //     router.push("/");
      //   } else {
      //     alert(`Error: ${result.message}`);
      //   }
    } catch (error) {
      console.error("Error creating event:", error);
      alert("Failed to create event");
    }
  };

  const handleEventModeSelect = (value: any) => {
    setMode(value);
  };

  const handleEventTagSelect = (value: any) => {
    setTags(value);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <label>Event name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your event name"
            className="bg-dark-200 rounded-[6px] px-5 py-2.5"
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <label>Event description</label>
          <textarea
            value={description}
            rows={3}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter the event description"
            className="bg-dark-200 rounded-[6px] px-5 py-2.5"
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <label>Event Overview</label>
          <textarea
            value={overview}
            rows={3}
            onChange={(e) => setOverview(e.target.value)}
            placeholder="Enter the event overview"
            className="bg-dark-200 rounded-[6px] px-5 py-2.5"
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <label>Event venue</label>
          <input
            type="text"
            value={venue}
            onChange={(e) => setVenue(e.target.value)}
            placeholder="Enter the event venue"
            className="bg-dark-200 rounded-[6px] px-5 py-2.5"
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <label>Event location</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter the event location"
            className="bg-dark-200 rounded-[6px] px-5 py-2.5"
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <label>Event Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="bg-dark-200 rounded-[6px] px-5 py-2.5"
          />
          {imagePreview && (
            <div className="mt-2">
              <img
                src={imagePreview}
                alt="Event preview"
                className="max-h-[200px] rounded-lg object-cover"
              />
            </div>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label>Select event date and time</label>
          <DateTimePicker
            className={"text-black bg-gray-50 rounded-[6px] px-5 py-2.5"}
            onChange={setDateTime}
            value={dateTime}
            disableClock={true}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label>Event Organizers</label>
          <textarea
            value={organizer}
            rows={3}
            onChange={(e) => setOrganizer(e.target.value)}
            placeholder="Enter the event overview"
            className="bg-dark-200 rounded-[6px] px-5 py-2.5"
            required
          />
        </div>
        <label>Event Mode</label>
        <Select
          className="text-black bg-gray-50 rounded-[6px] px-5 py-2.5"
          options={modeOptions}
          values={[...mode!]}
          labelField="name"
          valueField="id"
          onChange={(value) => handleEventModeSelect(value)}
        />
        <label>Event Tags</label>
        <Select
          multi
          className="text-black bg-gray-50 rounded-[6px] px-5 py-2.5"
          options={tagOptions}
          values={[...tags!]}
          dropdownPosition="auto"
          labelField="name"
          valueField="id"
          onChange={(value) => handleEventTagSelect(value)}
        />
        <button className="bg-primary hover:bg-primary/90 w-full cursor-pointer items-center justify-center rounded-[6px] px-4 py-2.5 text-lg font-semibold text-black">
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateEventForm;
