//devB for tests!
//console.log('you can test!');

'use strict';

async function main(tank) {
	//****************VARIABLES**************************
	//let scanAngle = [30, 60, 90, 120]; //forEach possible to build? + `` literals

	//***************************************************

	///////////////////////// auxiliary functions

	async function fireLeftOrRight(tank) {
		let dir = 0;
		if (Math.random() > 0.5) {
			dir = 180;
		}
		await tank.shoot(dir, 700);
	}

	// THIS WOULD BE GREAT FOR A BOTTOM BOUND SITUATION
	// async function scanSpin(tank) {
	// 	let i = 0;
	// 	do {
	// 		await tank.scan(30, 10);
	// 		await tank.scan(60, 10);
	// 		await tank.scan(90, 10);
	// 		await tank.scan(120, 10);
	// 	} while (i < 500);
	// }

	/////////////////////////////////////////////

	// """""""""""""" MAIN LOOP """"""""""""""""""""

	while (true) {
		//await scanSpin(tank);

		// GO UP
		while ((await tank.getY()) < 900) {
			await tank.drive(90, 50);
		}

		// shoot
		await tank.shoot(270, 700);
		await fireLeftOrRight(tank);

		// GO down
		while ((await tank.getY()) > 100) {
			await tank.drive(270, 50);
		}

		// shoot
		await tank.shoot(90, 700);
		await fireLeftOrRight(tank);
	}
}
