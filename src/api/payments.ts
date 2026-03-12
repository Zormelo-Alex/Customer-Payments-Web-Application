import axios from "axios";

export const getAllPayments = async (startDate?: string, endDate?: string) => {
  return await axios.get("https://spes.pscgh.com:442/sales-api/api/Payments", {
    params: {
      ...(startDate && { StartDate: startDate }),
      ...(endDate && { EndDate: endDate }),
    },
  });
};

export const getPaymentDetails = async (paymentID: string) => {
  return await axios.get(
    `https://spes.pscgh.com:442/sales-api/api/Payments/${paymentID}`,
  );
};
