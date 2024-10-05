class SpaceObjects {
  constructor(VoX_, VoY_, x_, y_, mass_) {
    this.Vo = [VoX_, VoY_];
    this.pos = [x_, y_];
    this.mass = mass_;
    this.r = CalculateDistance(this.pos);
  }
}

const x = 0;
const y = 1;
const squared = 2;
const EarthsMass = 5.972;
const GravitationalC = -6.674;

function CalculateDistance(pos) {
  return Math.sqrt(pos[x] ** 2 + pos[y] ** 2);
}

//5.972 × 10^24
function Trajectory(spaceobj) {
  const mass = spaceobj.mass;
  let trajectory = [];

  for (let i = 0; i < 100; i++) {
    trajectory.push([]);


    let accelaration = 1 / spaceobj.r ** squared;
    let angle = Math.atan(spaceobj.pos[y]/spaceobj.pos[x]);
    let xAcceleration = accelaration * Math.cos(angle)
    let yAcceleration = accelaration *Math.sin(angle)

    //finds delta x,y
    trajectory[i][x] = (spaceobj.Vo[x] + xAcceleration / squared);
    trajectory[i][y] = (spaceobj.Vo[y] + yAcceleration / squared);
   
   
    spaceobj.r = CalculateDistance(trajectory[i]);
    spaceobj.pos[x] += trajectory[i][x];
    spaceobj.pos[y] += trajectory[i][y];

    spaceobj.Vo[x] += xAcceleration; 
    spaceobj.Vo[y] += yAcceleration;
  }
  return trajectory;
}

