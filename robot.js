//devB for tests! reverting
//console.log('you can test!');

'use strict';

async function main(tank) {
	//****************VARIABLES**************************
	//let scanAngle = [30, 60, 90, 120]; //forEach possible to build? + `` literals
	// let spinAround = (scan) = {
	// }

	//let driving = () => {if (Math.floor(Math.random() * 2) === 0) {
	//horizontalVelocity = -horizontalVelocity}; WAS IN USE in BROKEN code

	//	let randomAngle = ((Math.atan2(getY, getX) * 60) / Math.PI) * 2; // then changed to 92
	//	let changeDirection = getX - getY

	//initialPosition

	let route;

	let getX = await tank.getX();
	let getY = await tank.getY();

	let lastPosition = 0;
	let newDirection = 0; // currently not working

	let getSpeed = await tank.getSpeed();
	let turningSpeed = 50;

	let getDamage = await tank.getDamage();

	let tankLife = 100;
	let damageBorder = 10;
	let damageBump = 5;
	let damageShot = 25;

	let delay = 800;

	const canvasX = 1340;
	const canvasY = 1000;

	const canvasMiddleX = canvasX / 2;
	const canvasMiddleY = canvasY / 2;

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

	// async function justShoot(tank){
	// 	setInterval((tank) => {
	// 		(await tank.shoot(270, 400));
	// 	}, delay);
	// }

	async function stopToTurn(tank) {
		while (getSpeed > turningSpeed) {
			await tank.drive(0, 0);
			//console.log('I stopped to turn');
		}
	}

	/////////////////////////////////////////////

	// """""""""""""" MAIN LOOP """""""""""""""""""""""""""""""""""""""""""""""""""""""""""""

	while (true) {
		if (getDamage >= 25) {
			do {
				await tank.drive(0, 0);
				await tank.shoot(350, 700);
				//await fireLeftOrRight(tank);
			} while (tankLife >= 70);
		}

		do {
			await tank.drive(0, 0);
			await tank.shoot(350, 700);
			await tank.shoot(300, 700);
			await tank.shoot(400, 700);
			await tank.shoot(350, 700);
		} while (tankLife <= 70);

		console.log(getDamage);
		newDirection = (Math.atan2(getY, getX) * 180) / Math.PI;

		lastPosition = [await tank.getX(), await tank.getY()];
		console.log(lastPosition);

		if (route < canvasX - 20 || route < canvasY - 20) {
			await tank.drive(direction, 90);
		}

		await tank.scan(30, 10);
		await tank.scan(60, 10);
		await tank.scan(90, 10);
		await tank.scan(100, 7);
		await tank.scan(180, 10);
		await tank.scan(220, 10);

		await stopToTurn(tank);

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
			// >69 starts first and stops at border top

			await tank.scan(120, 10);
			await tank.scan(180, 10);
			await tank.scan(320, 10);

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
		while ((await tank.getY()) < 100) {
			await tank.drive(270, 90);
		}

		// shoot
		await tank.shoot(90, 700);
		await fireLeftOrRight(tank);

		await stopToTurn();
	} //end loop
} //end MAIN

// crazy
// class MyTank extends TankHandler{
// 	constructor(driver, tank, rotation){
// 		this.rotation = rotation
// 		console.log(this)
// 	}
// }
//

// async function bottomBorder(tank) {
// 	if (centerVerticalY >= canvasHeight - 140) {
// 		direction = driving - driving * 2;
// 		return direction;
// 	}
// }

// the borders plan...
// if ((borders = true)) {
// 	return changeDirection;
// 	//console.log(changeDirection)
// }
