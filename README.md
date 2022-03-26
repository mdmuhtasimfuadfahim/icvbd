
# ICV: BLOCKCHAIN BASED CERTIFICATE VERIFICATION BY UGC
## Instant Certificate Verification

### Description

This a product for all universities, companies/corporates, students and UGC. By this product anyone will be able to visit our website and verify anyone's certificate using a unique key/ID. It is project of ICT Ministry Bangladesh and it is a ongoing product that we are developing.

### Technology Stack and Tools

  - [NodeJS](https://nodejs.org/en/)
  - [Yarn](https://yarnpkg.com/) / NPM (no need install npm)
  - [MongoDB Atas](https://www.mongodb.com/atlas/database)
  - [Geth](https://geth.ethereum.org/)
  - [Remix IDE](https://remix.ethereum.org/)
  - [SendGrid](https://sendgrid.com/)

### Setting up

  **Step 1: Download the repository or clone it by:**
  ```shell
  git clone https://github.com/bitecUGC/icvbd
  ```

  **Step 2: Run the following commands from the root directory to install all dependencies:**
  ```shell
  yarn install 
  # or
  npm install
  ```

  **Step 3: Change the PORT number or leave it as it is.**
  **Step 4: Create and setting up the .env variables.**

  ```shell
  MONGO_CONNECTION_URL = "mongodb_atlas_database_url"
  COOKIE_SECRET = secret
  SECRET_TO_HASH_DB_VALUES = secret

  APP_BASE_URL = http://localhost:3500

  AccountOne = geth_account
  AccountTwo = geth_account

  AccountOnePassword = geth_account_password
  AccountTwoPassword = geth_account_password

  PrivateKeyofAccountOne = geth_account_private_key
  PrivateKeyofAccoutnTwo = geth_account_private_key

  SENDGRID_API_KEY= sendgrid_key
  ```

  **Step 5: Change the geth server and create your own blockchain account by the following commands:**

  ```shell
  mkdir blockchain
  cd blockchain
  mkdir data
  puppeth
  
  2. Configure new genesis
  1. Create new genesis from scratch
  1. Etash - proof-of-work
  give your network ID (ex: 3452)
  2. Manage existing genesis
  2. Export genesis configurations

  geth --datadir=./data init yourJSON_Name.json

  geth --http --http.port "8000" --http.corsdomain "*" --datadir=./data --port "30303" --nodiscover --allow-insecure-unlock --http.api "eth,net,web3,personal,miner,admin" --networkid your_networkID --nat "any" --syncmode="fast"

  geth attach "http://127.0.0.1:8000"
  personal.newAccount("password")
  miner.start()
  miner.stop()
  ```
  **Step 6: Run the nodejs and laravel-mix server by:**
  ```shell
  yarn serve
  # or
  npm run serve

  yarn production
  # or
  npm run production
  ```

### Features

  - Creator creates certificate and update or delete certificate.
  - Verifier verifies the created certificate.
  - Blockchain for all transactions.
  - Students get QR code to verify their certificate information.
  - Event logs for all details.
  - Universities can be restricted by UGC for faulty activies.

### Live Demo
  - [https://icvbd.herokuapp.com/](https://icvbd.herokuapp.com/)

### License
  - MIT

### Contribution

Please feel free to add any features if needed and for major changes please contact with us.

##### Thank You :D
