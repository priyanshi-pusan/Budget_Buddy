const IncomeSchema = require("../models/IncomeModel.js");

exports.addIncome = async (req, res) => {
  const { title, amount, category, description } = req.body;

  // const parseDate = new Date(date);
  const income = IncomeSchema({
    title,
    amount,
    category,
    description,
  });

  try {
    //checks
    if (!title || !category || !description) {
      return res.status(400).json({ message: "All fields are required!" });
    }
    if (amount <= 0 || !amount === "number") {
      return res
        .status(400)
        .json({ message: "Amount must be a positive number!" });
    }
    //add income
    await income.save();
    res.status(200).json({ message: "Income Added" });
  } catch (error) {
    console.error(error); // Log the error to the console for debugging
    res.status(500).json({ message: "Server Error", error: error.message }); // Send a more informative response
  }
  console.log(income);
};

exports.getIncomes = async (req, res) => {
  try {
    const incomes = await IncomeSchema.find().sort({ createdAt: -1 });
    res.status(200).json(incomes);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
exports.deleteIncome = async (req, res) => {
  const { id } = req.params;
  IncomeSchema.findByIdAndDelete(id)
    .then((income) => {
      res.status(200).json({ message: "Income Deleted" });
    })
    .catch((err) => {
      res.status(500).json({ message: "Server Error" });
    });
};
