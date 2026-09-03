export var exchanges = [
  {
    type: "direct",
    name: "report-loader",
    options: { durable: true },
    queues: [
      {
        name: "report.loading",
        routingKeys: ["longrange", "abandoned"],
        options: { durable: true, arguments: { "x-queue-type": "quorum", "x-dead-letter-exchange": "report-loading-dlx" } },
      },
    ],
  },
];

// export var deadLetterExchanges = [
//   {
//     type: "direct",
//     name: "report-loader-dlx",
//     options: { durable: true },
//     queues: [
//       {
//         name: "report.loading-dlx",
//         routingKeys: ["longrange-dlx", "abandoned-dlx"],
//         options: { durable: true, arguments: { "x-queue-type": "quorum" } },
//       },
//     ],
//   },
// ];
