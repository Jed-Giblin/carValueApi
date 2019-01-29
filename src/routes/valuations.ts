import { Request, Response } from 'express';
import {validationResult} from "express-validator/check";
import Car from '../models/car';

// Public API
/**
 * This method is used to create a new car valuation.
 * @param req The Incoming HTTP request
 * @param res The outgoing HTTP response to write
 */
export function createValuation(req: Request, res: Response): void {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(422).json({ errors: errors.array() });
        return;
    }

    let params = req.body;

    let newCar = new Car(params.initial_value, params.age, params.mileage, params.previous_owner_count, params.collision_count);
    newCar.calculateValue();

    res.status(200).json({ new_value: newCar.getValuation().toFixed(2) })
}