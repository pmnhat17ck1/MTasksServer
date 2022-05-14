const { connect_mongoose } = require("./mongoose");
const { postgress } = require('./postgress')
const services = async () => {
    // connect_mongoose()
    try {
        await postgress()
    } catch (error) {
        console.log(`services errors: ${error}`)
    }
   
}
module.exports = { services };