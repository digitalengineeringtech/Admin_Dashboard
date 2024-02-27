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

const Report = () => {
  const [totalPTest, totalOTest, totalCredit, notCredit] = useOutletContext();
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

  console.log(creditTotal, "qqqqqqqqqqqqqqqqqq");

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
      <Table.Td>{element.fueltype}</Table.Td>
      <Table.Td>{element.totalLiter}</Table.Td>
      <Table.Td>{element.pricePerLiter}</Table.Td>
      <Table.Td>{element.totalAmount}</Table.Td>
      <Table.Td>{element.description || "-"}</Table.Td>
    </Table.Tr>
  ));
  const officeUseRow = totalOTest?.map((element, index) => (
    <Table.Tr key={element.price} className=" duration-150 text-center">
      <Table.Td>{index + 1}</Table.Td>
      <Table.Td>{element.fueltype}</Table.Td>
      <Table.Td>{element.totalLiter}</Table.Td>
      <Table.Td>{element.pricePerLiter}</Table.Td>
      <Table.Td>{element.totalAmount}</Table.Td>
      <Table.Td>{element.description || "-"}</Table.Td>
    </Table.Tr>
  ));

  const dailySale = notCredit?.map((element, index) => (
    <Table.Tr key={index} className=" duration-150 text-center">
      <Table.Td>{index + 1}</Table.Td>
      <Table.Td>{element.fueltype}</Table.Td>
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
  const secDailySale = totalCredit?.map((element, index) => (
    <Table.Tr key={index} className=" duration-150 text-center">
      <Table.Td>{index + 1}</Table.Td>
      <Table.Td>{element.fueltype}</Table.Td>
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

  const handlePrint = useReactToPrint({
    content: () => tableRef.current,
  });
  const handlePrint2 = useReactToPrint({
    content: () => tableRef2.current,
  });
  const handlePrint3 = useReactToPrint({
    content: () => tableRef3.current,
  });

  return (
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
        <Footer print={handlePrint3} onClick={detail.onDownload} />
      </div>
    </div>
  );
};

export default Report;
