const truncateCityname = (string) => {
  const splittedString = string.split(",");
  const firstElement = splittedString[0].trim();
  return firstElement;
};

export { truncateCityname };
