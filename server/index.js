


const express = require('express')
const dotenv = require('dotenv');

const port = 5000

dotenv.config()

var spotify_client_id = process.env.SPOTIFY_CLIENT_ID
var spotify_client_secret = process.env.SPOTIFY_CLIENT_SECRET

var app = express();


app.get('/auth/login', (req, res) => {
    console.log(spotify_client_id)
    console.log(spotify_client_secret)
    
});

app.get('/auth/callback', (req, res) => {
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})