
var schedule = require('node-schedule');
 
var j = schedule.scheduleJob('36 * * * *', function(){
  console.log('The answer to life, the universe, and everything!');
});
console.log('Tkdfjkdjfdsjlf')
module.exports = schedule