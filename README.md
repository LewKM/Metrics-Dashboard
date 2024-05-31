# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Running the JSON Server Locally

To create a JSON API for the mock server, we'll use JSON Server to simulate the backend with the required data. This setup will help you develop and test the sales agent dashboard efficiently.

### Data Structure

The data is organized into the following sections:

1. **Collections**
2. **Sign-ups**
3. **Total Revenue**
4. **Bounced Cheques**
5. **Schools**
6. **Invoices**
7. **School Collections**

### Steps to Set Up JSON Server

Follow these steps to set up and run the JSON Server locally:

1. **Install JSON Server:**

   First, install JSON Server globally on your machine using npm. Open your terminal and run:

   ```bash
   npm install -g json-server
   ```

2. **Create a `db.json` File:**

   Create a file named `db.json` in your project directory and paste the JSON data structure into this file.

3. **Run JSON Server:**

   Start the JSON Server by running the following command in your terminal:

   ```bash
   json-server --watch db.json --port 4000
   ```

   This command starts a mock API server at `http://localhost:4000` with the specified endpoints.

### Available Endpoints

Once the server is running, you can access the following endpoints to interact with the mock data:

- **Collections:**
  - `GET /collections`
  - `GET /collections/:id`
  - `POST /collections`
  - `PUT /collections/:id`
  - `PATCH /collections/:id`
  - `DELETE /collections/:id`

- **Sign-ups:**
  - `GET /signUps`
  - `GET /signUps/:id`
  - `POST /signUps`
  - `PUT /signUps/:id`
  - `PATCH /signUps/:id`
  - `DELETE /signUps/:id`

- **Total Revenue:**
  - `GET /totalRevenue`
  - `GET /totalRevenue/:id`
  - `POST /totalRevenue`
  - `PUT /totalRevenue/:id`
  - `PATCH /totalRevenue/:id`
  - `DELETE /totalRevenue/:id`

- **Bounced Cheques:**
  - `GET /bouncedCheques`
  - `GET /bouncedCheques/:id`
  - `POST /bouncedCheques`
  - `PUT /bouncedCheques/:id`
  - `PATCH /bouncedCheques/:id`
  - `DELETE /bouncedCheques/:id`

- **Schools:**
  - `GET /schools`
  - `GET /schools/:id`
  - `POST /schools`
  - `PUT /schools/:id`
  - `PATCH /schools/:id`
  - `DELETE /schools/:id`

- **Invoices:**
  - `GET /invoices`
  - `GET /invoices/:id`
  - `POST /invoices`
  - `PUT /invoices/:id`
  - `PATCH /invoices/:id`
  - `DELETE /invoices/:id`

- **School Collections:**
  - `GET /schoolCollections`
  - `GET /schoolCollections/:id`
  - `POST /schoolCollections`
  - `PUT /schoolCollections/:id`
  - `PATCH /schoolCollections/:id`
  - `DELETE /schoolCollections/:id`

### Endpoint Examples

Here are some examples of how to use the endpoints:

- **Get All Schools:**

  ```http
  GET /schools
  ```

  This endpoint retrieves a list of all schools.

- **Get Specific School:**

  ```http
  GET /schools/1
  ```

  This endpoint retrieves the details of the school with ID 1.

- **Create New Invoice:**

  ```http
  POST /invoices
  ```

  To create a new invoice, send a POST request with the invoice details in the request body.

- **Update Collection Status:**

  ```http
  PATCH /schoolCollections/1
  ```

  To update the status of a specific collection, send a PATCH request with the updated status in the request body.

This setup provides a comprehensive mock API to support the development and testing of the sales agent dashboard. Enjoy building your application!.

- **Developed by:**
  [Lewis Mwendwa Kathembe](https://www.linkedin.com/in/lewis-mwendwa-3a2581244/)
