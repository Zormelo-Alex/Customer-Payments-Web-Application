import React, { useEffect, useState } from "react";
import PaginationTable from "../components/TableComponent";
import { createColumnHelper } from "@tanstack/react-table";
import type { ColumnDef } from "@tanstack/react-table";
import { getAllPayments, getPaymentDetails } from "../api/payments";
import LoadingSkeleton from "../components/LoadingSkeleton";
import { FaX } from "react-icons/fa6";
import moment from "moment";
import { FaEye } from "react-icons/fa";
import PaymentModal from "../components/PaymentModal";


const PaymentDashboard: React.FC = () => {
  const columnHelper = createColumnHelper<any>();
  const [tableData, setTableData] = useState<any>([]);
  const [isDataLoading, setIsDataLoading] = useState(true);
  const [isDetailsLoading, setisDetailsLoading] = useState(true);
  const [paymentDetails, setPaymentDetails] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState<any>(null);
  const columns: ColumnDef<any>[] = [
    columnHelper.accessor("PaymentNumber", {
      cell: (info: any) => (
        <div className="flex gap-3 items-center">
          <p className="text-darklink dark:text-bodytext text-sm">
            {info.getValue()}
          </p>
        </div>
      ),
      header: () => <span className="whitespace-nowrap">PAYMENT ID</span>,
    }),
    columnHelper.accessor("Customer", {
      cell: (info: any) => (
        <p className="text-darklink dark:text-bodytext text-sm">
          {info.getValue()}
        </p>
      ),
      header: () => <span>CUSTOMER</span>,
    }),
    columnHelper.accessor("Amount", {
      cell: (info: any) => (
        <p className="text-darklink dark:text-bodytext text-sm">
          GHS {Number(info.getValue()).toLocaleString()}
        </p>
      ),
      header: () => <span>AMOUNT</span>,
    }),
    columnHelper.accessor("PaymentDate", {
      cell: (info: any) => (
        <p className="text-darklink dark:text-bodytext text-sm">
          {moment(info.getValue()).format("DD/MM/YYYY - h:mm A")}
        </p>
      ),
      header: () => <span>DATE</span>,
    }),
    columnHelper.accessor("Action", {
      cell: (info: any) => (
        <div className="">
          <button
            className="underline flex gap-2 text-sm items-center justify-center bg-primary hover:bg-primary hover:text-white"
            onClick={() => {
              getPaymentDetailsFunc(info.row.original.PaymentId);
              setIsModalOpen(true);
            }}
          >
            <FaEye size="18" />
            view
          </button>
        </div>
      ),
      header: () => <span>ACTION</span>,
    }),
  ];

  const setUp = async () => {
    try {
      setIsDataLoading(true);
      setError(null);
      const res = await getAllPayments("2026-03-01", "2026-03-12");
      setTableData(res.data);
    //   console.log(res);
    } catch (error) {
      console.log(error);
      setError(error);
    } finally {
      setIsDataLoading(false);
    }
  };

  const getPaymentDetailsFunc = async (id: string) => {
    try {
      setisDetailsLoading(true);
      const res: any = await getPaymentDetails(id);
      setPaymentDetails(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setisDetailsLoading(false);
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
                  <h3 className="text-sm text-gray-400">Total Revenue</h3>
                  <p className="text-2xl font-bold mt-2">
                    GHS{" "}
                    {tableData
                      ?.reduce(
                        (sum: number, payment: any) => sum + payment.Amount,
                        0,
                      )
                      ?.toLocaleString()}
                  </p>
                </div>
                <div className="bg-gray-900 rounded-xl p-6 flex flex-col items-start">
                  <h3 className="text-sm text-gray-400">Total Transactions</h3>
                  <p className="text-2xl font-bold mt-2">
                    {tableData.length?.toLocaleString()}
                  </p>
                </div>
                <div className="bg-gray-900 rounded-xl p-6 flex flex-col items-start">
                  <h3 className="text-sm text-gray-400">Highest Payment</h3>
                  <p className="text-2xl font-bold mt-2">
                    {tableData.length
                      ? Math.max(
                          ...tableData.map((p: any) => p.Amount),
                        )?.toLocaleString()
                      : 0}
                    .00
                  </p>
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
                <span className="text-sm">{error?.message}</span>
              </div>
              <img
                src="https://cdni.iconscout.com/illustration/premium/thumb/error-illustration-svg-download-png-6983265.png"
                alt=""
              />
            </div>
          )}
        </div>
      )}

      <PaymentModal
        isLoading={isDetailsLoading}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        payment={paymentDetails}
      />
    </>
  );
};

export default PaymentDashboard;
