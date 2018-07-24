const Ramda = require('Ramda');

const rand = ({ high, low }) => Math.random() * (high - low) + low;


const createRandomPoint = ({ Y_MAX, X_MAX, Y_LOW = 0, X_LOW = 0 }) => ({
  x: rand({ low: X_LOW, high: X_MAX }),
  y: rand({ low: Y_LOW, high: Y_MAX })
})
const weights = createRandomPoint({ Y_MAX: 1, X_MAX: 1, X_LOW: -1, Y_LOW: -1 });


const randomPoints = Ramda.range(0, 100).map(() => createRandomPoint({ Y_MAX: 400, X_MAX: 400 }));

const getTeamForPoint = ({ x, y }) => x > y ? 1 : -1;
const guessTeamForPoint = ({ weights, point: {x, y} }) => {
  const sum = x * weights.x + y * weights.y;
  const team = sum >= 0 ? 1 : -1;
  return team;
}



function train({ weights, point, actualTeam }) {
  const guessResult = guessTeamForPoint({ weights, point });
  const error = actualTeam - guessResult;
  return {
    x: weights.x + (point.x * error),
    y: weights.y + (point.y * error)
  };
}

const testTrain = () => {
  const point = { x: 200, y: 400};
  return train({ weights, point, actualTeam: getTeamForPoint(point)});
}

const trainedWeights = () => {
  let trainedWeights;
  trainedWeights = train({ weights, point: randomPoints[0], actualTeam: getTeamForPoint(randomPoints[0])});
  trainedWeights = train({ weights, point: randomPoints[1], actualTeam: getTeamForPoint(randomPoints[1])});
  trainedWeights = train({ weights, point: randomPoints[2], actualTeam: getTeamForPoint(randomPoints[2])});
  trainedWeights = train({ weights, point: randomPoints[3], actualTeam: getTeamForPoint(randomPoints[3])});
  trainedWeights = train({ weights, point: randomPoints[4], actualTeam: getTeamForPoint(randomPoints[4])});
  return trainedWeights;
}

console.log(trainedWeights());