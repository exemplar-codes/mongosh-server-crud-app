const http = require("node:http");
const DB_NAME = "myTrialDB";
const COLLECTION_NAME = "messages";

use(DB_NAME);
const server = http.createServer((req, res) => {
  let requestBody = [];
  req.on("data", (chunk) => {
    requestBody.push(chunk);
  });

  req.on("end", () => {
    requestBody = requestBody.toString() ?? null;
    if (requestBody) {
      requestBody = JSON.parse(requestBody);
    }
    requestHandler(req, res, requestBody);
  });
});

function requestHandler(req, res, requestBody = null) {
  res.setHeader("Content-Type", "application/json");
  res.statusCode = 200;

  let responseBody = [];

  if (req.url === "/" && req.method === "GET") {
    res.setHeader("Content-Type", "text/html");
    res.end("<h1>MongoDB server API endpoint</h1>");
  }
  try {
    if (req.url === "/messages" && req.method === "GET") {
      responseBody = [1, 2, 3];
      db[COLLECTION_NAME].forEach({}, (err, rb) => {
        // if (element._id) {()
        //   delete element._id;
        // }
        // responseBody.push(element);
        console.log(rb);
        responseBody = rb;
        return {};
      });

      res.end(JSON.stringify(responseBody));
    } else if (req.url === "/messages" && req.method === "POST") {
      const newlyCreateObject = db[COLLECTION_NAME].insertOne(requestBody);
      delete newlyCreateObject._id;
      responseBody = JSON.stringify(db[COLLECTION_NAME].insertOne(requestBody));
      res.end(responseBody);
    }
  } catch (err) {
    res.statusCode = 500;
    res.end(JSON.stringify(err));
  }
}
const port_number = 3000;
server.listen(port_number, () =>
  console.log(`Server running on port ${port_number}`)
);
