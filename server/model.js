const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/mymongo', {useNewUrlParser: true});

const models={
    user:{
       'user':{'type':String,'require':true},
       'pwd':{'type':String,'require':true},
       'type':{'type':String,'require':true},
       'avatar':{'type':String},
        'desc':{'type':String},
        'title':{'type':String},
        'company':{'type':String},
        'money':{'type':String},
    },
    chat:{
     'chatid':{'type':String,require:true},
     'from':{'type':String,require:true},
     'to':{'type':String,require:true},
     'read':{'type':Boolean,default:false},
     'content':{'type':String,require:true,default:''},
     'create_time':{'type':Number,require:true}
    }

}
for(let m in models){
    mongoose.model(m, new mongoose.Schema(models[m]))
  
}

module.exports = {
	getModel:function(name){
		return mongoose.model(name)
	}
}