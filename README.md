# AUTOCHECK ASSESSMENT

## Prerequisites

- Node.js installed
- Git installed
- Postman installed
- A code editor (e.g Visual Studio Code)


## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/preciousaffiah/AutoCheck_Assessment.git

2. Change to the project directory:
    ```bash
    cd AutoCheck_Assessment

3. install project dependencies:
    ```bash
    npm install

4. Create a `.env` file in the project root with the following environment variables:
    ```dotenv
    # Server
    APP_NAME=
    APP_ENV=
    APP_PORT=

    # JWT Token
    JWT_SECRET=
    JWT_EXPIRE=
    JWT_REFRESH_EXPIRE=

    # Database
    DB_CONNECTION=sqlite
    DATABASE='./autocheck.sqlite'
    
    #API
    VINAPIKEY=
    VINURL=
Update the values with yours.


5. Start the application:
    ```bash
    npm run start


## API Documentation

1. In the project folder, you'll see a folder called `postman_doc`
   
  ![postman_doc](https://github.com/user-attachments/assets/1369398d-1454-48c6-973e-12b302be9d5c)
  
3. Open your postman and import both files in the folder
   
  ![postman_import](https://github.com/user-attachments/assets/219a5a47-0c85-41c1-b582-416b3c1efbc8)
   
5. In the newly exported collection, set the environment to the newly exported one called `auto_check_dev`
   
  ![postman_env](https://github.com/user-attachments/assets/fd38ab66-3160-44f7-a2d3-7d5157029e43)
   
7. Endpoints that require `auth_token` will be automatically set via a script that will be ran when the either login or register
   
8. The postman requests have already been populated with placeholder data
    
9. Go ahead and make other requests!



