import mqtt from "mqtt"; // import namespace "mqtt"

export const sub_topic = "detpos/device/";
const mqttUrl = "ws://192.168.0.100:9001";
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
