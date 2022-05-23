const Pusher = require("pusher");

const pusher = new Pusher({
  appId: process.env.NODE_APP_PUSHER_APP_ID,
  key:  process.env.NODE_APP_PUSHER_APP_KEY,
  secret: process.env.NODE_APP_PUSHER_APP_SECRET,
  cluster: process.env.NODE_APP_PUSHER_APP_CLUSTER,
  useTLS: true,
});
const sendNoti = (object, channel = "mtask", event = "notification") => {
  return pusher.trigger(channel, event, {
    ...object,
  });
};
module.exports = { sendNoti };
