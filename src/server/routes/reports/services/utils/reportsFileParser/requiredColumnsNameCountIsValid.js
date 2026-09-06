var requiredColumnsNameCountIsValid = (requiredColumnsName, expectedQtyOfRequiredColumnsName) =>
  Object.keys(requiredColumnsName).length === expectedQtyOfRequiredColumnsName;

export default requiredColumnsNameCountIsValid;
