const { connect_mongoose } = require("./mongoose");
const { postgress } = require("./postgress");
const { SendSMS } = require("./sms");
const { sendEmail } = require("./email");
const { sendNoti } = require("./pusher");
const services = async () => {
  // connect_mongoose()
  try {
    await postgress();
  } catch (error) {
    console.log(`services errors: ${error}`);
  }
};
module.exports = { services, SendSMS, sendEmail, sendNoti };
