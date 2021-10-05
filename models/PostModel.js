const {model, Schema} = require('mongoose');

const PostSchema = Schema (
    {
        title:{
            type: String,
            require: true,
        },
        description:{
            type: String,
            require: true
        },
        user: {
            type: Schema.Types.ObjectId,
            ref:"User"
        },
        bid:{
            type: Number
        },
        accepted:{
            type: Boolean,
            default: false
        }
       
    }
);

module.exports = model('Post' , PostSchema);