# REST_API_PROJECT
A project to develop a working REST API which hosts Twitter JSON data and creating a client end webpage to read the information from the API

RUN ```npm install``` to install the modules and ```npm start``` to host repository

Visit local IP ```http://127.0.0.1:8080/proj/get_first_names``` and look at the information extracted.

Visit local IP ```http://127.0.0.1:8080/proj/get_first_names``` and you can look at all the different types of info available. 

Here are the different Requests the HTML makes
Returns all tweets on database
```http://localhost:8080/API/get_all_tweets```
Returns Users on database
```http://localhost:8080/API/get_all_users```
Returns All links mentioned in tweets 
```http://localhost:8080/API/get_all_links```
Returns the specific tweet id
```'http://localhost:8080/API/get_tweet_info/(TWEET ID HERE)``` 
Returns specific Screen Name Data
```http://localhost:8080/API/get_user_info/(USER SCREENNAME HERE)```

Built this to test out REST API and was able to extract information.

Working to continue and add more information about how to extract unique pieces of information
