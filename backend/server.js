const app = require("./app");
const cloudinary = require("cloudinary");
const dotenv = require("dotenv");
dotenv.config();
const dbConnect = require("./config/database");




// Handling Uncaught Exception
process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Uncaught Exception`);
    process.exit(1);
});



//Connect DataBase
dbConnect();

cloudinary.config({
    cloud_name: process.env.cloud_name,
    api_key: process.env.api_key,
    api_secret: process.env.api_secret
})

const Port = process.env.PORT
const server = app.listen(Port, ()=>{
    console.log(`done connect server on Port${Port}`)
})



// Unhandled Promise Rejection
process.on("unhandledRejection", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Unhandled Promise Rejection`);

    server.close(() => {
        process.exit(1);
    });
});
