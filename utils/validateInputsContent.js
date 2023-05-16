export const isInputEmpty = (input) => {
  return input.trim().length === 0;
};

export const isEmailValid = (email) => {
  const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return pattern.test(email);
};
