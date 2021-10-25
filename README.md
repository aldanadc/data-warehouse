
# Data Warehouse


Cuarto proyecto de la carrera de Desarrollo Web Full Stack en Acámica. Se trata de una aplicación para el manejo de información de contacto de potenciales clientes para campañas de marketing.

---

Project #4 from the Full Stack Web Development course at Acámica. Application for the management of potential customers's data for marketing purposes.

---

Tecnologías y recursos utilizados / Technologies and resources used:

* JavaScript
* Node.js
* Express.js
* MongoDB
* mongoose
* ejs-mate
* JWT
* dotenv
* nodemon
* [sort-tables](https://github.com/stationer/SortTable)


![image](https://user-images.githubusercontent.com/75340355/120859230-4c22a700-c55a-11eb-81c8-57ef271ae508.png)

## Cómo utilizarlo 

### Prerrequisitos
Necesitarás tener instalado Node.js y un cluster de **MongoDB Atlas** o una base de datos local de **MongoDB**.

### Empezando

1. Desde la consola, clonar el repositorio utilizando el link "https://github.com/aldanadc/data-warehouse.git" o corriendo `gh repo clone aldanadc/data-warehouse` desde GitHub CLI.

2. Correr `npm i` o `npm install` en la carpeta raíz del repositorio clonado para instalar todas las dependencias necesarias.

3. Renombrar el archivo **_sample.env_** que se encuentra en la carpeta raíz para que se llame solo **_.env_**, ya que estas serán tus variables de entorno. Se puede personalizar el contenido pero debe asegurarse que se utilice la información correspondiente a la base de datos a utilizar.

5. Desde la carpeta _src_ ejecutar `node seedsIndex.mjs` para cargar la base de datos con la información de ejemplo. 

6. Una vez terminado el proceso del paso anterior, nuevamente desde la carpeta _src_ ejecutar `node index.mjs` y esperar mientras se establece la conexión con la base de datos y comienza el servidor. Al finalizar, la consola debería mostrar "Connection to database open" y "Server is ready".

8. La aplicación está lista para ser usada. La URL base es **http://localhost:8080/**. Asegurarse de usar el puerto correcto si se utilizó uno distinto en el archivo **_.env_**.

### Usuarios y permisos
Se puede utilizar cualquiera de los usuarios provistos para hacer log in. Aquí hay dos ejemplos:
#### Administrador
- email: ididntstartthefire@email.com
- password: Password1

#### No administrador
- email: acaseofyou@email.com
- password: Password2


![image](https://user-images.githubusercontent.com/75340355/120859230-4c22a700-c55a-11eb-81c8-57ef271ae508.png)


## How to use

### Prerequisites
You will need to have Node.js and XAMPP installed (or Apache, MariaDB/MySQL and PHP if you don't have XAMPP). It is recommended to use Postman to make requests.

### Documentation
You will find the app's specifications following the OpenAPI standard in the file **_spec.v1.yaml_**.

### Getting started

1. From your console clone the repository either by using "https://github.com/aldanadc/delilah-resto.git" or by running `gh repo clone aldanadc/delilah-resto` from GitHub CLI.

2. Run `npm i` or `npm install` on the cloned repo's root folder to install all necessary dependencies.

3. Start the MySQL and Apache services on your machine.

4. Create a local **MariaDB** or **MySQL** database named "delilah" or with a name of your choosing.

5. Rename the **_sample.env_** file in the project's root folder to be only **_.env_** as these will be your environment variables. You can customize the contents of anything from SERVER_PORT down as you like. Make sure you use the correct information for the database you created for this project if it differs from the data in the file.

6. From the _src_ folder, run `npm run dev` on your console and wait while the connection to the database is established and the tables are created. When finished, the console should show a message saying "Server is ready".

7. Import the **_delilah.sql_** file found in the repository into your database or run the insert queries found there in order to populate the tables with the initial data.

8. The API is now ready and waiting to be used. You can run any of the operations detailed in the **_spec.v1.yaml_** file to try the available endpoints. You can also use this Postman [collection](https://www.getpostman.com/collections/84741c7aee6fee2516c8) to make the requests, making an import from the app. The base URL for all endpoints is **http://localhost:8080/api/1.0.0/**. Make sure you use the correct port if you used a different one on your **_.env_** file.

---

### Users and permissions
You can use any of the users provided or create your own to do the testing. Here are two examples you can use: 

#### Admin
- username: admin
- password: Password1

#### Non-admin
- username: billyjoel
- password: Password2

Once succesfully logged in, a JWT will be returned which should be used to make requests. Copy and paste it on the Authorization header with the type "Bearer token".


![image](https://user-images.githubusercontent.com/75340355/120859230-4c22a700-c55a-11eb-81c8-57ef271ae508.png)



