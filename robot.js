//devB for tests!
//console.log('you can test!');

'use strict';

async function main(tank) {
	//****************VARIABLES**************************
	//let scanAngle = [30, 60, 90, 120]; //forEach possible to build? + `` literals

	let getX = await tank.getX();
	let getY = await tank.getY();

	let lastPosition = 0;
	let newDirection = 0; // currently not working

	let getSpeed = await tank.getSpeed();
	let shootingSpeed = 50;

	let delay = 800;




	// const borders = {
	// 	borderTopXLeft= 90,
	// 	borderTopXRight= 90,
	// 	borderBottomXLeft = -900,
	// 	borderBottomXLeft= 90,
	// 	borderTopY = 10,
	// 	borderBottomY = 840,
	// };

	//***************************************************

	///////////////////////// auxiliary functions

	async function fireLeftOrRight(tank) {
		let dir = 0;
		if (Math.random() > 0.5) {
			dir = 180;
		}
		await tank.shoot(dir, 700);
	}


	async function justShoot(tank){
		setInterval((tank) => {
			await tank.shoot(270, 400);
		}, delay);
	}


		async function stopToShoot(tank) {
		while (getSpeed > shootingSpeed) {
			await tank.drive(0, 0);
		}
	}


	/////////////////////////////////////////////

	// """""""""""""" MAIN LOOP """"""""""""""""""""

	while (true) {
		newDirection = (Math.atan2(getY, getX) * 180) / Math.PI;

		lastPosition = [await tank.getX(), await tank.getY()];
		console.log(lastPosition);

		switch (tank) {
			case 'bottom':
				if (getY < 300 && getX < 1000) {
					await tank.drive(90, 50);
				}
				break;

			case '2':
				if (getX > 300 || getY < 1000) {
					await tank.drive(180, 50);
				}
				break;

			case '3':
				if (getX > 300 || getY < 800) {
					await tank.drive(180, 50);
				}
				break;

				// case '4':
			// 	if (getX < 70 && getY < 1000) {
			// 		await tank.drive(30, 70);
			// 	}
			// 	break;

			// case '5':
			// 	if (lastPosition < [100, 90]) {
			// 		await tank.drive(randomAngle, 30);
			// 	}
			// 	break;

			// case '6':
			// 	if (lastPosition > [100, 90]) {
			// 		await tank.drive(randomAngle, 90);
			// 	}
			// 	break;


			default:
				await tank.drive(newDirection, 50);
		}

		// GO UP
		while ((await tank.getY()) < 339) {
			await tank.drive(90, 70);

			if (getX <= 880) {
				await tank.drive(65, 60);
				//console.log('If is working');
			}
		}



		// shoot
		await tank.shoot(270, 700);
		await fireLeftOrRight(tank);

		// GO down
		while ((await tank.getY()) > 100) {
			await tank.drive(270, 90);
		}

		// shoot
		await tank.shoot(90, 700);
		await fireLeftOrRight(tank);


		await stopToShoot();
	} //end loop
} //end MAIN
