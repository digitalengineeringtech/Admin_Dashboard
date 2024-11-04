import React, { useEffect, useState } from "react";
import TextInput from "./TextInput";
import { LanguagePicker } from "../Navbar/LanguagePicker";
import { Choose } from "./Choose";
import SelectDrop from "./SelectDrop";
import SelectDrop2 from "../SelectDrop";
import SearchButton from "./SearchButton";
import SelectDrop3 from "./SelectDrop2.jsx";

const ReadyState = ({
  //   handleReadyPermit,
  handleReadyState,
  disable,
  setDisableButton,
  selectedItem,
  onSelectedItem,
  chooseOne,
  setReadyStateObj,
  obj,
  setPremitFormInfo,
  presetButtonDisable,
                      printFormInfo
}) => {
  const customers = [
    {
      cou_name: "Individual Customer",
      cou_id: "0000",
    },
  ];

  const categories = [
    { label: "Cycle", value: 1 },
    { label: "Cycle ( 3 Wheels )", value: 2 },
    { label: "Car", value: 3 },
    { label: "Bus ( City )", value: 4 },
    { label: "Bus ( High Way )", value: 5 },
    { label: "Light Truck ( City )", value: 6 },
    { label: "Light Truck ( High way )", value: 7 },
    { label: "Heavy Truck ( City )", value: 8 },
    { label: "Heavy Truck ( High way )", value: 9 },
    { label: "Trailer ( City )", value: 10 },
    { label: "Trailer ( High way )", value: 11 },
    { label: "Htawlargyi", value: 12 },
    { label: "Tractor", value: 13 },
    { label: "Small Tractor", value: 14 },
    { label: "Heavy Machinery", value: 15 },
    { label: "Commercial Vehicle", value: 16 },
    { label: "Phone Tower", value: 17 },
    { label: "Industrial Zone", value: 18 },
    { label: "Generator Industry", value: 19 },
    { label: "Agriculture Machine", value: 20 },
    { label: "Generator ( Home Use )", value: 21 },
    { label: "Hospital", value: 22 },
    { label: "School", value: 23 },
    { label: "Super Market", value: 24 },
    { label: "Hotel", value: 25 },
    { label: "Housing", value: 26 },
    { label: "Boat", value: 27 },
    { label: "Pump Test", value: 28 },
    { label: "Office Use ( Bowser Car )", value: 29 },
    { label: "Station Use", value: 30 },
  ];

  const [cashType, setCashType] = useState(printFormInfo?.cashType);


  const [readyStateItem, setReadyStateItem] = useState("Kyats");
  const [customer, setCustomer] = useState(customers[0]);
  const [category, setCategory] = useState({ label: "Cycle", value: 1 });
  const [carNo, setCarNo] = useState("");
  const [cusId, setCusId] = useState("");
  const [paymentNo, setPyamentNo] = useState("Cash");
  const [numberValue, setNumberValue] = useState("");
  const [lNeed, setLNeed] = useState(false);

  const handleCarNo = (text) => {
    setCarNo(text);
  };

  console.log(readyStateItem,cashType, "ready state");
  useEffect(() => {
    if (readyStateItem == "Liters") {
      setLNeed(true);
      //     setReadyStateObj({
      //         depNo:obj.dep_no,
      //         nozzleNo: obj.nozzle_no,
      //         fuelType: obj.fuel_type,
      //         type: readyStateItem,
      //         carNo: carNo,
      //         vehicleType: category.label,
      //         cashType: paymentNo,
      //         salePrice: obj.daily_price,
      //         value: numberValue,
      //         couObjId: customer._id,
      //         couName: customer.cou_name,
      //         cou_id: customer.cou_id,
      //     });

      //      setPremitFormInfo({
      //     couObjId: customer._id,
      //     couName: customer.cou_name,
      //     cou_id: customer.cou_id,
      //     vehicleType: category.label,
      //     carNo: carNo,
      //     cashType: paymentNo
      // });

      // if (parseFloat(numberValue) % 1 !== 0) {
      // setLNeed(false);

      setPremitFormInfo({
        couObjId: customer._id,
        couName: customer.cou_name,
        cou_id: customer.cou_id,
        vehicleType: category.label,
        carNo: carNo,
        cashType: cashType,
        type: readyStateItem,
        value: numberValue,
        cusCardId: cusId
      });
      // } else {
      //     setLNeed(true);
      // }
    }

    if (readyStateItem == "Kyats") {
      setLNeed(false);
      // setReadyStateObj({
      //     depNo:obj.dep_no,
      //     nozzleNo: obj.nozzle_no,
      //     fuelType: obj.fuel_type,
      //     type: readyStateItem,
      //     carNo: carNo,
      //     vehicleType: category.label,
      //     cashType: paymentNo,
      //     salePrice: obj.daily_price,
      //     value: numberValue,
      //     couObjId: customer._id,
      //     couName: customer.cou_name,
      //     cou_id: customer.cou_id,
      // });
      console.log("liter");
      setPremitFormInfo({
        couObjId: customer._id,
        couName: customer.cou_name,
        cou_id: customer.cou_id,
        vehicleType: category.label,
        carNo: carNo,
        cashType: cashType,
        type: readyStateItem,
        value: numberValue,
        cusCardId: cusId
      });
      console.log("liter work");
    }

    console.log("work");
  }, [readyStateItem, customer, category,cusId, carNo, paymentNo, numberValue]);

  console.log(cusId, 'thisiisisi')

  return (
    <div>
      <div className="p-4 grid grid-cols-12 gap-8">
        <div className="col-span-4">
          <TextInput
            drop="true"
            value={numberValue}
            selectedItem={readyStateItem}
            onSelectedItem={setReadyStateItem}
            label="Choose Kyats or Liters"
            onChange={(value) => setNumberValue(value.target.value)}
            placeholder="00.00"
          />
        </div>
        <div className="col-span-4">
          <TextInput
            value={carNo}
            selectedItem={readyStateItem}
            label="Car Number"
            onChange={(value) => setCarNo(value.target.value)}
            placeholder="Car Number"
          />
        </div>
        <div className="col-span-4">
          {/*<SelectDrop*/}
          {/*  header="Customer Name"*/}
          {/*  customer*/}
          {/*  selectedItem={customer}*/}
          {/*  onSelectedItem={(customer) => setCustomer(customer)}*/}
          {/*  items={customers}*/}
          {/*  label="Customer Name"*/}
          {/*/>*/}
          <SelectDrop3
              header="Cash Type"
              selectedItem={cashType}
              onSelectedItem={(item) => setCashType(item.method)}
              label="Cash Type"
          />
        </div>
        <div className="col-span-4">
          <TextInput
              value={cusId}
              selectedItem={readyStateItem}
              label="Customer Id"
              onChange={(value) => setCusId(value.target.value)}
              placeholder="Customer Id"
          />
        </div>
        <div className="col-span-4">
          <SelectDrop2
              placeholder="All"
              label="Purpose of Use"
              data={categories}
              value={category}
              setValue={setCategory}
          />
        </div>
        <div className="col-span-4 mt-auto">
          <SearchButton
            icon=""
            title="Preset"
            disable={disable}
            onClick={handleReadyState}
          />
        </div>
      </div>
    </div>
  );
};

export default ReadyState;
