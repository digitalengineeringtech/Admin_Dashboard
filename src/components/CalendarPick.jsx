import React, { useState } from "react";
import { Calendar } from "primereact/calendar";

export default function CalendarPick({ label, date, setDate }) {
  return (
    <div className="">
      <div className="ms-2 text-gray-500 mb-1">{label}</div>
      <div className="card flex border border-inputB bg-input items-center justify-center h-[55px] mt-auto rounded-lg flex-col">
        <Calendar
          className="mx-3 w-[275px]  !outline-0 text-lg h-[40px]"
          id="buttondisplay"
          value={date}
          onChange={(e) => setDate(e.value)}
          showIcon
          showTime
          hourFormat="24"
        />
      </div>
    </div>
  );
}
