const mongoose = require("mongoose");
const connected_mongoose = () => {
    return mongoose.connect(process.env.MONGODB_URL, () => {
        console.log("CONNECTED TO MONGO DB");
    });
}

module.exports = {connected_mongoose};