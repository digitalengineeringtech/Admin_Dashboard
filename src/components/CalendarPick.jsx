import React, { useEffect, useState } from "react";
import { Calendar } from "primereact/calendar";
import { InputText } from "primereact/inputtext";

export default function CalendarPick({
  label,
  date,
  setDate,
  start,
  value,
  setValue,
}) {
  const [hour, setHour] = useState(start ? "00" : date.getHours());
  const [minute, setMinute] = useState(start ? "00" : date.getMinutes());
  const [second, setSecond] = useState(start ? "00" : date.getSeconds());

  useEffect(() => {
    let start = new Date(value);
    start.setHours(hour);
    start.setMinutes(minute);
    start.setSeconds(second);
    setValue(start);
  }, [hour, minute, second]);

  return (
    <div className="">
      <div className="flex justify-between">
        <div className="ms-2 text-gray-500 mb-1">{label}</div>
        <div className="flex gap-1">
          <InputText
            // width={20}
            className="h-4 text-center w-9 px-0"
            keyfilter="int"
            placeholder="00"
            value={hour}
            onChange={(e) => setHour(e.target.value)}
          />
          <div className="text-xl font-semibold text-gray-300">:</div>
          <InputText
            // width={20}
            className="h-5 text-center w-9 px-0"
            keyfilter="int"
            placeholder="00"
            value={minute}
            onChange={(e) => setMinute(e.target.value)}
          />
          <div className="text-xl font-semibold text-gray-300">:</div>
          <InputText
            // width={20}
            className="h-4 text-center w-9  px-0"
            keyfilter="int"
            placeholder="00"
            value={second}
            onChange={(e) => setSecond(e.target.value)}
          />
        </div>
      </div>
      <div className=" flex border border-inputB bg-input items-center justify-center h-[55px] mt-auto rounded-lg flex-col">
        <Calendar
          className="mx-3 w-[275px]  !outline-0 text-lg h-[40px]"
          id="buttondisplay"
          dateFormat="dd/mm/yy"
          value={date}
          onChange={(e) => setDate(e.value)}
          showIcon
          showTime
          showSeconds
          hourFormat="24"
        />
      </div>
    </div>
  );
}
