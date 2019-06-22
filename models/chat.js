var mongoose = require('mongoose');

var ChatSchema = new mongoose.Schema({
  user_name: {type:String,required:false},
  project_Id : {type:String},
  project_name : {type:String},
  customer_email:{type:String,unique:true},
  status :{type:String},
  message:[{
    message:{type:String,required:false},
    sender:{type:String}
  }],
  
});


var chat = module.exports = mongoose.model('Chat', ChatSchema);


module.exports.getUserByEmail  = function(email,callback){
  const query = {customer_email:email};
  chat.findOne(query, callback);
};


