interface IParkingSpace {
    availableSpase: number
    cars: number[]
    addCar: (carType: number) => boolean
}

class ParkingSpace implements IParkingSpace {
    availableSpase: number
    cars: number[]
    constructor(size: number) {
        this.availableSpase = size
        this.cars =[]
    }

    addCar(car: number) {
        if(this.availableSpase) {
            this.cars.push(car)
            this.availableSpase--
            return true
        } else {
            return false
        }
    }
}

interface IParkingSystem {
    bigSpace: IParkingSpace
};

class ParkingSystem implements IParkingSystem {
    bigSpace: IParkingSpace
    mediumSpace: IParkingSpace
    smallSpace: IParkingSpace
    constructor(big, medium, small) {
        this.bigSpace = new ParkingSpace(big)
        this.mediumSpace = new ParkingSpace(medium)
        this.smallSpace = new ParkingSpace(small)
    }

    addCar(carType) {
        switch(carType) {
            case 1:
                return this.bigSpace.addCar(carType)
            case 2:
                return this.mediumSpace.addCar(carType)
            case 3:
                return this.smallSpace.addCar(carType)
            default:
                return false
        }
    }
}


/**
 * Your ParkingSystem object will be instantiated and called as such:
 * var obj = new ParkingSystem(big, medium, small)
 * var param_1 = obj.addCar(carType)
 */