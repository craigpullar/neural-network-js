const Ramda = require('Ramda');

const rand = ({ high, low }) => Math.random() * (high - low) + low;


const createRandomPoint = ({ Y_MAX, X_MAX, Y_LOW = 0, X_LOW = 0 }) => ({
  x: rand({ low: X_LOW, high: X_MAX }),
  y: rand({ low: Y_LOW, high: Y_MAX })
});


const generatePoints = ({ count }) => Ramda.range(0, count).map(() => createRandomPoint({ Y_MAX: 400, X_MAX: 400 }));

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
    x: weights.x + point.x * error,
    y: weights.y + point.y * error
  };
}

const trainWeights = () => {
  const randomPoints = generatePoints({ count: 1000 })
  const startingWeights = createRandomPoint({ Y_MAX: 1, X_MAX: 1, X_LOW: -1, Y_LOW: -1 });
  const trainedWeights = randomPoints.map( point => ({
    point,
    actualTeam: getTeamForPoint(point)
  })).reduce((weights, { point, actualTeam }) => {
    const newWeights = train({ weights, point, actualTeam })
    console.log(newWeights);
    return newWeights;
  }, startingWeights);
  return trainedWeights;
}

const test = () => {
  const sampleSize = 200;
  const trainedWeights = trainWeights();
  const randomPoints = generatePoints({ count: sampleSize });

  const results = randomPoints.map((point) => ({
    actualTeam: getTeamForPoint(point),
    guess: guessTeamForPoint({ weights: trainedWeights, point })
  })).filter(({ actualTeam, guess}) => actualTeam === guess);

  console.log(`${results.length/sampleSize*100}%`);
}
test();