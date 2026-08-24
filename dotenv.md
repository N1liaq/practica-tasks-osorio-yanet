# ¿Qué es dotenv?

Dotenv es una librería que sirve apra gestionar y centralizar parámetros cuando se avanza y se crea proyectos más complejos, se encarga de cargar las variables de entorno desde un archivo de configuración, como credenciales de bases de datos, claves de API, sin necesidad de exponerlas directamente en el código. Esto mejora la seguridad al impedir que los archivos .env sean subidos a repositorios y aumenta la portabilidad, permitiendo cambiar configuraciones entre entornos de desarrollo, pruebas y producción sin modificar el código base.

## ¿Cómo se instala?

Para instalar dotenv depende del lenguaje de programación utilizado.
Para Node.js (javaScript/TypeScript) se ingresa en la terminal un comando para instalarlo en el proyecto.

```bash
npm install dotenv
```

Mientras que en caso de Python se instala mediante el comando:

```bash
pip install python-dotenv
```

## ¿Cómo se configura y cómo se accede a las variables definidas en el archivo .env desde el código?

Para configurarlo primero se instala la dependencia y luego se crea un archivo .env en la raíz del proyecto.
Definiendo las variables con el formato NOMBRE_VARIABLE=valor (sin espacios alrededor del signo =).

```bash
PORT=3000
DATABASE_URL=mongodb://localhost:27017/mi_base_datos
API_KEY=xyz123abc456
```

Un detalle importante es añadir el archivo .env en el .gitignore para no subir las claves secretas al repositorio.

Para cargar y acceder a las variables del código, se debe cargar la configuración de dotenv al inicio de la aplicación (index.js o app.js). Las variables estarán disponibles globalmente a través del objeto nativo process.env.

```bash
import { config } from "dotenv";

const apiKey = process.env.API_KEY;
console.log(`Tu API Key es: ${apiKey}`);
```
