import { prisma } from "../../../index.js";

var formatField = (key, value) => {
  var formattedField = "";

  switch (typeof value) {
    case "string":
      formattedField += `"${key}"='${value}',\n `;
      break;

    case "boolean":
      formattedField = value ? `"${key}"=TRUE,\n ` : `"${key}"=FALSE,\n `;
      break;

    case "object" && value === null:
      formattedField += `"${key}"=NULL,\n `;
      break;

    case "number":
      formattedField += `"${key}"=${value},\n `;

    case "object":
      if (value?.constructor?.name?.startsWith("Decima")) {
        formattedField += `"${key}"=${value.toNumber()},\n `;
      }
      break;
  }

  return { formattedField };
};

var createWhereCondition = (data) => {
  var whereCondition = "\n ";
  var isFirstIteration = true;
  var keys = Object.keys(data);

  for (var key in data) {
    var { formattedField } = formatField(key, data[key]);
    formattedField = formattedField.slice(0, -2);

    if (isFirstIteration) {
      whereCondition += `WHERE ` + formattedField;
    } else {
      whereCondition += ` AND ` + formattedField;
    }

    whereCondition = whereCondition.slice(0, -1) + " \n";
    isFirstIteration = false;
  }

  return { whereCondition };
};

var createQeury = (reportData) => {
  var queries = "";

  for (var sku of reportData) {
    var dataToUpdating = "";

    var count = 0;
    var keys = Object.keys(sku);

    for (var key of keys) {
      var { formattedField } = formatField(key, sku[key]);

      var isLastKey = count >= keys.length - 1;

      if (isLastKey) {
        formattedField = formattedField.slice(0, -3);
      }
      console.log({ formattedField });

      dataToUpdating += formattedField;

      ++count;
    }

    var { whereCondition } = createWhereCondition(sku);

    var query = `UPDATE "Sku"\nSET \n`;
    query += dataToUpdating + whereCondition + ";\n";

    queries += query + "\n";
  }

  return { queries };
};

export async function saveUpdatedReport(userId, reportId, updatedReport, client = prisma) {
  var { queries } = createQeury(updatedReport);

  return await client.$transaction(async (tx) => {
    for (var sku of updatedReport) {
      await tx.sku.update({
        where: { userId_dateFrom_dateTo_skuName: { userId: sku.userId, dateFrom: sku.dateFrom, dateTo: sku.dateTo, skuName: sku.skuName } },
        data: sku,
      });
    }
  });
}
