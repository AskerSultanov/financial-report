import { prisma } from "../../../index.js";
import defaultTaxParams from "../../../../database/defaultTaxParams.js";

export async function addNewTaxYearToDb(userId, year, client = prisma) {
  var taxParams = await client.taxParams.findMany({ where: { userId } });

  var existTaxParams = taxParams?.find((params) => params.year === year);

  if (existTaxParams) {
    var nextYear = year + 1;
    var nextYearTaxParams = taxParams.find((params) => params.year === nextYear);

    if (!nextYearTaxParams) {
      var defaultNextYearTaxParams = defaultTaxParams.find((i) => i.year === nextYear);

      await client.taxParams.create({ data: { userId, ...defaultNextYearTaxParams } });
    }

    return existTaxParams;
  }

  var defaultCurrentYearTaxParams = defaultTaxParams.find((i) => i.year === year);

  await client.taxParams.create({ data: { userId, ...defaultCurrentYearTaxParams } });

  return defaultCurrentYearTaxParams;
}
