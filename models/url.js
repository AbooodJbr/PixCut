import mongoose from "mongoose";
import shortid from "shortid";

const urlSchema = new mongoose.Schema({
    full : {
        type : String,
        required : true,
        unique : true
    },
    short : {
        type : String,
        required : true,
        default : shortid.generate
    }
})

const Url = mongoose.model('Url', urlSchema)
export default Url