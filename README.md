##Instructions
  1. Run npm install from the command line
  2. Run 'grunt server-dev' from the command line
  3. Go to localhost:8080
  4. Login with Instagram
  5. Voila!

## Explaination
  This app is built with React/Flux on the frontend, using Passport for OAuth.The backend is node.js/express with MongoDB.

  I chose to use React because I knew I'd be resuing a photo container component several times. By using flux architecture, I was able to save the API results in a store on the client side, making re-rendering between views/components very quick.

  I used Passport because Instagram restricts its API — without an access token from a registered user, I wouldn't have been able to query the API at all.

  By saving the user credientials in a database, I was able to persist the album from session to session.

##If I had more time, I would've:
  --implimented logout
  --enabled search by geolocation (using Google's Geocoding API)
  --clicking a photo twice adds then removes that photo from the album
  --enabled the ability to add/save different albums
  --error handling for incorrect search input
  --general styling
