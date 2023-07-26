"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
let events = [
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
router.post("/events", (req, res) => {
    console.log("Running add Events");
    const newEvent = Object.assign(Object.assign({}, req.body), { id: generateEventId(), createdAt: new Date(), updatedAt: new Date() });
    events.push(newEvent);
    res.status(200).json(newEvent);
});
// Update an event
router.put("/events/:id", (req, res) => {
    console.log("Running update Events by id");
    const eventId = req.params.id;
    const updatedEvent = req.body;
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
router.delete("/events/:id", (req, res) => {
    console.log("Running get Events by id");
    const eventId = req.params.id;
    events = events.filter((event) => event.id !== eventId);
    res.json({ message: "Event deleted successfully" });
});
//Fetch even by ID
router.get("/events/:id", (req, res) => {
    const eventId = req.params.id;
    const event = events.find((event) => event.id === eventId);
    if (!event) {
        return res.status(404).json({ error: "Event not found" });
    }
    res.json(event);
});
// List all events with optional filters
router.get("/events", (req, res) => {
    console.log("Running get Events");
    const { eventName, organizer, city, state } = req.query;
    // console.log("Event obj is: " + JSON.stringify(events));
    let filteredEvents = events;
    if (eventName) {
        filteredEvents = filteredEvents.filter((event) => event.eventName.includes(eventName));
    }
    if (organizer) {
        filteredEvents = filteredEvents.filter((event) => event.organizer.includes(organizer));
    }
    if (city) {
        filteredEvents = filteredEvents.filter((event) => { var _a, _b; return (_b = (_a = event.location) === null || _a === void 0 ? void 0 : _a.city) === null || _b === void 0 ? void 0 : _b.includes(city); });
    }
    if (state) {
        filteredEvents = filteredEvents.filter((event) => { var _a, _b; return (_b = (_a = event.location) === null || _a === void 0 ? void 0 : _a.state) === null || _b === void 0 ? void 0 : _b.includes(state); });
    }
    res.json(filteredEvents);
});
// Generate a unique event ID
function generateEventId() {
    return `event_${Date.now().toString()}`;
}
exports.default = router;
