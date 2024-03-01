import React, { useEffect, useState } from "react";
import TextInput from "./TextInput";
import { LanguagePicker } from "../Navbar/LanguagePicker";
import { Choose } from "./Choose";
import SelectDrop from "./SelectDrop";
import SelectDrop2 from "../SelectDrop";
import SearchButton from "./SearchButton";
const RealTimeForms = ({
  handlePermit,
  close,
  setPremitFormInfo,
  permitState,
  chooseOne,
  permitButtonDisable,
}) => {
  const customers = [
    {
      cou_name: "Individual Customer",
      cou_id: "12345",
    },
  ];

  const categories = [
    { name: "Cycle", value: 1 },
    { name: "Cycle ( 3 Wheels )", value: 2 },
    { name: "Car", value: 3 },
    { name: "Bus ( City )", value: 4 },
    { name: "Bus ( High Way )", value: 5 },
    { name: "Light Truck ( City )", value: 6 },
    { name: "Light Truck ( High way )", value: 7 },
    { name: "Heavy Truck ( City )", value: 8 },
    { name: "Heavy Truck ( High way )", value: 9 },
    { name: "Trailer ( City )", value: 10 },
    { name: "Trailer ( High way )", value: 11 },
    { name: "Htawlargyi", value: 12 },
    { name: "Tractor", value: 13 },
    { name: "Small Tractor", value: 14 },
    { name: "Heavy Machinery", value: 15 },
    { name: "Commercial Vehicle", value: 16 },
    { name: "Phone Tower", value: 17 },
    { name: "Industrial Zone", value: 18 },
    { name: "Generator Industry", value: 19 },
    { name: "Agriculture Machine", value: 20 },
    { name: "Generator ( Home Use )", value: 21 },
    { name: "Hospital", value: 22 },
    { name: "School", value: 23 },
    { name: "Super Market", value: 24 },
    { name: "Hotel", value: 25 },
    { name: "Housing", value: 26 },
    { name: "Boat", value: 27 },
    { name: "Pump Test", value: 28 },
    { name: "Office Use ( Bowser Car )", value: 29 },
    { name: "Station Use", value: 30 },
  ];

  const [readyStateItem, setReadyStateItem] = useState("Kyats");
  const [customer, setCustomer] = useState(customers[0]);
  const [category, setCategory] = useState({ label: "Cycle", value: 1 });
  const [carNo, setCarNo] = useState("");
  const [paymentNo, setPyamentNo] = useState("Cash");
  const [numberValue, setNumberValue] = useState("");
  const [lNeed, setLNeed] = useState(false);

  console.log(readyStateItem, "ready state");
  useEffect(() => {
    if (readyStateItem == "Liters") {
      setLNeed(true);

      setPremitFormInfo({
        couObjId: customer._id,
        couName: customer.cou_name,
        cou_id: customer.cou_id,
        vehicleType: category.label,
        carNo: carNo,
        cashType: paymentNo,
        type: readyStateItem,
        value: numberValue,
      });
      // } else {
      //     setLNeed(true);
      // }
    }

    if (readyStateItem == "Kyats") {
      setLNeed(false);
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
        cashType: paymentNo,
        type: readyStateItem,
        value: numberValue,
      });
      console.log("liter work");
    }

    console.log("work");
  }, [readyStateItem, customer, category, carNo, paymentNo, numberValue]);

  return (
    <div>
      <div className="p-4 grid grid-cols-12 gap-8">
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
          <SelectDrop
            header="Customer Name"
            customer
            selectedItem={customer}
            onSelectedItem={(customer) => setCustomer(customer)}
            items={customers}
            label="Customer Name"
          />
        </div>
        <div className="col-span-4">
          <SelectDrop
            customerId
            header="Customer Id"
            selectedItem={customer}
            onSelectedItem={(customer) => setCustomer(customer)}
            items={customers}
            label="Customer Name"
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
          <SearchButton icon="" title="Permit" onClick={handlePermit} />
        </div>
      </div>
    </div>
  );
};

export default RealTimeForms;
