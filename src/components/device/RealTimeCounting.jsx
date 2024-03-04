import React, { useEffect, useState } from "react";
import TextInput from "./TextInput";
import { LanguagePicker } from "../Navbar/LanguagePicker";
import { Choose } from "./Choose";
import SelectDrop from "./SelectDrop";
import SelectDrop2 from "../SelectDrop";
import SelectDrop3 from "./SelectDrop2";
import SearchButton from "./SearchButton";
import RealTime from "./RealTime";

const RealTimeCounting = ({
  handleErrorCon,
  liter,
  price,
  printFormInfo,
  setSaleLiter,
  setSalePrice,
  nozzle1FuelDetail,
  setRealTimeEdit,
  handleRealTimeUpdate,
  realTimeEditChooseOne,
  setPrintFormInfo,
  obj,
  fetchObj,
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
  const [cashType, setCashType] = useState(printFormInfo.cashType);

  const [readyStateItem, setReadyStateItem] = useState("Kyats");
  const [customer, setCustomer] = useState({
    cou_name: printFormInfo.customerName,
    cou_id: printFormInfo.customerId,
    couObjId: "",
  });
  const [category, setCategory] = useState(printFormInfo.purposeOfUse);
  const [carNo, setCarNo] = useState(printFormInfo.carNo);

  useEffect(() => {
    setPrintFormInfo({
      nozzle_no: obj.nozzle_no,
      objId: printFormInfo.objId,
      vocono: fetchObj.vocono,
      cashType: cashType,
      carNo: carNo,
      purposeOfUse: category,
      customerName: customer.cou_name,
      customerObjId: customer._id,
      customerId: customer.cou_id,
    });
  }, [cashType, carNo, customer, category]);

  return (
    <div>
      <RealTime
        liter={liter}
        price={price}
        printFormInfo={printFormInfo}
        setSaleLiter={setSaleLiter}
        setSalePrice={setSalePrice}
        obj={nozzle1FuelDetail}
      />
      <div className="p-4 grid grid-cols-12 gap-8">
        <div className="col-span-4">
          <TextInput
            value={printFormInfo.vocono}
            selectedItem={readyStateItem}
            label="Vocno Number"
            // onChange={(value) => setCarNo(value.target.value)}
            placeholder="Car Number"
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
          <SelectDrop3
            header="Cash Type"
            selectedItem={cashType}
            onSelectedItem={(item) => setCashType(item.method)}
            label="Cash Type"
          />
        </div>
        <div className="col-span-4">
          <SelectDrop2
            header="ddd"
            placeholder="All"
            label="Purpose of Use"
            data={categories}
            value={category}
            setValue={setCategory}
          />
        </div>
        <div className="col-span-4 mt-auto">
          <SearchButton icon="" title="Update" onClick={handleRealTimeUpdate} />
        </div>
      </div>
    </div>
  );
};

export default RealTimeCounting;
