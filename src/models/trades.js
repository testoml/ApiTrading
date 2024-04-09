const mongoose = require("mongoose");

const tradeSchema = mongoose.Schema({
    date:{
        type: String, 
        required: true
    }, 
    amount:{
        type: Number,
        required: true
    },
    win:{
        type: Boolean,
        required:true
    },
    payaout:{
        type: Number,
        required: true,
    },
    profit:{
        type: Number,
        required: false
    },
    assert:{
        type: String, 
        required: false
    }
});


module.exports = mongoose.model('Trade', tradeSchema);