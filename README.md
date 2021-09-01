# Create Your Own Festival Poster
*Please note, you must have a Spotify account to use this app.*

Users log into the app via their Spotify account (implicit grant authorization flow) and are able to view their personalised data relating to who their top artists are displayed as a festival poster line-up.

## Deployment
- Demo the project on Netlify: https://create-your-lineup.netlify.app

![lineup](https://user-images.githubusercontent.com/69110329/131407029-951a0797-cd34-4a33-8af6-e0919749600c.gif)

# Stack
- React App, built with CSS.
- App build with mobile-first development in mind.
- Spotify documentation link: https://developer.spotify.com/documentation/

## How The Authorization Works:
For more information: visit the Spotify guides for Auth: https://developer.spotify.com/documentation/general/guides/authorization-guide/
- This application uses Spotify's Implicit Grant Authorzation flow, which grants temporary user authorization.
-To begin, the user must log into Spotify, heading to https://accounts.spotify.com/authorize with additional parameters in the query string. 
- Paramaters I used:
     - client id
     - re-direct url
     - necessary scopes
- example: ```https://accounts.spotify.com/authorize/clientid/redirecturl/scopes``` - there are more optional params that can be includes for additional features
-This was all put inside a button ```onClick``` function to direct the user there when clicking 'log in to spotify'

-Once the user is logged in, they are directed towards my variable 're-direct url', for this project mine is set to the Poster component, and the same time, the users access token is also passed to the application *(if they logged in successfully and granted access)*

- once redirected, final URL will contain a hash fragment with the following data encoded as a query string
     - access token **necessary**
     - token type **optional, one word that can be written out yourself**
     - expires in **optiona, but not necessary**

-The access token is needed to access the users top artists during the ```GET``` request, so I created a function ```getReturnedParamsFromSpotifyAuth``` that would extract the token from the URL bu using the ```reduce``` method and putting them into an object

- Next I defined a useEffect that would run the above function on page load to get the users access token and save it in ```localStorage``` ready for later use.
- using the React hook, ```useState``` I defined:
- ```  const [token, setToken] = useState("") ``` and inside the above useEffect I had conditional logic to say, if there is an access token in local storage, do ```setToken(token-that-was-in-local-storage)```

Now that you have the users access token, you are able to do ```GET``` requests on their top artists and and have successfully achieved authorization!







