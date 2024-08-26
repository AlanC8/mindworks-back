import { Router } from "express";
import TestMind from "./model";

const testMindRouter = Router();

testMindRouter.post("/test", async (req, res) => {
  try {
    const testData = [
      {
        questions:
          "How often does the person forget where they put common items like keys or glasses?",
        options: ["Rarely", "Occasionally", "Frequently", "Almost always"],
      },
      {
        questions:
          "When recalling recent events or conversations, how accurate are they?",
        options: [
          "Very accurate",
          "Mostly accurate",
          "Sometimes accurate",
          "Rarely accurate",
        ],
      },
      {
        questions:
          "How often do they forget important dates, like birthdays or anniversaries?",
        options: ["Rarely", "Occasionally", "Frequently", "Almost always"],
      },
      {
        questions:
          "When faced with a choice between two similar items, how often do they struggle to remember which one they prefer?",
        options: ["Rarely", "Occasionally", "Frequently", "Almost always"],
      },
      {
        questions:
          "Do they often rely on reminders or notes to remember important tasks or information?",
        options: ["Never", "Rarely", "Sometimes", "Always"],
      },
      {
        questions:
          "How often do they struggle to remember recent conversations or events when asked about them later?",
        options: ["Rarely", "Occasionally", "Frequently", "Almost always"],
      },
      {
        questions: `Please note the following numbers: [8152639],
          Please enter the numbers that were shown`,
        options: ["8152639, 8152631, 8152633, 8152636"],
      },
      {
        questions: `Please note the following numbers: [539847261],
          Please enter the numbers that were shown`,
        options: ["539347261, 539847267, 539847269, 539847263"],
      },
    ];
    const savedTasks = await TestMind.insertMany(testData);
    res.status(201).json(savedTasks);
  } catch (error) {
    res.status(500).json({ message: "Error saving test data" });
  }
});

testMindRouter.get("/get-test", async (req, res) => {
  try {
    const test = await TestMind.find();
    res.status(200).json(test);
  } catch (error) {
    res.status(500).json({ message: "Error getting test data" });
  }
});

export default testMindRouter;
