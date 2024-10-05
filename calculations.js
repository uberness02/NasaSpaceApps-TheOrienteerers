class SpaceObjects {
  constructor(VoX_,VoY_,x_,y_,mass_) {
    this.Vo = [VoX_, VoY_];
    this.pos = [x_, y_];
    this.mass = mass_;
    this.r = 0;
  }
}

const x = 0;
const y = 1;
const squared = 2;
const EarthsMass = 5.972 * (10**24);
const GravitationalC = 6.6743 * (10**-11);
const timeInt = 0.1;

function CalculateDistance(spaceobj) {
  

  let coordinates = [];
  for (let i = 0; i < 1000; i++){
    coordinates.push([]);

    
    coordinates[i][x] = spaceobj.pos[x];
    coordinates[i][y] = spaceobj.pos[y];
    

    spaceobj.r = (Math.sqrt(coordinates[i][x]**2 + coordinates[i][y]**2));
    let a = (GravitationalC * EarthsMass) / (spaceobj.r**2);
  
    let angle = Math.atan(spaceobj.pos[x]/ spaceobj.pos[y]);
    xAcceleration = Math.sin(angle) * a * Math.sign(spaceobj.pos[x]) *-1;
    yAcceleration = Math.cos(angle) * a * Math.sign(spaceobj.pos[y]) *-1;
  
    deltaX = (xAcceleration * (timeInt**2) /2 + spaceobj.Vo[x] * timeInt);
    deltaY = (yAcceleration * (timeInt**2) /2 + spaceobj.Vo[y] * timeInt);
  
    spaceobj.Vo[x] = ((spaceobj.Vo[x]**2) + 2 * xAcceleration * deltaX) **0.5 * -1;
    spaceobj.Vo[y] = ((spaceobj.Vo[y]**2) + 2 * yAcceleration * deltaY) **0.5 * -1;
    
    spaceobj.pos[x] += deltaX;
    spaceobj.pos[y] += deltaY;
  }
  console.log(coordinates);
}

//5.972 × 10^24
function Trajectory(spaceobj) {
  const mass = spaceobj.mass;
  let trajectory = [];

  for (let i = 0; i < 100; i++) {
    trajectory.push([]);


    let accelaration = EarthsMass*GravitationalC / (spaceobj.r ** squared);

    // console.log("a: " + a + " accelaration: " + accelaration);

    let angle = Math.PI + Math.atan(spaceobj.pos[y]/spaceobj.pos[x]);
    let xAcceleration = accelaration * Math.cos(angle);
    let yAcceleration = accelaration * Math.sin(angle);

    //finds delta x,y
    trajectory[i][x] = (spaceobj.Vo[x] + xAcceleration / 2);
    trajectory[i][y] = (spaceobj.Vo[y] + yAcceleration / 2);
   
   
    spaceobj.r = CalculateDistance(trajectory[i]);
    spaceobj.pos[x] += trajectory[i][x];
    spaceobj.pos[y] += trajectory[i][y];

    spaceobj.Vo[x] += xAcceleration/2; 
    spaceobj.Vo[y] += yAcceleration/2;
    console.log(spaceobj.r);
    console.log(accelaration);
  }
  return trajectory;
}