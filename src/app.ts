import * as express from "express";
import * as bodyParser from "body-parser";
import * as valuationRoutes from "./routes/valuations"
import {check} from "express-validator/check";

export class App {
    // Main Express JS App
    public app: express.Application;

    constructor() {
        // Setup the app
        this.app = express();
        // Run the config function
        this.config();
        // Setup routes
        this.configureRoutes(this.app);
    }

    public configureRoutes(app: express.Application): void {
        app.post("/api/v1/valuation", 
        [
            check('age').isNumeric().isInt(),
            check('initial_value').isNumeric(),
            check('mileage').isNumeric().isInt(),
            check('previous_owner_count').isNumeric().isInt(),
            check('collision_count').isNumeric().isInt()
        ], valuationRoutes.createValuation);
    }

    private config(): void{
        // support application/json type post data
        this.app.use(bodyParser.json());
        //support application/x-www-form-urlencoded post data
        this.app.use(bodyParser.urlencoded({ extended: false }));
    }

}

export default new App().app;