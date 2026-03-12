import React, { useEffect, useState } from "react";
import PaginationTable from "../components/TableComponent";
import { createColumnHelper } from "@tanstack/react-table";
import type { ColumnDef } from "@tanstack/react-table";
import axios from "axios";
import { getAllPayments } from "../api/payments";
import LoadingSkeleton from "../components/LoadingSkeleton";
import { FaX } from "react-icons/fa6";

const PaymentDashboard: React.FC = () => {
  const columnHelper = createColumnHelper();
  const [tableData, setTableData] = useState<any>([]);
  const [isDataLoading, setIsDataLoading] = useState(true);
  const [error, setError] = useState<any>(null);
  const columns: ColumnDef<any>[] = [
    columnHelper.accessor("wallet", {
      cell: (info) => (
        <div className="flex gap-3 items-center">
          <img
            src={info.row.original.img}
            alt=""
            className="w-[30px] h-[30px] rounded-full bg-white"
          />
          <p className="text-darklink dark:text-bodytext text-sm">
            {info.getValue()}
          </p>
        </div>
      ),
      header: () => <span>WALLET</span>,
    }),
    columnHelper.accessor("action", {
      cell: (info) => (
        <p className="text-darklink dark:text-bodytext text-sm">
          {info.getValue() || info.row.original.sa_fullName}
        </p>
      ),
      header: () => <span>ACTION</span>,
    }),
    columnHelper.accessor("amount", {
      cell: (info) => (
        <p
          className={`$ {
            info.row.original.rate == "bad"
              ? "text-[#0B78CC]"
              : "text-[#34C759]"
          } text-sm`}
        >
          {info.getValue()}
        </p>
      ),
      header: () => <span>AMOUNT</span>,
    }),
    columnHelper.accessor("agent", {
      cell: (info) => (
        <p className="text-darklink dark:text-bodytext text-sm flex items-center gap-1">
          {info.getValue()}
          <Badge
            className="p-[10px] px-[12px] bg-[#2A2F3A] rounded-[10px] flex items-center justify-center"
            notPadd={true}
          >
            <IoMdArrowRoundForward
              size={16}
              className="text-(--primaryColor)"
            />
          </Badge>
        </p>
      ),
      header: () => <span>AGENT</span>,
    }),
    columnHelper.accessor("status", {
      cell: (info) => (
        <p className="text-darklink dark:text-bodytext text-sm flex items-center gap-2">
          <div className="relative w-[7px] h-[7px] flex justify-center items-center">
            <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-ping"></span>
            <span className="relative inline-flex rounded-full h-full w-full bg-green-600"></span>
          </div>
          {info.getValue()}
        </p>
      ),
      header: () => <span>STATUS</span>,
    }),
    columnHelper.accessor("time", {
      cell: (info) => (
        <p className="text-darklink dark:text-bodytext text-sm">
          {info.getValue()}
        </p>
      ),
      header: () => <span>TIME</span>,
    }),
  ];
  const setUp = async () => {
    try {
      setIsDataLoading(true);
      setError(null);
      const res = await getAllPayments("2026-03-01", "2026-03-12");
      console.log(res);
    } catch (error) {
      console.log(error);
      setError(error);
    } finally {
      setIsDataLoading(false);
    }
  };
  useEffect(() => {
    setUp();
  }, []);
  return (
    <>
      {isDataLoading ? (
        <LoadingSkeleton />
      ) : (
        <div className="min-h-screen bg-black text-white px-8 py-12 flex flex-col items-center justify-start">
          {!error ? (
            <div className="w-full mx-auto">
              {/* Payment Section */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-6">
                <div>
                  <h2 className="text-xl">Payment History</h2>
                  <p className="text-[#AEAEAF] text-sm mt-2">
                    Browse all payments received from your customers through the
                    shop.
                  </p>
                </div>
              </div>
              {/* Data Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
                <div className="bg-gray-900 rounded-xl p-6 flex flex-col items-start">
                  <h3 className="text-sm text-gray-400">Total Transactions</h3>
                  <p className="text-2xl font-bold mt-2">1,245</p>
                </div>
                <div className="bg-gray-900 rounded-xl p-6 flex flex-col items-start">
                  <h3 className="text-sm text-gray-400">Total Revenue</h3>
                  <p className="text-2xl font-bold mt-2">$56,780</p>
                </div>
                <div className="bg-gray-900 rounded-xl p-6 flex flex-col items-start">
                  <h3 className="text-sm text-gray-400">Pending Payments</h3>
                  <p className="text-2xl font-bold mt-2">32</p>
                </div>
              </div>

              {/* Transaction Section */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mt-12 gap-4">
                <div>
                  <h2 className="text-xl">Transaction Details</h2>
                  <p className="text-[#AEAEAF] text-sm mt-2">
                    View detailed payment records and track each customer
                    transaction for your shop.
                  </p>
                </div>
              </div>

              {/* Table */}
              <div className="mt-8 overflow-x-auto">
                <PaginationTable TableData={tableData} columns={columns} />
              </div>
            </div>
          ) : (
            <div className="w-full flex flex-col items-center justify-center">
              <div className="w-full bg-red-600 text-white px-4 py-3 rounded-md mb-4 flex items-center gap-2">
                <FaX />
                <span className="text-sm">{error.message}</span>
              </div>
              <img
                src="https://cdni.iconscout.com/illustration/premium/thumb/error-illustration-svg-download-png-6983265.png"
                alt=""
              />
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default PaymentDashboard;
