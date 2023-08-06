//Imports for the API
const express = require('express');
const router = express.Router();
const archive_url = 'http://localhost:8080/archive';
var fs = require("fs");

//Creating Archive URL
const ReadArchive = async (url) => {
    const response = await fetch(url);
    const status = response.status;
    const data = await response.json();
    return data ;
};

//Get all Users using get method
router.get('/get_all_users',   async (req, res, next) => {
    //Create Data based on URL and Create Users Array
    const users = [];
    const data = await ReadArchive(archive_url);

    //Check Data if it is not NULL
    if (data != null) {
        //For loop to check through users
        for (let i = 0 ; i < data.length; i++) {
            //If Statement to check if User Mentions has any users
            if (data[i].entities.user_mentions.length != 0) {
                //Loop through the User Mentions 
                for (let j = 0; j < data[i].entities.user_mentions.length; j++) {
                    //Add Users Mentioned
                    users.push({'Screen Name' : data[i].entities.user_mentions[j].screen_name, 'User ID' : data[i].entities.user_mentions[j].id});
                }
            }
            //Add User we are checking
            //TO DO: Potentially need to check for duplicate USERS
            users.push({'Screen Name' : data[i].user.screen_name, 'User ID' : data[i].user.id});
        }
        //Send Users to Requesting URL
        return res.status(200).json({users});
    } else {
        //Error message if URL does not exists
        return res.status(401).json( {"message":"Error!"} );
    }
});

//Get all Tweets using get method
router.get('/get_all_tweets',   async (req, res, next) => {
    //Create Data based on URL and Create Tweets Array
    const tweets = [];
    const data = await ReadArchive(archive_url);

    //Check Data if it is not NULL
    if (data != null) {
        //For loop to check through tweets
        for (let i = 0 ; i < data.length; i++){
            tweets.push({'Created At' : data[i].created_at, 'Tweet ID' : data[i].id, 'Tweet Content' : data[i].text});
        }
        //Send Tweets to Requesting URL
        return res.status(200).json({tweets});
    } else {
        //Error message if URL does not exists
        return res.status(401).json( {"message":"Error!"} );
    }
});

//Get all Links mentioned in Tweets using get method
router.get('/get_all_links',   async (req, res, next) => {
    //Create Data based on URL and Create Links Array
    const links = [];
    const data = await ReadArchive(archive_url);

    //Check Data if it is not NULL
    if (data != null) {
        //For loop to check all links
        for (let i = 0 ; i < data.length; i++) {
            //If there are URL entities, check and add them to our return data
            if (data[i].entities.urls.length != 0) {
                for (let j = 0; j < data[i].entities.urls.length; j++) {
                    links.push({'URL' : data[i].entities.urls[j].url, 'Expanded URL' : data[i].entities.urls[j].expanded_url});
                }
            }
        }
        //Sending Links to Requesting URL
        return res.status(200).json({links});
    } else {
        //Error message if URL does not exists
        return res.status(401).json( {"message":"Error!"} );
    }
});

//Get all Tweets using get method
router.get("/get_tweet_info/:tweet_id",   async (req, res, next) => {
    //Create Data based on URL and Create Tweets Array
    //Tweet ID is the specific tweet we are looking for
    const tweet = [];
    const tweet_id = req.params.tweet_id;
    const data = await ReadArchive(archive_url);

    //Check Data if it is not NULL
    if (data != null) {
        //For loop to check all tweets
        for (let i = 0 ; i < data.length; i++){  
            //Check if tweet ID is in tweet library
            if (data[i].id == tweet_id) {
                tweet.push({'Created At' : data[i].created_at, 'Tweet ID' : data[i].id, 'Tweet Content' : data[i].text, 'Screen Name' : data[i].user.screen_name, 'User ID' : data[i].user.id});
            }
        }
        //Send Tweet Info to Requesting URL
        return res.status(200).json({tweet});
    } else {
        //Error message if URL does not exists
        return res.status(401).json( {"message":"Error!"} );
    }
});

//Get all User Info using get method
router.get("/get_user_info/:user_id",   async (req, res, next) => {
    //Create Data based on URL and Create user Array
    //user ID is the specific user we are looking for
    const user = [];
    const user_id = req.params.user_id;
    const data = await ReadArchive(archive_url);

    //Check Data if it is not NULL
    if (data != null) {
        //For loop to check all users
        for (let i = 0 ; i < data.length; i++){  
            //Check if user ID is in user library
            if (data[i].user.screen_name == user_id) {
                user.push({'Screen Name' : data[i].user.screen_name, 'User ID' : data[i].user.id, 'Location' : data[i].user.location, 'Follower Count' : data[i].user.followers_count, 'Friend Count' : data[i].user.friends_count});
            }
            //If Statement to check if User Mentions has any users
            if (data[i].entities.user_mentions.length != 0) {
                //Loop through the User Mentions 
                for (let j = 0; j < data[i].entities.user_mentions.length; j++) {
                    //Add Users Mentioned
                    if (data[i].entities.user_mentions[j].screen_name == user_id) {
                        user.push({'Screen Name' : data[i].entities.user_mentions[j].screen_name, 'User ID' : data[i].entities.user_mentions[j].id, 'Location' : 'Unknown', 'Follower Count' : 'Unknown', 'Friend Count' : 'Unknown'});
                    }
                }
            }
        }
        //Send user Info to Requesting URL
        return res.status(200).json({user});
    } else {
        //Error message if URL does not exists
        return res.status(401).json( {"message":"Error!"} );
    }
});

module.exports = router;