# nl-event-service

A basic CRUD API to add, update, delete and list events.

Has a single test event by default when app starts, for testing Update and delete.
Use ID:`event_test` for fetching and updaing default event

Notes:

/UPDATE expects the _complete event object_ (with all its properties) to be sent in the request and will overwrite the existing object in store.
