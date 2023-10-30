import { Request, Response } from "express";
import { get, post } from "../utils/services";
import { PaymentDataResponse } from "../interfaces/paymentResponses";
import { db } from "../../server";
import { getData } from "../utils/queryData";

export const makePayment = async (req: Request, res: Response) => {
  try {
    const { transferCode, amount } = req.body;
    // GET token
    const tokenResponse = await get("", "/token", { email: transferCode });
    if (tokenResponse.error) {
      return res.status(tokenResponse.status || 500).json({
        message: tokenResponse.data,
      });
    }
    const sql = `SELECT * FROM payments WHERE transfer_code = ?`;
    const result = await getData(db, sql, [transferCode]);
    if (result) {
      return res.status(400).json({
        message: "Payment already made",
      });
    }
    const token = tokenResponse.data as string;
    // POST payment
    const paymentResponse = await post(
      token,
      "/payment",
      {
        transferCode: transferCode,
        amount,
      },
      { email: transferCode, transferCode: transferCode },
    );

    if (paymentResponse.error) {
      return res.status(paymentResponse.status || 500).json({
        message: paymentResponse.data || "Something went wrong",
      });
    }

    const { data: paymentData } = paymentResponse as PaymentDataResponse;
    db.run(
      `INSERT INTO payments (amount, email, retries, transfer_code) VALUES (?,?,?,?)`,
      [
        paymentData.amount,
        paymentData.email,
        paymentData.retries,
        paymentData.transferCode,
      ],
      (err: Error | null) => {
        if (err) throw err;
      },
    );
    res.status(200).json(paymentData);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Something went wrong",
    });
  }
};

export const getPaymentInfo = async (req: Request, res: Response) => {
  try {
    // GET paymentInfo to check if payment is successful
    const { transferCode } = req.query;
    // GET token
    const tokenResponse = await get("", "/token", { email: transferCode });
    if (tokenResponse.error) {
      return res.status(tokenResponse.status || 500).json({
        message: tokenResponse.data,
      });
    }
    const token = tokenResponse.data as string;

    const paymentInfoResponse = await get(token, "/payment", {
      email: transferCode,
      transferCode: transferCode,
    });

    if (paymentInfoResponse.error) {
      return res.status(paymentInfoResponse.status || 500).json({
        message: paymentInfoResponse.data || "Something went wrong",
      });
    }
    const { data: paymentInfoData } =
      paymentInfoResponse as PaymentDataResponse;

    res.status(200).json(paymentInfoData);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Something went wrong",
    });
  }
};
