# Installation

## MindsDB Docker

1. Install [Docker](https://www.docker.com/) on your machine.

2. Run the following command to create a Docker container with MindsDB:

   ```sh
   docker run --name mindsdb_container_lightwood -p 47334:47334 -p 47335:47335 mindsdb/mindsdb:lightwood
   ```

### Upload Dataset

1. Navigate to [http://localhost:47334/](http://localhost:47334/).

2. Upload the [dataset](./datasets/cloth_size.csv) in the **MindsDB** editor.


3. Run the following queries to check if the dataset is uploaded correctly:

   ```sql
   SHOW TABLES FROM files;
   SELECT * FROM files.house_price LIMIT 10;
   ```

### Create and Train Model

1. Create and train the model using the following query:

   ```sql
   CREATE PREDICTOR mindsdb.house_price_predictor
    FROM files
    (SELECT * from house_price LIMIT 10000)
    PREDICT Price;
   ```

2. Describe the model and its features:

   ```sql
      DESCRIBE house_price_predictor;
      DESCRIBE house_price_predictor.features;
   ```

3. Check the status of the model:

   ```sql
   SELECT status
    FROM mindsdb.models
    WHERE name='house_price_predictor';

   ```



### Predicting Size using Trained Model

1. Use the trained model to predict the size with the following query:

   ```sql

    SELECT Price 
    from mindsdb.house_price_predictor
    where City=17
    AND Bedroom=5
    AND Bathroom=3
    AND Floors=2
    AND Parking=1
    AND Face=3
    AND Year=2073
    AND Views=  1700
    AND RoadWidth=10
    AND RoadType=3;
   ```


## Backend

1. Install [nodejs](https://nodejs.org/en) into your machine.

2. Navigate to `backend/` folder

   ```bash
   cd backend
   ```

3. Install the required packages.

   ```bash
   npm install
   ```

4. Run the backend server

   ```bash
   npm run dev
   ```

## Frontend

1. Navigate to `web_app/` folder

   ```bash
   cd web_app
   ```

2. Install the required packages.

   ```bash
   npm install
   ```

3. Run the frontend server

   ```bash
   npm run dev
   ```

