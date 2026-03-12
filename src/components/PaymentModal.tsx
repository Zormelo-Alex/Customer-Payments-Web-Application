import moment from "moment";
import React from "react";
import { FaSpinner } from "react-icons/fa";
import { FaX } from "react-icons/fa6";

type ModeOfPayment = {
  ModeOfPayment: string;
  Amount: number;
  AccountId: string;
  BankId: string;
  Account: string;
  Bank: string;
  Reference: string;
};

type Invoice = {
  Id: string;
  InvoiceNumber: string;
  TotalAmount: number;
  Outstanding: number;
  InvoiceDate: string;
  InvoiceStatus: string;
};

type Payee = {
  FullName: string;
  Phone: string;
  Email: string;
  Address: string;
};

type PaymentDetail = {
  Id: string;
  PaymentNumber: string;
  AmountPaid: number;
  Outstanding: number;
  PaymentDate: string;
  CustomerId: string;
  UserId: string;
  Customer: string;
  Remarks: string;
  onAccount: number;
  CreatedAt: string;
  Status: string | null;
  ModeOfPayments: ModeOfPayment[];
  invoices: Invoice[];
  Payee: Payee;
};

type PaymentModalProps = {
  isOpen: boolean;
  onClose: () => void;
  payment: PaymentDetail;
  isLoading: boolean;
};

const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  onClose,
  payment,
  isLoading,
}) => {
  if (!isOpen) return null;

//   console.log(payment);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 rounded-xl w-full max-w-3xl overflow-y-auto max-h-[90vh] shadow-lg">
        <div className="flex justify-between items-center border-b border-gray-700 p-4">
          <h2 className="text-xl font-bold text-white">Payment Details</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition"
          >
            <FaX />
          </button>
        </div>

        {isLoading ? (
          <div className="flex flex-col justify-center text-white items-center min-h-[70dvh] gap-2">
            <FaSpinner className="animate-spin text-4xl" /> Loading payment detials...
          </div>
        ) : (
          <>
            {/* Content */}
            <div className="p-6 space-y-6 text-gray-300">
              {/* Basic Info */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm text-gray-400">Payment Number</h3>
                  <p className="font-medium">{payment?.PaymentNumber}</p>
                </div>
                <div>
                  <h3 className="text-sm text-gray-400">Payment Date</h3>
                  <p className="font-medium">
                    {moment(payment?.PaymentDate).format(
                      "Do MMMM, YYYY - h:mm A",
                    )}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm text-gray-400">Customer</h3>
                  <p className="font-medium">{payment?.Customer}</p>
                </div>
                <div>
                  <h3 className="text-sm text-gray-400">Amount Paid</h3>
                  <p className="font-medium">
                    GHS {payment?.AmountPaid?.toLocaleString()}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm text-gray-400">Outstanding</h3>
                  <p className="font-medium">
                    GHS {payment?.Outstanding?.toLocaleString()}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm text-gray-400">Remarks</h3>
                  <p className="font-medium">{payment?.Remarks || "N/A"}</p>
                </div>
              </div>

              {/* Mode of Payment */}
              <div>
                <h3 className="text-sm text-gray-400 mb-2">Mode of Payments</h3>
                <div className="space-y-2">
                  {payment?.ModeOfPayments?.map((m, idx) => (
                    <div
                      key={idx}
                      className="bg-gray-800 p-3 rounded-md grid grid-cols-2 gap-4"
                    >
                      <p>
                        <span className="text-gray-400">Mode:</span>{" "}
                        {m?.ModeOfPayment}
                      </p>
                      <p>
                        <span className="text-gray-400">Amount:</span> GHS{" "}
                        {m?.Amount?.toLocaleString()}
                      </p>
                      <p>
                        <span className="text-gray-400">Account:</span>{" "}
                        {m?.Account}
                      </p>
                      <p>
                        <span className="text-gray-400">Reference:</span>{" "}
                        {m?.Reference}
                      </p>
                      {m?.Bank && (
                        <p>
                          <span className="text-gray-400">Bank:</span> {m.Bank}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Invoices */}
              <div>
                {payment?.invoices?.length > 0 && (
                  <>
                    <h3 className="text-sm text-gray-400 mb-2">Invoices</h3>
                    <div className="space-y-2">
                      {payment?.invoices?.map((inv) => (
                        <div
                          key={inv.Id}
                          className="bg-gray-800 p-3 rounded-md grid grid-cols-2 gap-4"
                        >
                          <p>
                            <span className="text-gray-400">
                              Invoice Number:
                            </span>{" "}
                            {inv?.InvoiceNumber}
                          </p>
                          <p>
                            <span className="text-gray-400">Total Amount:</span>{" "}
                            GHS {inv?.TotalAmount?.toLocaleString()}
                          </p>
                          <p>
                            <span className="text-gray-400">Outstanding:</span>{" "}
                            GHS {inv?.Outstanding?.toLocaleString()}
                          </p>
                          <p>
                            <span className="text-gray-400">Invoice Date:</span>{" "}
                            {moment(inv?.InvoiceDate).format("Do MMMM, YYYY")}
                          </p>
                          <p>
                            <span className="text-gray-400">Status:</span>{" "}
                            {inv?.InvoiceStatus}
                          </p>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* Payee Info */}
              <div>
                <h3 className="text-sm text-gray-400 mb-2">Payee Info</h3>
                <div className="bg-gray-800 p-3 rounded-md grid grid-cols-2 gap-4">
                  <p>
                    <span className="text-gray-400">Full Name:</span>{" "}
                    {payment?.Payee?.FullName || "N/A"}
                  </p>
                  <p>
                    <span className="text-gray-400">Phone:</span>{" "}
                    {payment?.Payee?.Phone || "N/A"}
                  </p>
                  <p>
                    <span className="text-gray-400">Email:</span>{" "}
                    {payment?.Payee?.Email || "N/A"}
                  </p>
                  <p>
                    <span className="text-gray-400">Address:</span>{" "}
                    {payment?.Payee?.Address || "N/A"}
                  </p>
                </div>
              </div>
            </div>
          </>
        )}

        <div className="flex justify-end p-4 border-t border-gray-700">
          <button
            onClick={onClose}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;
