var mongoose=require('mongoose');
var Schema = mongoose.Schema;

var addTicketSchema=new Schema({
    url:{type:String,required:true,unique:false},
    name:{type:String,required:false,unique:false},
    email:{type:String,required:false,unique:false},
    subject:{type:String,required:false,unique:false},
    message:{type:String,required:false,unique:false},
    path:{type:String,required:false,unique:false}

    
    
});


module.exports=mongoose.model('addTicket',addTicketSchema);