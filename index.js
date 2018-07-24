const Ramda = require('Ramda');

const rand = ({ high, low }) => Math.random() * (high - low) + low;


const createRandomPoint = ({ Y_MAX, X_MAX }) => ({
  x: rand({ low: 0, high: X_MAX }),
  y: rand({ low: 0, high: Y_MAX })
})
const weights = createRandomPoint({ Y_MAX: 1, X_MAX: 1 });


const randomPoints = Ramda.range(0, 100).map(() => createRandomPoint({ Y_MAX: 400, X_MAX: 400 }));

const getTeamForPoint = ({ x, y }) => x > y ? 1 : -1;
const guessTeamForPoint = ({ weights, point: {x, y} }) => {
  
}