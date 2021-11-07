
# Data Warehouse


Cuarto proyecto de la carrera de Desarrollo Web Full Stack en Acámica. Se trata de una aplicación para el manejo de información de contacto de potenciales clientes para campañas de marketing.

---

Project #4 from the Full Stack Web Development course at Acámica. Application for the management of potential customers's data for marketing purposes.

---

Tecnologías y recursos utilizados / Technologies and resources used:

* HTML/ejs
* CSS/Sass
* Bulma
* JavaScript
* Node.js
* Express.js
* MongoDB
* mongoose
* ejs-mate
* JWT
* bcrypt
* dotenv
* nodemon
* cookie-parser
* method-override
* path
* [sort-tables](https://github.com/stationer/SortTable)


![image](https://user-images.githubusercontent.com/75340355/120859230-4c22a700-c55a-11eb-81c8-57ef271ae508.png)

## Cómo utilizarlo 

### Prerrequisitos
Necesitarás tener instalado Node.js y un cluster de **MongoDB Atlas** o una base de datos local de **MongoDB**.

### Empezando

1. Desde la consola, clonar el repositorio utilizando el link "https://github.com/aldanadc/data-warehouse.git" o corriendo `gh repo clone aldanadc/data-warehouse` desde GitHub CLI.

2. Correr `npm i` o `npm install` en la carpeta raíz del repositorio clonado para instalar todas las dependencias necesarias.

3. Renombrar el archivo **_sample.env_** que se encuentra en la carpeta raíz para que se llame solo **_.env_**, ya que estas serán tus variables de entorno. Personalizar el contenido asegurándose de que se utilice la información correspondiente a la base de datos a utilizar. Se deberá modificar DB_SCHEMA y DB_AUTHORITY de acuerdo al tipo de base de datos que se utilice (local o remota). En caso de utilizar un número de puerto distinto al provisto, habrá que modificar el mismo también en la línea 5 del archivo **_searchContacts.mjs_** de la carpeta _front/scripts_.

4. Desde la carpeta raíz ejecutar `npm run seeds` para cargar la base de datos con la información de ejemplo. 

5. Una vez terminado el proceso del paso anterior, ejecutar `npm run start` y esperar mientras se establece la conexión con la base de datos y comienza el servidor. Al finalizar, la consola debería mostrar "Connection to database open" y "Server is ready".

6. La aplicación está lista para ser usada. La URL base para ingresar en el navegador es **http://localhost:8080/**. Asegurarse de usar el puerto correcto si se utilizó uno distinto en el archivo **_.env_**.

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

3. Rename the **_sample.env_** file in the project's root folder to be only **_.env_** as these will be your environment variables. Customize the variables as you like but make sure you use the correct information for the database you will use for this project. For example, you will need to update DB_SCHEMA and DB_AUTHORITY according to the type of database you will use (local or remote). In case of using a different port number from the one provided, it will also have to be updated in line 5 of the file **_searchContacts.mjs_** from the folder _front/scripts_.

4. From the root folder, run `npm run seeds` on your console in order to seed the database with the example collections.

5. Once the previous step is finished, run `npm run start` and wait while the connection to the database is established and the server starts running. When finished, the console should show the messages "Connection to database open" and "Server is ready".

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



