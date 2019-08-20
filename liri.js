//add code to read and set any environment variables with dotenv package
require("dotenv").config();
//get spotify stuff
var Spotify = require('node-spotify-api');

//access keys information
var spotify = new Spotify({

   id : "640bb851ad294a4ba753ad4f4ec2116b", // Your client id
   secret : "734bb1045a1d47169e59313ad1fd6fcf" // Your secret
    
    });
// Includes the FS package for reading and writing packages
var fs = require("fs");

// Include the axios npm package 
var axios = require("axios");



//spotify-this-song function to use it for later
var spotifyThisSong =function (input) {
    // makes default value of song "the sign"
   var song="The Sign";

   //if user enters an argument it replaces sign with that object
   var songString = input;

   //make sure query can handle entire string
   if(songString.length>1) {

   song="";

   for (var i = 3; i < songString.length; i++) {

       if (i > 3 && i < songString.length) {
       song = song + "+" + songString[i];
       } else {
       song += songString[i];
   
       }
   }
   }

   spotify.search({ type: 'track', query: song, limit: 1 }, function(err, data) {
       if (err) {
       return console.log('Error occurred: ' + err);
       }   
   console.log("Song Title: "+ data.tracks.items[0].name)
   console.log("Artist: " + JSON.stringify(data.tracks.items[0].artists[0].name));
   console.log("Preview Link: " + JSON.stringify(data.tracks.items[0].preview_url));
   console.log("Album: " + JSON.stringify(data.tracks.items[0].album.name));
   });

}


var concertThis =function (input) {
// makes default value of song "Yuna"
var artist="Yuna";

//if user enters an argument it replaces sign with that object
var artistString = input;

//make sure query can handle entire string
if(artistString.length>3) {

artist="";

for (var i = 3; i < artistString.length; i++) {

    if (i > 3 && i < artistString.length) {
    artist = artist + "+" + artistString[i];
    } else {
    artist += artistString[i];

    }
}
}

axios.get( "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp").then(
    function(response) {
    
      console.log("Info about upcoming "+ artist+ " event: ");
      console.log("Venue Name: " + JSON.stringify(response.data[1].venue.name));
      console.log("Venue Location: " + JSON.stringify(response.data[1].venue.city));
      console.log("Event Date: " + JSON.stringify(response.data[1].datetime));
    })
    .catch(function(error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log("---------------Data---------------");
        console.log(error.response.data);
        console.log("---------------Status---------------");
        console.log(error.response.status);
        console.log("---------------Status---------------");
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an object that comes back with details pertaining to the error that occurred.
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
      }
      console.log(error.config);
    });

}



var movieThis =function (input) {
// Store all of the arguments in an array
var nodeArgs = input;

// Create an empty variable for holding the movie name
var movieName = "Mr.Nobody";

// Loop through all the words in the node argument
// And do a little for-loop magic to handle the inclusion of "+"s
if(nodeArgs.length>3) {

movieName=" ";
for (var i = 3; i < nodeArgs.length; i++) {

if (i > 3 && i < nodeArgs.length) {
    movieName = movieName + "+" + nodeArgs[i];
} else {
    movieName += nodeArgs[i];

}
}
 }   

// Then run a request with axios to the OMDB API with the movie specified
var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

// This line is just to help us debug against the actual URL.
console.log(queryUrl);

axios.get(queryUrl).then(
function(response) {
    console.log("Movie Title: " + JSON.stringify(response.data.Title));
    console.log("Year: " + JSON.stringify(response.data.Year));
    console.log("IMBD Rating: " + JSON.stringify(response.data.imdbRating));
    console.log("Rotten Tomatoes Rating: " + JSON.stringify(response.Metascore));
    console.log("Country: " + JSON.stringify(response.data.Country));
    console.log("Language: " + JSON.stringify(response.data.Language));
    console.log("Actors: " + JSON.stringify(response.data.Actors));
})
.catch(function(error) {
    if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    console.log("---------------Data---------------");
    console.log(error.response.data);
    console.log("---------------Status---------------");
    console.log(error.response.status);
    console.log("---------------Status---------------");
    console.log(error.response.headers);
    } else if (error.request) {
    // The request was made but no response was received
    // `error.request` is an object that comes back with details pertaining to the error that occurred.
    console.log(error.request);
    } else {
    // Something happened in setting up the request that triggered an Error
    console.log("Error", error.message);
    }
    console.log(error.config);
});



}

//capture command to put in the switch statement
var action= process.argv[2];

switch(action) {

   case "concert-this":

        concertThis(process.argv);    

        break; 

    case "spotify-this-song":

        spotifyThisSong(process.argv);

            break;

    case "movie-this":
        
         movieThis(process.argv);

            break;

    case "do-what-it-says":
    
    // Running the readFile module that's inside of fs.
    // Stores the read information into the variable "data"
    fs.readFile("random.txt", "utf8", function(err, data) {
        if (err) {
        return console.log(err);
        }
    
        // Break the string down by comma separation and store the contents into the output array.
        var randomText = data.split(",");
    
        // Loop Through the newly created output array
        for (var i = 0; i < randomText.length; i++) {
    
        // Print each element (item) of the array/
        console.log(randomText[i]);

        if (randomText[i]==="spotify-this-song") {
            spotifyThisSong(randomText[i]);
    
            }
    
            else if (process.argv[2]==="movie-this") {
    
                movieThis(randomText[i]);
    
            }
    
            else if(process.argv[2]==="concert-this") {
    
                concertThis(randomText[i]);
            }
    
            else {
    
                console.log("Try entering that again properly.")
    
            }

        
    }

    
  });


    break;

}