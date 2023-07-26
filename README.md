# nl-event-service

APPROACH
A basic CRUD API to add, update, delete and list events.
A simple express server that exposes different REST APIs on the /events route. Specified in `routes.ts`

Has a single test event by default when app starts, for testing Update and delete.
Use ID:`event_test` for fetching and updaing default event

Notes:
/UPDATE expects the _complete event object_ (with all its properties) to be sent in the request and will overwrite the existing object in store.

TO GET STARTED

1. Clone the repository and open a new terminal
2. Install all dependencies with with `npm install`
3. Run `npx tsc` to transpile code into js.
4. Run `npm start` to start server at port 3000
5. Import the collection provided "Event Management Service.postman_collection.json" and try out the api. The collection is wired to localhost. If using the collection against the deployed test URL, replace `localhost` with `DEPLOYED_URL` provided below

DEPLOYED URL: https://nl-event-service.vercel.app/

APIS
-- GET /events -- returns a list of available events
-- GET /events/:event_id -- returns an event by ID or error
-- POST /events -- adds a new Event
-- PUT /events/:event_id -- updates an existing Event by ID
-- DELETE /events - deletes an existing Event
