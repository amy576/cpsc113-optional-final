# CPSC113 Optional Exam

This is my app. It allows people to post blog posts and to view them afterwards.

## How to run this
First, run

    mongod

Then, run the server with the MongoDB URL and the session ID. Enter the following:

    MONGO_URL='mongodb://localhost:27017/final' SESSION_SECRET='foo123' nodemon ./index.js

Lastly, run

    mongo
    
to start the MongoDB shell and connect to the database. (This last step is not entirely necessary, but is helpful if you want to keep track of the changes.)