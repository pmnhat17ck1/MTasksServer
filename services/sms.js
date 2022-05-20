const twilio = require('twilio');

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const client = require('twilio')(accountSid, authToken);


const SendSMS = async (content, phone) =>  {
    return client.messages
      .create({body: content, from: '+16504364464', to: `+84${phone.substring(1)}`})
      .then(message => console.log(message.sid));
}
module.exports = { SendSMS };