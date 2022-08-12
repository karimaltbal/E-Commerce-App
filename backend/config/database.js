const mongoose = require("mongoose");

const dbConnect = ()=>{
    const db = process.env.DATABASE;

    mongoose.connect(db, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(() => { console.log("Done Connect Database");})
    .catch((err) => { console.log(err); });
}


module.exports = dbConnect;





/*
don
4AJJVddc5c7gkWKM
*/