import express, { Request, Response } from "express";
import FinancialRecordModel from "../Schema/financial-record"; // Ensure this path is correct
const router = express.Router();

router.get("/getAllByUserID/:userId", async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const records = await FinancialRecordModel.find({ userId: userId });

    if (records.length === 0) {
      return res.status(404).send("No records are found for the user");
    }

    res.status(200).send(records);
  } catch (err) {
    res.status(500).send("An error occurred while retrieving records");
  }
});

router.post("/", async (req: Request, res: Response) => {
  try {
    const newRecordBody = req.body;
    console.log(newRecordBody);
    const newRecord = new FinancialRecordModel(newRecordBody);
    const savedRecord = await newRecord.save();
    res.status(200).send(savedRecord);
  } catch (err) {
    console.log(err);
    res.status(500).send("An error occurred while retrieving records");
  }
});

router.put("/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const newRecordBody = req.body;
    const record = await FinancialRecordModel.findByIdAndUpdate(
      id,
      newRecordBody,
      { new: true }
    );
    if (!record) return res.status(404).send();
    res.status(200).send(record);
  } catch (err) {
    res.status(500).send("An error occurred while retrieving records");
  }
});

router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const record = await FinancialRecordModel.findByIdAndDelete(id);
    if (!record) return res.status(404).send();
    res.status(200).send(record);
  } catch (err) {
    res.status(500).send("An error occurred while retrieving records");
  }
});

export default router;
