# BeautySQL - Eoin Ocathasaigh

BeautySQL is a desktop-style database management app built with Electron and Express. It provides a simple UI for connecting to a MySQL database, browsing member and campaign data, and updating records through web forms and server-side routes. The app is designed to work with both local MySQL databases and remotely hosted databases such as AWS, depending on the hostname and credentials entered at login.

## What the app does

BeautySQL loads an Express server inside an Electron window, then renders EJS views for the main application screens. After logging in, users can:

- connect to a MySQL database
- view and edit member details
- review campaign and audience information
- filter records and update related data through form submissions

## Technologies used

- Electron for the desktop shell
- Express for routing and server logic
- EJS for server-rendered views
- body-parser for form submission handling
- express-validator for request validation support
- promise-mysql for promise-based MySQL connection pooling
- mysql2 as an installed MySQL driver dependency

## Database connection

The login screen asks for a hostname, username, password, and database name. Those values are passed into the DAO layer, which creates a MySQL connection pool and uses it for all later queries. That means the same app can connect to a local MySQL server or a remote AWS-hosted MySQL instance, as long as the database is reachable from the machine running the app.
