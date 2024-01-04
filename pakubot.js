function bot() {
    const dir = (enemy.x > player.x) ? 1 : -1;
    const nearWall = enemy.x < 5 || enemy.x > 95;
    const playerNearWall = player.x < 5 || player.x > 95;
    const powerUpRemaining = powerTicks;
    const baseDistance = 10;
    const distanceToEnemy = Math.abs(player.x - enemy.x);
    const playerSpeed = 0.5 * difficulty;
    const canReachEnemy = (distanceToEnemy / playerSpeed) <= powerUpRemaining;
    const powerUpAlmostOver = powerTicks < 10 && powerTicks > 0;
    const enemyJustDefeated = enemy.eyeVx !== 0;

    let turnDistance;
    if (powerUpRemaining > 10 && canReachEnemy) {
        turnDistance = 0;
    } else if (powerUpAlmostOver && enemyJustDefeated) {
        reverseDirection();
    } else {
        if (nearWall && playerNearWall) {
            turnDistance = 15;
        } else {
            turnDistance = (dir == 1 ? player.x / 7 : ((100 - player.x) / 7)) + baseDistance;
        }
    }

    if (player.vx == dir && distanceToEnemy < turnDistance && enemy.eyeVx == 0) {
        reverseDirection();
    } else if (enemyJustDefeated) {
        moveTowardsCenter();
    }
}

function moveTowardsCenter() {
    const center = 50;
    if (Math.abs(player.x - center) > 5) {
        const shouldMoveToCenter = (player.x > center && player.vx > 0) || (player.x < center && player.vx < 0);
        if (shouldMoveToCenter) {
            reverseDirection();
        }
    }
}

function reverseDirection() {
    document.dispatchEvent(new KeyboardEvent('keydown', {code: 'ArrowUp'}));
    document.dispatchEvent(new KeyboardEvent('keyup', {code: 'ArrowUp'}));
}

setInterval(bot, 1);
