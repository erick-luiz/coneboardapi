
const schedule = require('node-schedule');
const Cone = require('../models/Cone')
const WinnerMonth = require('../models/WinnerMonth')

// * segundo (opcional)   *  minuto  *  hora  * dia do mês   * mês   * dia da semana
var j = schedule.scheduleJob('30 1 1 * *', function(){
	getWinnerCone();
});


const getWinnerCone = () => Cone.find({}, (err, cones) => {
	if(err) return;
	let currentMonth = new Date().getMonth();
	let passadMonth  = currentMonth == 0? 11: currentMonth - 1; 
	let max = 0;
	let winners = [];
	
	cones.forEach(c => {
		let conePoints = countPointsMonth(c.points, passadMonth);
		if(conePoints < max) return;

		if(conePoints > max){
			max = conePoints;
			winners = [];
		}
		
		winners.push(c);
	});

	registerWinners(winners, max);
	console.log(winners);
});

const countPointsMonth = (point, passadMonth) => {
	return point.filter(p => new Date(p.date).getMonth() == passadMonth).length
}

const registerWinners = (winners, points) => {

	let winnerMonth = new WinnerMonth({
		dateMonth: new Date().getMonth(),
		dateYear: new Date().getFullYear(), 
		points: points,
		cones: winners
	});

	winnerMonth.save(function(err, winnerMonth) {
        if(err) return; 
        console.log(winnerMonth);
    });				
}

console.log('\nAtivando scheduler de calculo de vencedor\n')
module.exports = schedule
