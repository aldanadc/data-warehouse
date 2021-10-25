
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

5. Desde la carpeta _backed_ ejecutar `node seedsIndex.mjs` para cargar la base de datos con la información de ejemplo. 

6. Una vez terminado el proceso del paso anterior, nuevamente desde la carpeta _backend_ ejecutar `node index.mjs` y esperar mientras se establece la conexión con la base de datos y comienza el servidor. Al finalizar, la consola debería mostrar "Connection to database open" y "Server is ready".

8. La aplicación está lista para ser usada. La URL base para ingresar en el navegador es **http://localhost:8080/**. Asegurarse de usar el puerto correcto si se utilizó uno distinto en el archivo **_.env_**.

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
You will need to have Node.js and a MongoDB cluster or local MongoDB database.

### Getting started

1. From your console clone the repository either by using "https://github.com/aldanadc/data-warehouse.git" or by running `gh repo clone aldanadc/data-warehouse` from GitHub CLI.

2. Run `npm i` or `npm install` on the cloned repo's root folder to install all necessary dependencies.

3. Rename the **_sample.env_** file in the project's root folder to be only **_.env_** as these will be your environment variables. You can customize the variables as you like but make sure you use the correct information for the database to use for this project.

4. From the _backend_ folder, run `node seedsIndex.mjs` on your console in order to seed the database with the example collections.

5. Once the previous step is finished, again from the _backend_ folder, run `node index.mjs` and wait while the connection to the database is established and the server starts running. When finished, the console should show the messages "Connection to database open" and "Server is ready".

6. The application is now ready and waiting to be used. The base URL you can access in the browser is **http://localhost:8080/**. Make sure you use the correct port if you used a different one on your **_.env_** file.

---

### Users and permissions
You can use any of the users provided to start. Here are the two examples you can use: 

#### Admin
- email: ididntstartthefire@email.com
- password: Password1

#### Non-admin
- email: acaseofyou@email.com
- password: Password2


![image](https://user-images.githubusercontent.com/75340355/120859230-4c22a700-c55a-11eb-81c8-57ef271ae508.png)



