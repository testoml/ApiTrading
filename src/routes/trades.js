const e = require("express");
const mongoose = require("mongoose");
const tradeSchema = require("../models/trades");
const moment = require('moment');

const router = e.Router();

//create trade
router.post('/trades', (req, res) => {
    const trade = tradeSchema(req.body);
    // Validate the trade data
    const errors = validateTradeQuery(trade);
    if (errors.length > 0) {
        return res.status(400).json({ errors });
    };
    trade.save()
        .then((data) => { res.json(data) })
        .catch((error) => res.status(500).json({ message: error }))
});

//get all trades
router.get('/trades', (req, res) => {
    tradeSchema.find()
        .then((data) => { res.json(data) })
        .catch((error) => res.status(500).json({ message: error }))
})

//get trade by id
router.get('/trades/:id', (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'Invalid trade ID' });
    }
    tradeSchema.findById(id)
        .then((data) => {
            if (!data) {
                return res.status(404).json({ error: 'Trade not found' });
            }
            res.json(data)
        })
        .catch((error) => res.status(500).json({ message: error }))
});

//update a trade
router.put('/trades/:id', (req, res) => {
    const { id } = req.params;
    const { date, amount, win, payaout, profit, assert } = req.body;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'Invalid trade ID' });
    }
    const errors = validateTradeQuery(req.query);
    if (errors.length > 0) {
        return res.status(400).json({ errors });
    };
    tradeSchema
        .updateOne({ _id: id }, { $set: { date, amount, win, payaout, profit, assert } })
        .then((data) => {
            if (!data) {
                return res.status(404).json({ error: 'Trade not found' });
            }
            res.json(data)
        })
        .catch((error) => res.status(500).json({ message: error }))
});

//delete a trade
router.delete("/trades/:id", (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'Invalid trade ID' });
    }
    tradeSchema
        .deleteOne({ _id: id })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

const isValidNumber = function(number){
    return typeof value === 'number';
}

// Function to validate request parameters based on schema
function validateTradeQuery(query) {
    const errors = [];
    // Example validation rules, adjust as needed
    const isValidDate = moment(query.date, "DD-MMM-YYYY HH:mm:ss", true).isValid();
    if(!isValidDate){
        errors.push('Date has not the correct format');
    }
    if (typeof query.amount !== "number"){
        errors.push('Amount must be a number');
    }
    if (typeof query.win !== 'boolean') {
        errors.push('Win must be a boolean');
    }
    if (typeof query.payaout !== "number") {
        errors.push('Payaout must be a number');
    }
    return errors;
}

module.exports = router;