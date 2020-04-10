import * as bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import express from "express";
import helmet from "helmet";
import http from "http";
import path from "path";

import apiRouter from "./api";

const server = express();

// use default security options
server.use(helmet());
// additional security options
server.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'", "data:", "https://*.googleapis.com", "https://fonts.gstatic.com"],
      scriptSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https:"],
      objectSrc: ["'none'"],
      baseUri: ["'self'"],
      workerSrc: ["'self'", "blob:"]
    }
  })
);
server.use(helmet.referrerPolicy({ policy: "no-referrer" }));

const root = path.join(__dirname, "../");
const appPath = path.join(root, "dist/app/");
const indexPath = path.join(appPath, "index.html");
server.set("indexPath", indexPath);

server.use(express.static(appPath));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(cookieParser());

server.use("/api", apiRouter);

server.use("/*", (req, res) => {
  res.sendFile(server.get("indexPath"));
})

export default http.createServer(server);
