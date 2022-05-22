const Pusher = require("pusher");

const pusher = new Pusher({
  appId: "1412322",
  key: "92edf92e65868532621f",
  secret: "3633c686940084d3b080",
  cluster: "ap1",
  useTLS: true,
});
const sendNoti = (object, channel = "mtask", event = "notification") => {
  return pusher.trigger(channel, event, {
    ...object,
  });
};
module.exports = { sendNoti };
