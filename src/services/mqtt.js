import mqtt from "mqtt"; // import namespace "mqtt"

export const sub_topic = "detpos/device/";
<<<<<<< HEAD
// const mqttUrl = "ws://detpos:asdffdsa@192.168.0.100:9001";
const mqttUrl = "ws://detpos:asdffdsa@127.0.0.1:9001";
=======
// const mqttUrl = "ws://detpos:asdffdsa@127.0.0.1:9001";
const mqttUrl = "ws://detpos:asdffdsa@192.168.0.100:9001";
>>>>>>> c1a06c63bd9ba0117672c44506c43ac999586443
const mqttUserName = "detpos";
const mqttPassword = "asdffdsa";

export const client = mqtt.connect(mqttUrl, {
  username: mqttUserName,
  password: mqttPassword,
});

export const connect = () => {
  client.subscribe("#", { qos: 0 }, function (err) {
    if (err) {
      console.log("An error occurred while subscribing");
    } else {
      console.log("Subscribed successfully to " + sub_topic.toString());
    }
  });
};
