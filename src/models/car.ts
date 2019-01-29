import { setFlagsFromString } from "v8";

class Car {
    private initialValue: number = 0;
    private age: number = 0;
    private mileage: number = 0;
    private previousOwnerCount: number = 0;
    private mostRecentValuation: number = 0;
    private collisionCount: number = 0;
    
    constructor(initValue: number, age: number, mileage: number, previousOwnerCnt: number, collisionCount: number) {
        this.initialValue = initValue;
        this.age = age;
        this.mileage = mileage;
        this.previousOwnerCount = previousOwnerCnt;
        this.collisionCount = collisionCount;
        this.mostRecentValuation = this.initialValue;
    }

    public getValuation(): number {
        return this.mostRecentValuation;
    }

    /**
     * Perform car value calucations based on defined criteria
     */
    public calculateValue(): void {
        this.updateBasedOnAge();
        this.updateBasedOnMiles();

        //TODO - Check back with BU to determine if this weird edge case of 1 previous owner having no changes is correct
        if ( this.previousOwnerCount >= 2) {
            this.applyNegativePreviousOwnerCountAdjustment();
            this.updateBasedOnCollisionCount();
        } else if ( this.previousOwnerCount != 1 ) {
            this.updateBasedOnCollisionCount();
            this.applyPositivePreviousOwnerCountAdjustment();
        } else {
            this.updateBasedOnCollisionCount();
        }
    }

    /**
     * Update the valuation based on the number of months old a car us, with an upper limit of 120 months
     * This puts an upper bound of 60% value reduction: 120 months = .5 * 120
     */
    private updateBasedOnAge(): void {
        // 10 years = 120 months
        let maxCycles = 120;
        if ( this.age > 120 ) {
            console.log("Removing " + (0.005 * maxCycles * 100 ) + " percent from " + this.mostRecentValuation);
            this.mostRecentValuation = ( this.initialValue - ( (0.005 * maxCycles ) * this.initialValue ));
        } else {
            console.log("Removing " + (0.005 * this.age * 100 ) + " percent from " + this.mostRecentValuation);
            this.mostRecentValuation = ( this.initialValue - ( (0.005 * this.age ) * this.initialValue ));
        }
    }

    /**
     * Update the valuation based on how many miles the car has with an upper dep cap of 150k
     * This puts an upper bound of: 30% = .002 * 150
     */
    private updateBasedOnMiles(): void {
        let maxCycles = 150;
        if ( this.mileage / 1000 > maxCycles ) {
            console.log("Removing " + (0.002 * maxCycles * 100 ) + " percent from " + this.mostRecentValuation);
            this.mostRecentValuation = ( this.mostRecentValuation - ( ( .002 * maxCycles ) * this.mostRecentValuation));
        } else {
            console.log("Removing " + (0.002 * (this.mileage/1000) * 100 ) + " percent from " + this.mostRecentValuation);
            this.mostRecentValuation = ( this.mostRecentValuation - ( ( .002 * (this.mileage / 1000) ) * this.mostRecentValuation));
        }
    }

    /**
     * If the car has had 2 or more previous owners, htere is a 25% penalty
     */
    private applyNegativePreviousOwnerCountAdjustment(): void {
        console.log("Removing " + (0.25 * 100 ) + " percent from " + this.mostRecentValuation);
        this.mostRecentValuation = ( this.mostRecentValuation - ( .25 * this.mostRecentValuation ) );
    }

    /**
     * Grant a ten percent increase to value based on the number of previous owners
     */
    private applyPositivePreviousOwnerCountAdjustment(): void {
        console.log("Adding " + (0.1 * 100 ) + " percent to " + this.mostRecentValuation);
        this.mostRecentValuation = ( this.mostRecentValuation + ( .10 * this.mostRecentValuation ) ) ;
    }

    /**
     * Update the valuation based on the number of collision up to 10% ( 5 collision cap )
     */
    private updateBasedOnCollisionCount(): void {
        let maxCycles = 5;
        if ( this.collisionCount > maxCycles ) {
            console.log("Removing " + (0.02 * maxCycles * 100 ) + " percent from " + this.mostRecentValuation);
            this.mostRecentValuation = ( this.mostRecentValuation - ( ( .02 * maxCycles ) * this.mostRecentValuation ));
        } else {
            console.log("Removing " + (0.02 * this.collisionCount * 100 ) + " percent from " + this.mostRecentValuation);
            this.mostRecentValuation = ( this.mostRecentValuation - ( ( .02 * this.collisionCount ) * this.mostRecentValuation ));
        }
    }
}

export default Car;