# FINAL PROJECT 

DEPLOY LINK: https://final-project-agustina.netlify.app

PRESENTATION LINK:


# TECNOLOGIAS:

.HTML5: Estructura el contenido

.CSS3: Da el estilo y diseño a los elementos HTML

.JAVASCRIPT: Nuestro lenguaje de programación.

.VUE 3: Nuestro framework para la construcción de la interfaz del usuario

.PINIA: Biblioteca de gestión de estado para Vue.js, facilitando el acceso y actualización de datos compartidos entre diferentes componentes.

.SUPABASE 2: Nuestro backend para la autenticacion y el almacenamiento de los datos.

.VISUAL STUDIO CODE: Es el editor de código

.GITHUB: Plataforma que facilita la gestión del código

.NETLIFY: Plataforma que me permite gestionar y mostrar mi aplicación.


# AUTENTICACIÓN DE USUARIOS:

- REGISTRAR (SIGN UP)

El usuario se registra mediante un email, contraseña y nombre de usuario, enviando estos datos a Supabase para crear una nueva cuenta. Supabase crea el usuario y devuelve la información a la aplicación que la guarda en el estado global.

- INICIAR SESIÓN (SIGN IN)

El usuario ingresa su email y contraseña y se envían los datos a Supabase para verificarlos. Si son correctos, Supabase retorna la información del usuario y aplicación almacena la información del en el estado gestionado por Pinia.

- CERRAR SESIÓN (LOG OUT)

La información del usuario se elimina del estado global gestionado por Pinia.


# GESTIÓN DE TAREAS:

- NUEVA TAREA (ADD NEW TASK)

El usuario ingresa título y descripción de la nueva tarea y se envia solicitud a Supabase para agragarla a la base de datos, guardarla y actualiza el estado global.


- EDICIÓN (EDIT TASK)

El usuario modifica la tarea existente y se envía una solicitud a Supabase para actualizarla en la base de datos, para que luego, se vean reflejados en el estado global.

- GUARDAR (SAVE TASK)

Los cambios envían a Supabase para ser guardados y la tarea se actualiza en la base de datos, sincronizandose con el estado global.

- ELIMINAR (DELETE TASK)

Se envía una solicitud a Supabase para eliminar la tarea de la base de datos y luego se actualiza el estado global.

- MARCAR TAREAS COMO COMPLETAS E INCOMPLETAS
Se agrupan por columnas dependiendo del estado de las mismas. 


# PERFIL DEL USUARIO:
Creación (al iniciar sesión) y edición  del perfil del usuario, almacenando la informacion en Supabase.

# RESPONSIVE FOR IPHONE SE:
No fue necesario generar muchos cambios, pero se ajustaron los tamaños de márgenes para que pueda verse bien en un ancho máximo de 375px.

# DIFICULTADES Y APRENDIZAJES:
- Comenzar y saber que camino tomar, necesite ayuda para guiarme. 
- Crear de perfil de usuario. Me costo mucho hacerla funcionar y que se guarden y actualicen los datos en Supabase, pero me hizo entender mejor como funciona esta ida y vuelta de datos. 
- Hacer que los diferentes id de personas se actualicen y guarden
- Es bueno ayudarse con herramientas como el chat gpt, pero su abuso, hace que uno termine mas liado y sin entender que se esta haciendo y como se relacionan cada uno de los elementos. Siempre confiar y entender el codigo para simplificar lo que estamos haciendo.  



Project created by Agustina Cassini