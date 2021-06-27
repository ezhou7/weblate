import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import http from "http";
import path from "path";

import apiRouter from "./api";

// set server environment variables
const serverEnvPath = path.resolve("envs", "server", ".env.dev");
dotenv.config({ path: serverEnvPath });

const server = express();

// allow webpack devtool "eval-cheap-source-map" to execute on Firefox when devving
const scriptSrcHeaders = process.env.NODE_ENV === "development" ?
  ["'self'", "'unsafe-eval'"] :
  ["'self'"];

const styleSrcHeaders = process.env.NODE_ENV === "development" ?
  ["'self'", "https:", "'unsafe-inline'"] :
  ["'self'", "https:"];

// use default security options
server.use(helmet());
// additional security options
server.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'", "data:", "https://*.googleapis.com", "https://fonts.gstatic.com"],
      scriptSrc: scriptSrcHeaders,
      styleSrc: styleSrcHeaders,
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
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(cookieParser());

server.use("/api", apiRouter);

server.use("/*", (req, res) => {
  res.sendFile(server.get("indexPath"));
})

export default http.createServer(server);
