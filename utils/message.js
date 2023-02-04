const moment = require('moment');
 function formateMessage(username,msg){
    return{
        username:username,
        message:msg,
        time:moment().format('h:mm a')
    }
 }
 module.exports = formateMessage;