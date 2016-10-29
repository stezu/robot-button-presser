const nodeStream = require('node-stream');

// Remove the first item in the line and also remove empty lines.
function removeUnnecessaryData(line, next) {
  const newData = line.replace(/^\w+\s?/, '');

  next(null, newData ? newData : undefined);
}

// Split lines into robot moves.
function splitIntoMoves(line, next) {
  const newData = line.split(/\s/);
  const moves = [];

  while (newData.length) {
    moves.push({
      robot: newData.shift(),
      position: newData.shift()
    });
  }

  next(null, moves);
}

// Create a data structure that allows us to calculate the next
// position(s) of each robot as well as track the order of button
// presses and their current position.
function organizeMoves(testCase, next) {
  const data = {
    robots: {},
    buttonPresserOrder: []
  };

  // Loop through the test case and save all of the moves
  // the robots need to make.
  testCase.forEach((move) => {

    // Save the initial data for this robot
    if (!data.robots[move.robot]) {
      data.robots[move.robot] = {
        position: 1,
        nextSteps: []
      };
    }

    // Save the locations of the buttons for this robot
    data.robots[move.robot].nextSteps.push(Number(move.position));

    // Save the order of robots that needs to push buttons
    data.buttonPresserOrder.push(move.robot);
  });

  next(null, data);
}

// Given a list of buttons the robots need to push and the order
// they need to be pushed, calculate the minimum amount of time
// that it takes to push the buttons in the right order.
function calculateTime(testCase, next) {
  let timeSpent = 0;

  while (testCase.buttonPresserOrder.length) {
    let buttonPushed = false;

    timeSpent += 1;

    // Complete a turn for all of the robots, this will move them
    // if they need to be moved, wait if they shouldn't move or push
    // the button if it's their turn.
    Reflect.ownKeys(testCase.robots).forEach((robotName) => {
      const robot = testCase.robots[robotName];

      // Move the robot closer to it's desired position
      if (robot.position !== robot.nextSteps[0]) {
        let delta = (robot.position > robot.nextSteps[0]) ? -1 : 1;

        robot.position += delta;

        return;
      }

      // Push the button since this robot is in the right position
      if (
        !buttonPushed &&
        robotName === testCase.buttonPresserOrder[0] &&
        robot.position === robot.nextSteps[0]
      ) {
        buttonPushed = true;
        robot.nextSteps.shift();
        testCase.buttonPresserOrder.shift();

        return;
      }
    });
  }

  next(null, timeSpent);
}

// Format the output how the challenge expects it.
function logResults() {
  let caseNum = 0;

  return function tick(seconds, next) {
    caseNum++;

    const prefix = caseNum > 1 ? '\n' : '';
    const output = `${prefix}Case #${caseNum}: ${seconds}`;

    next(null, output);
  };
}

function run() {

  return nodeStream.pipeline(
    nodeStream.split(),
    nodeStream.map(removeUnnecessaryData),
    nodeStream.map(splitIntoMoves),
    nodeStream.map(organizeMoves),
    nodeStream.map(calculateTime),
    nodeStream.map(logResults())
  );
}

module.exports = run;
