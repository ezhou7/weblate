import { Request, Response, Router } from "express";

const router = Router();

const ping = (req: Request, res: Response) => {
  res.status(200).send("pong");
}

router.get("/", ping);

export default router;
