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
4. Run `node dist/server.js` to start server at port 3000
5. Import the collection provided "Event Management Service.postman_collection.json" and try out the api

Creating this repo took about 40 minutes. I have spent another 40 trying to figure out why vercel wont serve the files I want it to.
Explored a few vercel.json settings, however the issue mainly happens to be trying to serve a REST API where vercel is expecting to serve HTML pages instead and cannot find anything at the root of the hosted files.
