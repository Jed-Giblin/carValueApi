Car Valuation API


This API can be used to generate teh value of a car based on a set of factors:

1. Age
2. Mileage
3. Number of Previous Owners
4. Number of Collisions

# Software used
- express
- chai
- chai-http
- mocha
- typescript
- nodemon

# Installation
To install, you can begin by running `npm install`. This should download all the dependencies.

Next, you can start the server using `npm run prod` to start the server in production mode or `npm run dev` to start it in dev mode. You can also set the port if you don't want to use the default 3000 by running `NODE_PORT=3001 npm run dev`

Thats it! You can begin interacting with the API.


## Endpoints
`POST /api/v1/valuation`


This endpoint can be used to generate a valuation. You will need to provide it with a JSON body:
```
{ 
    "initial_value": int,
    "number_of_collisions": int,
    "age": int,
    "mileage":int,
    "previous_owner_count":int
}
```

Fields:
<table>
<tr>
  <td>initial_value</td><td> The value of your car to be used as the starting calculation </td>
  </tr>
  <td>number_of_collisions</td> <td>The number of collisions on the vehicle</td>
   </tr>
  <td>age</td><td> The number of months old the car is</td>
   </tr>
  <td>mileage</td><td>How many miles are on the car</td>
   </tr>
  <td>previous_owner_count</td><td> Excluding you, how many previous owners were there</td>
   </tr></table>