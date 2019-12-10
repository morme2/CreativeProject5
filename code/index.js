const express = require('express');
const bodyParser = require("body-parser");
var cors = require('cors')


const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(express.static('public'));

const mongoose = require('mongoose');

// connect to the database
mongoose.connect('mongodb://localhost:27017/budget', {
  useNewUrlParser: true
});

const budgetSchema = new mongoose.Schema({
  name: String,
  budget: Number,
  items: [{eName: String, eMoney: Number}]
});

const Budget = mongoose.model('Budget', budgetSchema);


let tickets = [];
let id = 0;


// Create a new budget in the db
app.post('/budget', async (req, res) => {
  const newBudget = new Budget({
    name: req.body.name,
    budget: req.body.budget,
    items: req.body.items,
  });
  try {
    await newBudget.save();
    res.send(newBudget);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// Get a list of all of the items in the museum.
app.get('/budget', async (req, res) => {
  try {
    let newBudget = await Budget.find();
    res.send(newBudget);
    console.log(newBudget);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});


app.listen(4205, () => console.log('Server listening on port 4205!'));
