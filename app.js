const { createServer } = require("http");
const next = require("next");

const dev = process.env.NODE_ENV === "development";
const hostname = process.env.HOSTNAME || "0.0.0.0";
const port = Number(process.env.PORT || 3000);

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    createServer((req, res) => {
      handle(req, res);
    }).listen(port, hostname, () => {
      console.log(`MGBG Inc. website running on http://${hostname}:${port}`);
    });
  })
  .catch((error) => {
    console.error("Failed to start MGBG Inc. website", error);
    process.exit(1);
  });
