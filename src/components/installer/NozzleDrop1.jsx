import React from "react";

const NozzleDrop1 = ({ full, setValue, value, title = "No" }) => {
  return (
    <div className={`${full ? "w-full " : "w-[200px]"} `}>
      <select
        value={value}
        onChange={(e) => setValue(e.target.value)}
        name="languages"
        id="lang"
        className=" ps-3 h-[45px] rounded-md p-2 px-1 w-[100%]"
      >
        <option value="0">None</option>
        <option value="1">PumpId 01</option>
        <option value="2">PumpId 02</option>
        <option value="3">PumpId 03</option>
        <option value="4">PumpId 04</option>
        <option value="5">PumpId 05</option>
        <option value="6">PumpId 06</option>
        <option value="7">PumpId 07</option>
        <option value="8">PumpId 08</option>
        <option value="9">PumpId 09</option>
        <option value="10">PumpId 10</option>
        <option value="11">PumpId 11</option>
        <option value="12">PumpId 12</option>
        <option value="13">PumpId 13</option>
        <option value="14">PumpId 14</option>
        <option value="15">PumpId 15</option>
        <option value="16">PumpId 16</option>
        <option value="17">PumpId 17</option>
        <option value="18">PumpId 18</option>
        <option value="19">PumpId 19</option>
        <option value="20">PumpId 20</option>
        <option value="21">PumpId 21</option>
        <option value="22">PumpId 22</option>
        <option value="23">PumpId 23</option>
        <option value="24">PumpId 24</option>
        <option value="25">PumpId 25</option>
        <option value="26">PumpId 26</option>
        <option value="27">PumpId 27</option>
        <option value="28">PumpId 28</option>
        <option value="29">PumpId 29</option>
        <option value="30">PumpId 30</option>
        <option value="31">PumpId 31</option>
        <option value="32">PumpId 32</option>
      </select>
    </div>
  );
};

export default NozzleDrop1;
