var mongoose=require('mongoose');
var Schema = mongoose.Schema;

var projectSchema=new Schema({
    name:{type:String,required:true,unique:true},
    url:{type:String,required:true,unique:true},
    company_Id : {type:String}
    
    
});



var project =  module.exports=mongoose.model('Project',projectSchema);

module.exports.addproject = function(project,callback){
  
    project.save(callback);

 }

module.exports.getProjectByName  = function(name,callback){
  
    const query = {name:name};
    project.findOne(query, callback);
};