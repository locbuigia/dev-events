export type EventItem = {
  title: string;
  image: string;
  slug: string;
  location: string;
  date: string;
  time: string;
};

export const events: EventItem[] = [
  {
    title: "React Conference 2024",
    image: "/images/event1.png",
    slug: "react-conference-2024",
    location: "San Francisco, CA, USA",
    date: "2024-06-15",
    time: "09:00 AM",
  },
  {
    title: "Next.js Workshop",
    image: "/images/event2.png",
    slug: "nextjs-workshop",
    location: "New York, NY, USA",
    date: "2024-07-20",
    time: "02:00 PM",
  },
  {
    title: "Web Development Summit",
    image: "/images/event3.png",
    slug: "web-dev-summit",
    location: "Austin, TX, USA",
    date: "2024-08-10",
    time: "10:00 AM",
  },
  {
    title: "TypeScript Masterclass",
    image: "/images/event4.png",
    slug: "typescript-masterclass",
    location: "Seattle, WA, USA",
    date: "2024-09-15",
    time: "01:00 PM",
  },
  {
    title: "Vue.js Intensive",
    image: "/images/event5.png",
    slug: "vuejs-intensive",
    location: "Denver, CO, USA",
    date: "2024-10-05",
    time: "11:00 AM",
  },
  {
    title: "GraphQL Deep Dive",
    image: "/images/event6.png",
    slug: "graphql-deep-dive",
    location: "Boston, MA, USA",
    date: "2024-10-22",
    time: "03:30 PM",
  },
];
