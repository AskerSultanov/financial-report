var calculateTotalAdvertisingCosts = (data) => data.reduce((acc, i) => acc + i.updSum, 0);

export default calculateTotalAdvertisingCosts;
