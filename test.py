import math
import numpy
gravConst = 6.67430 * 10**(-11)
timeInt = 0.1
earthMass = 5.972 * 10**(24)
mass = 50
def currentPos(vx, vy, x, y):
    dist = (x**2 + y**2)**0.5
    acceleration = gravConst * earthMass / (dist**2)
    angle = math.atan(x/y)
    xAccel = math.sin(angle) * acceleration * numpy.sign(x) * -1
    yAccel = math.cos(angle) * acceleration * numpy.sign(y) * -1
    deltaX = (xAccel * (timeInt**2) / 2 + vx * timeInt)
    deltaY = (yAccel * (timeInt**2) / 2 + vy * timeInt)
    vx = 2 * deltaX / timeInt - vx
    vy = 2 * deltaY / timeInt - vy
    x += deltaX
    y += deltaY
    return vx, vy, x, y

def multipleCalc(iniVX, iniVY, iniX, iniY):
    for i in range(0,10000):
        currentValues = currentPos(iniVX, iniVY, iniX, iniY)
        iniVX = currentValues[0]
        if (iniVX**2 + iniVY**2)**0.5 > 3 * 10**8:
            print("Collision!")
            break
        iniVY = currentValues[1]
        iniX = currentValues[2]
        iniY = currentValues[3]
        print(iniVX, iniVY, iniX, iniY)

multipleCalc(100,0,0,6471000)