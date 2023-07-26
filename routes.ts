import express, { Request, Response } from "express";
import { Event } from "./types";

const router = express.Router();

let events: Event[] = [
  {
    eventName: "My Event",
    eventDate: "2023-12-31",
    organizer: "John Doe",
    email: "john",
    id: "event_test",
    location: {},
    createdAt: new Date("2023-07-26T13:31:09.036Z"),
    updatedAt: new Date("2023-07-26T13:31:09.036Z"),
  },
];
// Add new event
router.post("/events", (req: Request, res: Response) => {
  console.log("Running add Events");

  const newEvent: Event = {
    ...req.body,
    id: generateEventId(),
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  events.push(newEvent);
  res.status(200).json(newEvent);
});

// Update an event
router.put("/events/:id", (req: Request, res: Response) => {
  console.log("Running update Events by id");

  const eventId: string = req.params.id;
  const updatedEvent: Event = req.body;
  const eventIndex = events.findIndex((event) => event.id === eventId);

  if (eventIndex === -1) {
    return res.status(404).json({ error: "Event not found" });
  }

  updatedEvent.id = events[eventIndex].id;
  updatedEvent.createdAt = events[eventIndex].createdAt;
  updatedEvent.updatedAt = new Date();
  events[eventIndex] = updatedEvent;
  res.json(updatedEvent);
});

// Delete an event
router.delete("/events/:id", (req: Request, res: Response) => {
  console.log("Running get Events by id");
  const eventId: string = req.params.id;
  events = events.filter((event) => event.id !== eventId);
  res.json({ message: "Event deleted successfully" });
});

//Fetch even by ID
router.get("/events/:id", (req: Request, res: Response) => {
  const eventId: string = req.params.id;
  const event = events.find((event) => event.id === eventId);

  if (!event) {
    return res.status(404).json({ error: "Event not found" });
  }

  res.json(event);
});

// List all events with optional filters
router.get("/events", (req: Request, res: Response) => {
  console.log("Running get Events");
  const { eventName, organizer, city, state } = req.query;
  // console.log("Event obj is: " + JSON.stringify(events));

  let filteredEvents = events;

  if (eventName) {
    filteredEvents = filteredEvents.filter((event) =>
      event.eventName.includes(eventName as string)
    );
  }

  if (organizer) {
    filteredEvents = filteredEvents.filter((event) =>
      event.organizer.includes(organizer as string)
    );
  }

  if (city) {
    filteredEvents = filteredEvents.filter((event) =>
      event.location?.city?.includes(city as string)
    );
  }

  if (state) {
    filteredEvents = filteredEvents.filter((event) =>
      event.location?.state?.includes(state as string)
    );
  }

  res.json(filteredEvents);
});

// Generate a unique event ID
function generateEventId(): string {
  return `event_${Date.now().toString()}`;
}

export default router;
