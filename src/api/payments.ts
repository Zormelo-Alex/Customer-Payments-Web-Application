import axios from "axios";

export const getAllPayments = async (startDate: string, endDate: string) => {
  return await axios.get("https://spes.pscgh.com:442/sales-api/api/Payments", {
    params: {
      StartDate: startDate,
      EndDate: endDate,
    },
  });
};
