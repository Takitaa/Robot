//devB for tests!
//console.log('you can test!');

'use strict';

async function main(tank) {
	//****************VARIABLES**************************
	//let scanAngle = [30, 60, 90, 120]; //forEach possible to build? + `` literals

	let getX = await tank.getX();
	let getY = await tank.getY();

	let lastPosition = 0;

	//***************************************************

	///////////////////////// auxiliary functions

	async function fireLeftOrRight(tank) {
		let dir = 0;
		if (Math.random() > 0.5) {
			dir = 180;
		}
		await tank.shoot(dir, 700);
	}

	/////////////////////////////////////////////

	// """""""""""""" MAIN LOOP """"""""""""""""""""

	while (true) {
		//(Math.atan2(getY, getX) * 180) / Math.PI;

		lastPosition = [await tank.getX(), await tank.getY()];
		//console.log(lastPosition);

		switch (tank) {
			case 'bottom':
				if (getY < 300 && getX < 1000) {
					await tank.drive(180, 50);
				}
				break;

			case '2':
				if (getX > 300 && getY < 1000) {
					await tank.drive(180, 50);
				}
				break;

			case '3':
				if (getX < 100 && getY < 800) {
					await tank.drive(180, 50);
				}
				break;
			default:
				break;
		}

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
