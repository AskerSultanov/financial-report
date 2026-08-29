var calcTotalSold = (report) => report.filter((sku) => sku.docTypeName === "Продажа").reduce((acc, sku) => acc + +sku.quantity, 0);

export default calcTotalSold;
