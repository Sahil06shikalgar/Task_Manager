export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const addThousandsSeparator = (num) => {
  if(num ==null || isNaN(num)) return "";

  const[intgerPart,frictionalPart] = num.toString().split(".");
  const formattedInteger = intgerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return frictionalPart ? `${formattedInteger}.${frictionalPart}` : formattedInteger;

};