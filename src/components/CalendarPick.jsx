import React, { useState } from "react";
import { Calendar } from "primereact/calendar";

export default function CalendarPick({ label, date, setDate }) {
  return (
    <div className="">
      <div className="ms-2 text-gray-500 mb-1">{label}</div>
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
