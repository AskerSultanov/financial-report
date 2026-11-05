var file2Buffer = async (file) => {
  return await new Promise(function (resolve) {
    var reader = new FileReader();
    var readFile = function () {
      var buffer = reader.result;
      resolve(buffer);
    };

    reader.addEventListener("load", readFile);
    reader.readAsArrayBuffer(file);
  });
};

export default file2Buffer;
