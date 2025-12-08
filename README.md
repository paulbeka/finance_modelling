## What is this project?

In this project, I've added a few of the most interesting calculations I've come across on my journey to become a quant developer. Since leaving my job at Goldman Sachs, I've been laser focused on learning everything about financial technology & quantitative development. 

The code is deployed on the following url: [https://`www.paulbekaertprojects.com]

## Instructions - Frontend

In the frontend directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.


## Instructions - Backend

The backend uses FastAPI. After creating a new Python environment and having run `pip install -r requirements.txt`, run the application using 
following command: `uvicorn app.main:app`

## TODO

 - Add the dividend rate to the slow binomial calculator
 - consider a black-scholes mini heatmap with PnL
 - LSMC for the Monte-Carlo pricing model for American options (early puts or negative r for calls)
 - Create a stock protfolio MC simulator 
 
 - make sure the website displays correctly for mobile
 - Change the font 
 - Create little explainer boxes to talk about the math and motivation for each project

 - build end-to-end frontend tests
 - Add the testing phase of the github action
 