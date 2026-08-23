var calcQuantity = (report) => report.filter((item) => item.docTypeName === "Продажа").reduce((acc, i) => acc + +i.quantity, 0);

export default calcQuantity;
