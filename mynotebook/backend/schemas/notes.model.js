const { Schema, mongoose } = require("mongoose");

const noteSchemas = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    tag: {
        type: String,
        default:'general',
    },
    image:{
        type:String,
        default:'https://images.pexels.com/photos/636237/pexels-photo-636237.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',

    },
    createdby:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
    }
}, { timestamps: true })

const Note = mongoose.model('Note', noteSchemas);
module.exports = Note;