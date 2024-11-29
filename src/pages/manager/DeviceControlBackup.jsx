import React, { useContext, useEffect, useRef, useState } from "react";
import Card from "../../components/device/Card";
import UseGet from "../../api/hooks/UseGet";
import useTokenStorage from "../../utils/useDecrypt";
import mqtt from "mqtt";
import LoadContext from "../../services/LoadContext";
import { Loader } from "@mantine/core";
const DeviceControl = () => {
  const { loading, setLoading } = useContext(LoadContext);
  const client = mqtt.connect("ws://detpos:asdffdsa@127.0.0.1:9001");

  const [token, setToken] = useState("none");

  const [{ data_g, loading_g, error_g, pagi_g }, fetchItGet] = UseGet();

  useEffect(() => {
    fetchItGet(`/device`, token);
  }, []);

  const { loadToken } = useTokenStorage();
  useEffect(() => {
    const token = loadToken();
    if (token) {
      setToken(token);
    }
  }, []);

  const [noMorePermit, setNoMorePermit] = useState(null);
  const [payloadHistory, setPayloadHistory] = useState([]);
  const payloadHistoryRef = useRef(payloadHistory);
  const [allDone, setAllDone] = useState("0");
  const [permitd, setPermitd] = useState(false);
  const [readyDespenserHistory, setReadyDespenserHistory] = useState([]);
  const readyDespenserHistoryRef = useRef(readyDespenserHistory);
  const [liveDespenserHistory, setLiveDespenserHistory] = useState([]);
  const liveDespenserHistoryRef = useRef(liveDespenserHistory);
  const [finalData, setFinalData] = useState(0);
  const [nozzle1PermitRecord, setNozzle1PermitRecord] = useState(0);
  const checkLiveRef = useRef({
    nozzle: "",
  });
  const permitRef = useRef({
    nozzle: "",
  });
  const regex = /[A-Z]/g;
  const [liveData, setLiveData] = useState();
  const [liveDispenser, setLiveDispenser] = useState(undefined);

  const nozzle1FuelDetailRef = useRef({ liter: "", price: "" });

  client.on("connect", () => {
    client.subscribe("detpos/#", (err) => {
      err && console.log(err);
    });
  });


  client.on("message", (topic, message) => {
    // message is Buffer
    // console.log(
    //   "topic is ---- (",
    //   topic,
    //   ") and message is (",
    //   message.toString(),
    //   ")"
    // );

    // console.log(message.toString(), "..................");

    if (topic.startsWith("detpos/device/permit/") && /[1-8]$/.test(topic)) {
      const prefix = message.toString().substring(0, 2); // "01"

      const topicCount = payloadHistoryRef.current.filter(
        (t) => t === parseInt(prefix)
      ).length;
      if (topicCount < 2) {
        setPayloadHistory((prevTopics) => [...prevTopics, parseInt(prefix)]);
      }
      setNoMorePermit("hhh");
    }

    if (topic === "detpos/local_server") {
      const prefix = message.toString().substring(0, 2); // "01"
      setAllDone(prefix);
      // setFetchNew((prev)=>!prev)
    }

    if (topic === "detpos/device/price") {
      // setPriceChange(true);
    }

    if (topic === "detpos/local_server/mode") {
      if (message.toString() === "allow") {
        setPermitd(true);
      } else if (message.toString() === "manual") {
        setPermitd(false);
      }
    }

    if (topic === "detpos/local_server/price_change") {
      // setPriceChange(true);
    }

    if (topic.startsWith("detpos/local_server") && /[1-8]$/.test(topic)) {
      const prefix = message.toString().substring(0, 2); // "01"

      const topicCount = readyDespenserHistoryRef.current.filter(
        (t) => t === parseInt(prefix)
      ).length;
      if (topicCount < 1) {
        setReadyDespenserHistory((prevTopics) => [
          ...prevTopics,
          parseInt(prefix),
        ]);
      }
    }

    // console.log(message.toString())

    // console.log(message.toString(), topic);

    if (topic === "detpos/device/whreq") {
      const topicCount = liveDespenserHistoryRef.current.filter(
        (t) => t == message.toString()
      ).length;
      if (topicCount < 2) {
        setLiveDespenserHistory((prevTopics) => [
          ...prevTopics,
          message.toString(),
        ]);
      }
    }

    if (topic === "detpos/device/req") {
      const prefix = message.toString().substring(0, 2); // "01"
      const suffix = message.toString().substring(2); // "cancel"

      setNoMorePermit(prefix);
    }

    if (topic.startsWith("detpos/device/Final/") && /[1-8]$/.test(topic)) {
      let data = message.toString().split(regex);
      setFinalData(data[0]);
    }

    if (topic.startsWith("detpos/device/livedata/") && /[1-8]$/.test(topic)) {
      let data = message.toString().split(regex);
      const updatedNozzle1FuelDetail = {
        liter: data[1],
        price: data[2],
        nozzleNo: data[0],
      };

      const checkLive = {
        nozzleNo: data[0],
      };

      checkLiveRef.current = {
        ...checkLiveRef.current,
        ...checkLive,
      };

      nozzle1FuelDetailRef.current = {
        ...nozzle1FuelDetailRef.current,
        ...updatedNozzle1FuelDetail,
      };
    }
    // client.end();
  });

  // console.log(data_g);

  return (
    <>
      {loading && (
        <div className="bg-detail/10 backdrop-blur-sm w-[90%] h-screen absolute flex items-center justify-center">
          <Loader color="green" size="xl" />
        </div>
      )}
      <div className="w-full h-screen flex gap-8 flex-wrap items-center justify-center">
        {data_g?.map((obj, index) => (
          <Card
            loading
            setloading
            // setFetchNew={setFetchNew} need
            nozzle1PermitRecord={nozzle1PermitRecord}
            setNozzle1PermitRecord={setNozzle1PermitRecord}
            // selectedCards={selectedCards} no need in card
            // setSelectedCards={setSelectedCards} no need in card
            payloadHistory={payloadHistory}
            setPayloadHistory={setPayloadHistory}
            title={obj.nozzle_no}
            nozzle1FuelDetail={nozzle1FuelDetailRef}
            obj={obj}
            id={index}
            active={payloadHistory.includes(parseInt(obj.nozzle_no))}
            // setVisible={setVisible} no need in card
            key={index}
            finalData={finalData}
            setFinalData={setFinalData}
            onClick={() => open()}
            noMorePermit={noMorePermit}
            permitOfNozzles={permitRef}
            allDone={allDone}
            liveData={liveData == obj.nozzle_no ? liveData : undefined}
            setLiveData={setLiveData}
            setAllDone={setAllDone}
            checkLiveRef={checkLiveRef}
            liveDispenser={liveDispenser}
            approve={readyDespenserHistory.includes(parseInt(obj.nozzle_no))}
            setApprove={setReadyDespenserHistory}
            liveDespenserHistory={liveDespenserHistory.includes(obj.dep_no)}
            dis={obj.dep_no}
            num={obj.nozzle_no}
          />
        ))}
      </div>
    </>
  );
};

export default DeviceControl;

