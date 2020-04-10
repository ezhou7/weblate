import server from "./server";

const port: string | number = process.env.PORT || 8080;

server.listen(port, () => console.info(`Listening on port ${port}`));
