const mongoose = require('mongoose');
const todoSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,
    status: {
        type: String,
        enum: ['active', 'inactive'],
    },
    date: {
        type: Date,
        default: Date.now,
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    }
});
//instance method
todoSchema.methods = {
    findActive: function () {
        return mongoose.model("Todo").find({status: "active"});
    },
};

//statics method

todoSchema.statics = {
    findByJS: function () {
        return this.find({title: /js/i });
    },
};

//query helpers
todoSchema.query = {
    byLanguage: function (language) {
        return this.find({title: new RegExp(language, 'i') });
    },
};

module.exports = todoSchema;