import 'mocha';  
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import {server} from '../src/server';

chai.use(chaiHttp)

describe("valuations controller", () => {
    it("returns a 200 with default values", async () => {
        return chai.request(server).post(
            "/api/v1/valuation"
        ).set('content-type', 'application/json')    
        .send('{"initial_value": 100, "age": 0, "mileage": 0, "previous_owner_count": 0, "collision_count": 0 }')
        .then((res: ChaiHttp.Response) => {
            chai.expect(res).to.have.status(200);
        });
    });

    it("returns a 422 with incorrect valu", async () => {
        return chai.request(server).post(
            "/api/v1/valuation"
        ).set('content-type', 'application/json')
        .send('{}')
        .then((res: ChaiHttp.Response) => {
            chai.expect(res).to.have.status(422);
        });
    });

    it("returns can do basic math", async () => {
        return chai.request(server).post(
            "/api/v1/valuation"
        ).set('content-type', 'application/json')
        .send('{"initial_value": 100, "age": 2, "mileage": 0, "previous_owner_count": 0, "collision_count": 0 }')
        .then((res: ChaiHttp.Response) => {
            chai.expect(res.body).to.have.property("new_value").eq("108.90");
        });
    });

    it("returns can max everything out to be a worthless car", async () => {
        return chai.request(server).post(
            "/api/v1/valuation"
        ).set('content-type', 'application/json')
        .send('{"initial_value": 100, "age": 120, "mileage": 150000, "previous_owner_count": 5, "collision_count": 5 }')
        .then((res: ChaiHttp.Response) => {
            chai.expect(res.body).to.have.property("new_value").eq("18.90");
        });
    });
    
});