const displayINRcurrency = (num) => {
  const formeter = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2
  });

  return formeter.format(num);
};

export default displayINRcurrency;
