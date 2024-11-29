import React, { useEffect, useRef, useState } from "react";
import TableCom from "../table/TableCom";
import elements, {
  daily_sale,
  office_use,
} from "../../testBeforeApi/tableData/dailyList";
import { Table } from "@mantine/core";
import DailySale from "../table/DailySale";
import { useOutletContext } from "react-router-dom";
import Footer from "../footer/Footer";
import { useDownloadExcel } from "react-export-table-to-excel";
import { useReactToPrint } from "react-to-print";
import { downloadExcel } from "react-export-table-to-excel";
import "./table.css";
import Button from "../footer/Button";
import { RiFileExcel2Fill } from "react-icons/ri";

const Report = () => {
  const [totalPTest, totalOTest, totalCredit, notCredit, total] =
    useOutletContext();
  const [totalSaleAmount, setTotalSaleAmount] = useState();
  const [noCreditTotal, setNoCreditTotal] = useState();
  const [creditTotal, setCreditTotal] = useState();

  useEffect(() => {
    setTotalSaleAmount(
      notCredit
        ?.map((e) => Number(e.totalAmount))
        .reduce((pv, cv) => pv + cv, 0)
    );
  }, [totalCredit, notCredit]);

  useEffect(() => {
    const data = () => {
      const totalAmount = notCredit
        ?.map((e) => Number(e.totalAmount))
        .reduce((pv, cv) => pv + cv, 0);

      const totalDis = notCredit
        ?.map((e) => Number(e.totalAmount) - (e.totalAmount * e.discount) / 100)
        .reduce((pv, cv) => pv + cv, 0);

      return {
        totalAmount: totalAmount,
        disAmount: totalDis,
      };
    };

    const data2 = () => {
      const totalAmount = totalCredit
        ?.map((e) => Number(e.totalAmount))
        .reduce((pv, cv) => pv + cv, 0);

      const totalDis = totalCredit
        ?.map((e) => Number(e.totalAmount) - (e.totalAmount * e.discount) / 100)
        .reduce((pv, cv) => pv + cv, 0);

      return {
        totalAmount: totalAmount,
        disAmount: totalDis,
      };
    };

    setNoCreditTotal(data);
    setCreditTotal(data2);
  }, [totalCredit, notCredit]);

  console.log(creditTotal, noCreditTotal, "qqqqqqqqqqqqqqqqqq");

  const PumpTotalAmount = totalPTest
    ?.map((data) => Number(data.totalAmount))
    .reduce((pv, cv) => pv + cv);
  const OfficeTotalAmount = totalOTest
    ?.map((data) => Number(data.totalAmount))
    .reduce((pv, cv) => pv + cv);
  const totalCreditAmount = totalCredit
    ?.map((data) => Number(data.totalAmount))
    .reduce((pv, cv) => pv + cv);

  console.log(totalOTest, "ggggggg");

  const pumpTestFooter = {
    desc: "Total Pump Test",
    total: PumpTotalAmount,
  };
  const officeUseFooter = {
    desc: "Total Office Use",
    total: OfficeTotalAmount,
  };
  const dailySaleFooter = {
    desc: "Total Office Use",
    total: "300,000",
  };
  const pumpTestHeader = [
    "No",
    "Fuel Type",
    "Liter",
    "Price",
    "Amount",
    "Description",
  ];

  const dailySaleHeader = [
    "No",
    "Fuel Type",
    "Liter",
    "Price",
    "Amount",
    "Discount",
    "Amount",
    "Credit Balance",
  ];

  const pumpTestRows = totalPTest?.map((element, index) => (
    <Table.Tr key={index} className=" duration-150 text-center">
      <Table.Td>{index + 1}</Table.Td>
      <Table.Td> {element?.fueltype == "001-Octane Ron(92)"
          ? "92 RON"
          : element?.fueltype == "002-Octane Ron(95)"
          ? "95 RON"
          : element?.fueltype == "004-Diesel"
          ? "HSD"
          : element?.fueltype == "005-Premium Diesel"
          ? "PHSD"
          : ""}</Table.Td>
      <Table.Td>{element.totalLiter?.toFixed(2)}</Table.Td>
      <Table.Td>{element.pricePerLiter}</Table.Td>
      <Table.Td>{Number(element.totalAmount)?.toFixed(2)}</Table.Td>
      <Table.Td>{element.description || "-"}</Table.Td>
    </Table.Tr>
  ));
  const pumpTestRows2 = totalPTest?.map((element, index) => (
    <tr key={index} className=" duration-150 text-center">
      <td>{index + 1}</td>
      <td> {element?.fueltype == "001-Octane Ron(92)"
          ? "92 RON"
          : element?.fueltype == "002-Octane Ron(95)"
          ? "95 RON"
          : element?.fueltype == "004-Diesel"
          ? "HSD"
          : element?.fueltype == "005-Premium Diesel"
          ? "PHSD"
          : ""}</td>
      <td>{element.totalLiter?.toFixed(2)}</td>
      <td>{element.pricePerLiter}</td>
      <td>{Number(element.totalAmount)?.toFixed(2)}</td>
      <td>{element.description || "-"}</td>
    </tr>
  ));
  const officeUseRow = totalOTest?.map((element, index) => (
    <Table.Tr key={element.price} className=" duration-150 text-center">
      <Table.Td>{index + 1}</Table.Td>
      <Table.Td> {element?.fueltype == "001-Octane Ron(92)"
          ? "92 RON"
          : element?.fueltype == "002-Octane Ron(95)"
          ? "95 RON"
          : element?.fueltype == "004-Diesel"
          ? "HSD"
          : element?.fueltype == "005-Premium Diesel"
          ? "PHSD"
          : ""}</Table.Td>
      <Table.Td>{element.totalLiter?.toFixed(2)}</Table.Td>
      <Table.Td>{element.pricePerLiter}</Table.Td>
      <Table.Td>{Number(element.totalAmount)?.toFixed(2)}</Table.Td>
      <Table.Td>{element.description || "-"}</Table.Td>
    </Table.Tr>
  ));
  const officeUseRow2 = totalOTest?.map((element, index) => (
    <tr key={element.price} className=" duration-150 text-center">
      <td>{index + 1}</td>
      <td> {element?.fueltype == "001-Octane Ron(92)"
          ? "92 RON"
          : element?.fueltype == "002-Octane Ron(95)"
          ? "95 RON"
          : element?.fueltype == "004-Diesel"
          ? "HSD"
          : element?.fueltype == "005-Premium Diesel"
          ? "PHSD"
          : ""}</td>
      <td>{element.totalLiter?.toFixed(2)}</td>
      <td>{element.pricePerLiter}</td>
      <td>{element.totalAmount}</td>
      <td>{element.description || "-"}</td>
    </tr>
  ));

  console.log(notCredit, "This is notCredit")

  const dailySale = notCredit?.map((element, index) => (
    <Table.Tr key={index} className=" duration-150 text-center">
      <Table.Td>{index + 1}</Table.Td>
      <Table.Td> {element?.fueltype == "001-Octane Ron(92)"
          ? "92 RON"
          : element?.fueltype == "002-Octane Ron(95)"
          ? "95 RON"
          : element?.fueltype == "004-Diesel"
          ? "HSD"
          : element?.fueltype == "005-Premium Diesel"
          ? "PHSD"
          : ""}</Table.Td>
      <Table.Td>{element.totalLiter?.toFixed(2)}</Table.Td>
      <Table.Td>{element.pricePerLiter}</Table.Td>
      <Table.Td>{Number(element.totalAmount)?.toFixed(2)}</Table.Td>
      <Table.Td>{element.discount}%</Table.Td>
      <Table.Td>
        {element.discount > 0
          ? (
              element.totalAmount -
              (element.totalAmount * element.discount) / 100
            )?.toFixed(2)
          : Number(element.totalAmount)?.toFixed(2)}
      </Table.Td>
      <Table.Td>-</Table.Td>
    </Table.Tr>
  ));
  const dailySale2 = notCredit?.map((element, index) => (
    <tr key={index} className=" duration-150 text-center">
      <td>{index + 1}</td>
      <td colspan={2}> {element?.fueltype == "001-Octane Ron(92)"
          ? "92 RON"
          : element?.fueltype == "002-Octane Ron(95)"
          ? "95 RON"
          : element?.fueltype == "004-Diesel"
          ? "HSD"
          : element?.fueltype == "005-Premium Diesel"
          ? "PHSD"
          : ""}</td>
      <td>{element.totalLiter}</td>
      <td colspan={2}>{element.pricePerLiter}</td>
      <td colspan={2}>{Number(element.totalAmount).toFixed(2)}</td>
      <td>{element.discount}%</td>
      <td colspan={2}>
        {element.discount > 0
          ? (
              element.totalAmount -
              (element.totalAmount * element.discount) / 100
            )?.toFixed(2)
          : element.totalAmount}
      </td>
      <td colspan={2}>-</td>
    </tr>
  ));
  const secDailySale = totalCredit?.map((element, index) => (
    <Table.Tr key={index} className=" duration-150 text-center">
      <Table.Td>{index + 1}</Table.Td>
      <Table.Td> {element?.fueltype == "001-Octane Ron(92)"
          ? "92 RON"
          : element?.fueltype == "002-Octane Ron(95)"
          ? "95 RON"
          : element?.fueltype == "004-Diesel"
          ? "HSD"
          : element?.fueltype == "005-Premium Diesel"
          ? "PHSD"
          : ""}</Table.Td>
      <Table.Td>{element.totalLiter}</Table.Td>
      <Table.Td>{element.pricePerLiter}</Table.Td>
      <Table.Td>{element.totalAmount}</Table.Td>
      <Table.Td>{element.discount}%</Table.Td>
      <Table.Td>
        {element.discount > 0
          ? element.totalAmount - (element.totalAmount * element.discount) / 100
          : element.totalAmount}
      </Table.Td>
      <Table.Td>-</Table.Td>
    </Table.Tr>
  ));
  const secDailySale2 = totalCredit?.map((element, index) => (
    <tr key={index} className=" duration-150 text-center">
      <td>{index + 1}</td>
      <td colspan={2}> {element?.fueltype == "001-Octane Ron(92)"
          ? "92 RON"
          : element?.fueltype == "002-Octane Ron(95)"
          ? "95 RON"
          : element?.fueltype == "004-Diesel"
          ? "HSD"
          : element?.fueltype == "005-Premium Diesel"
          ? "PHSD"
          : ""}</td>
      <td>{element.totalLiter}</td>
      <td colspan={2}>{element.pricePerLiter}</td>
      <td colspan={2}>{element.totalAmount}</td>
      <td>{element.discount}%</td>
      <td colspan={2}>
        {element.discount > 0
          ? element.totalAmount - (element.totalAmount * element.discount) / 100
          : element.totalAmount}
      </td>
      <td colspan={2}>-</td>
    </tr>
  ));

  const tableRef = useRef(null);
  const pumptest = useDownloadExcel({
    currentTableRef: tableRef.current,
    filename: "Pump Test",
    sheet: "Pump Test",
  });

  const tableRef2 = useRef(null);
  const officeuse = useDownloadExcel({
    currentTableRef: tableRef2.current,
    filename: "OfficeUse ",
    sheet: "OfficeUse ",
  });

  const tableRef3 = useRef(null);

  const detail = useDownloadExcel({
    currentTableRef: tableRef3.current,
    filename: "OfficeUse ",
    sheet: "OfficeUse ",
  });

  const tableRef4 = useRef(null);
  const test = useDownloadExcel({
    currentTableRef: tableRef4.current,
    filename: "OfficeUse ",
    sheet: "OfficeUse ",
  });

  // console.log(pumpTestRows?.concat().concat(officeUseRow), "hhhhhhhhhhh");

  const handlePrint = useReactToPrint({
    content: () => tableRef.current,
  });
  const handlePrint2 = useReactToPrint({
    content: () => tableRef2.current,
  });
  const handlePrint3 = useReactToPrint({
    content: () => tableRef3.current,
  });
  const handlePrint4 = useReactToPrint({
    content: () => tableRef4.current,
  });

  return (
    <>
      <div className="">
        <div className="flex gap-6">
          <div className="w-[50%]">
            <TableCom
              tableRef={tableRef}
              label={"Pump Test"}
              footer={pumpTestFooter}
              header={pumpTestHeader}
              rows={pumpTestRows}
            />
            <Footer print={handlePrint} onClick={pumptest.onDownload} />
          </div>
          <div className="w-[50%]">
            <TableCom
              label={"Office Use"}
              tableRef={tableRef2}
              footer={officeUseFooter}
              header={pumpTestHeader}
              rows={officeUseRow}
            />
            <Footer print={handlePrint2} onClick={officeuse.onDownload} />
          </div>
        </div>
        <div className="w-[100%] mt-10">
          <DailySale
            tableRef={tableRef3}
            footer={noCreditTotal}
            footer2={creditTotal}
            rows={dailySale}
            notCreditTotal={totalSaleAmount}
            label={"Daily Sale"}
            rows2={secDailySale}
          />
          <div className="flex justify-between">
            <Footer print={handlePrint3} onClick={detail.onDownload} />
            {/* <Footer onClick={test.onDownload} /> */}
            <div className=" my-auto p-3 rounded-xl">
              <Button
                onClick={test.onDownload}
                className="flex bg-detail text-secondary"
                icon={<RiFileExcel2Fill className="text-xl text-secondary" />}
                text="Total Table To Excel"
              />
            </div>
          </div>
        </div>
      </div>
      <table ref={tableRef4} className=" border tb hidden">
        <tr className="text-center text-lg font-semibold">
          <td>No</td>
          <td>Fuel Type</td>
          <td>Liter</td>
          <td>Price</td>
          <td>Amount</td>
          <td>Description</td>
          <td colspan={7}></td>
        </tr>
        {pumpTestRows2}
        <tr className="text-center text-lg font-semibold">
          <td colspan={4}>{pumpTestFooter.desc}</td>
          <td colspan={2}>{pumpTestFooter.total}</td>
          <td colspan={7}></td>
        </tr>
        <tr>
          <td colspan={12}></td>
        </tr>
        <tr className="text-center text-lg font-semibold">
          <td>No</td>
          <td>Fuel Type</td>
          <td>Liter</td>
          <td>Price</td>
          <td>Amount</td>
          <td>Description</td>
          <td colspan={7}></td>
        </tr>
        {officeUseRow2}
        <tr className="text-center text-lg font-semibold">
          <td colspan={4}>{officeUseFooter.desc}</td>
          <td colspan={2}>{officeUseFooter.total}</td>
          <td colspan={7}></td>
        </tr>
        <tr>
          <td colspan={12}></td>
        </tr>
        <tr className="text-center text-lg font-semibold">
          <td>No</td>
          <td colspan={2}>Fuel Type</td>
          <td>Liter</td>
          <td colspan={2}>Price</td>
          <td colspan={2}>Amount</td>
          <td>Discount</td>
          <td colspan={2}>Amount</td>
          <td colspan={2}>Credit</td>
        </tr>
        {dailySale2}
        <tr className="text-center text-lg ">
          <td colspan={6}></td>
          <td colspan={2}>{noCreditTotal?.totalAmount}</td>
          <td></td>
          <td colspan={2}>{noCreditTotal?.disAmount}</td>
          <td colspan={2}></td>
        </tr>
        {secDailySale2}
        <tr className="text-center text-lg ">
          <td colspan={6}>Credit Sale</td>
          <td colspan={2}>{creditTotal?.totalAmount}</td>
          <td></td>
          <td colspan={2}>{creditTotal?.disAmount}</td>
          <td colspan={2}></td>
        </tr>
        <tr className="text-center text-lg ">
          <td colspan={6}>Total Sale</td>
          <td colspan={2}>
            {noCreditTotal?.totalAmount + creditTotal?.totalAmount}
          </td>
          <td></td>
          <td colspan={2}>
            {noCreditTotal?.disAmount + creditTotal?.disAmount}
          </td>
          <td colspan={2}></td>
        </tr>
      </table>
    </>
  );
};

export default Report;
