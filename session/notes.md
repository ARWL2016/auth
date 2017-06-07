### Express Sessions 

#### Observations
- Connecting the session to the Mongo Store does not seem to change the behaviour of the session. It simply persists the session in a more reliable medium 
- By default, the session is non persistent. It will expire when the browser application closes. However, it will persist across browser windows. 
- A persistent session can be created by setting the cookie maxAge property in milliseconds. If the page refreshes, the expiry time will be extended. 
- Hitting the /foo path in Postman again generates a fresh request and does not increment app visits. It generates a new session.
- In the browser, the session is persisted by returning the cookie. This happens automatically. 
- Sessions are stored in a Mongo collection called sessions. Each documents has a mongo id field, a session field, and an expiry date field. The session field contains a cookie - a stringified JSON object with the cookie attributes. 
- the id sent in the http header is not the mongo id and is not stored in Mongo. This is apparently generated dynamically. 

#### App.locals
- This persists across sessions and represents one value for the server instance. 
- It will be reset if the server restarts. 
