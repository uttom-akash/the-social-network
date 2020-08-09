import moment from "moment";

export const getSocialFormatDate = (pDate) => {
  return moment(pDate).calendar();
  //   return moment(pDate, "YYYYMMDDH").fromNow();
};

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
