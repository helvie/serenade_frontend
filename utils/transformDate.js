import {
  parseISO,
  getDate,
  getMonth,
  getYear,
  differenceInYears,
} from "date-fns";

const age = (birthdate) => {
  return differenceInYears(new Date(), new Date(birthdate));
};

const extractDateInfo = (birthdate) => {
  const date = parseISO(birthdate);
  const day = getDate(date);
  const month = getMonth(date) + 1; // Months start from 0, so adding 1
  const year = getYear(date);

  return { day, month, year };
};

export { age, extractDateInfo };
