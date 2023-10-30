import express, { Express, Response, Request, NextFunction } from "express";
import { PORT } from "./config";
import sqlite3 from "sqlite3";
import {
  getPaymentInfo,
  makePayment,
} from "./src/controllers/paymentController";

const app: Express = express();

app.use(express.json());

export const db = new sqlite3.Database("./payments.db", (err: Error | null) => {
  if (err) {
    console.error("Error opening database " + err.message);
  } else {
    db.run(
      "CREATE TABLE payments( \
            payment_id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,\
            amount INTEGER,\
            email VARCHAR  NOT NULL,\
            retries INTEGER,\
            transfer_code NVARCHAR  NOT NULL\
        )",
      (err: Error | null) => {
        if (err) {
          console.log("Table already exists.");
        }
      },
    );
  }
});

app.get("/", (req: Request, res: Response) => {
  res.send("CurrencyBird API");
});

app.post("/payment", makePayment);
app.get("/payment", getPaymentInfo);

app.all("*", (req: Request, res: Response, next: NextFunction) => {
  next(
    res.status(404).json({
      status: "Not Found",
      message: `Can't find ${req.originalUrl} on this server!`,
    }),
  );
});

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});
