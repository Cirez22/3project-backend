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
        }
        
    }
);

module.exports = model('Post' , PostSchema);