# FINAL PROJECT 

DESIGNED & CREATED BY: AGUSTINA CASSINI 

DEPLOY LINK: https://final-project-agustina.netlify.app

PRESENTATION LINK:


# BUILT WITH:

- HTML5: Structure of the content, the bones.

- CSS3: Style and design of HTML elements

- JAVASCRIPT: Programming language.

- VUE 3: Our framework for building the user interface

- PINIA: Library that facilitates access and update of shared data between different components.

- SUPABASE 2: Our backend for authentication and data storage.

- VISUAL STUDIO CODE: Code editor

- TABNINE: Autocompletion tool, predicts the most likely code to be written next.

- PRETTIER: Code formatter.

- GITHUB: Platform that facilitates code management

- NETLIFY: Platform that allows me to manage and show my application.


# USER AUTHENTICATION:

- SIGN UP
The user registers with an email, password, and username, sending this data to Supabase to create a new account. Supabase creates the user and returns the information to the application, which saves it in the global state.

- SIGN IN
The user enters their email and password, sending this data to Supabase for verification. If correct, Supabase returns the user's information and the application stores the information in the state managed by Pinia.

- LOG OUT
The user's information is removed from the global state managed by Pinia.


# TASK MANAGMENT:

- ADD NEW TASK
The user enters the title and description of the new task and sends a request to Supabase to add it to the database, save it, and update the global state.

- EDIT TASK
The user edits the existing task and sends a request to Supabase to update it in the database, so that the changes are then reflected in the global state.

- SAVE TASK
The changes are sent to Supabase to be saved, and the task is updated in the database, synchronizing with the global state.

- DELETE TASK
A request is sent to Supabase to delete the task from the database, and then the global state is updated.

- MARK TASK AS COMPLETED OR INCOMPLETE
Through a filter, tasks are grouped by columns depending on their status.


# USER PROFILE:
Creation (upon logging in) and editing of the user profile, storing the information in Supabase.


# RESPONSIVE FOR IPHONE SE:
It was not necessary to make many changes, but in some components, the margin sizes were adjusted to ensure it looks good within a maximum width of 375px.


# DIFFICULTIES AND LEARNINGS:
- Getting started and knowing which path to take, needed  some help to guide me.
- Creating user profile. It was challenging to make it work and to save and update the data in Supabase, but it helped me better understand how this back and forth of data works.
- Ensuring that the different user IDs are updated and saved
- Reminder: It's good to use tools like the GPT chat, but its overuse can make one more confused and without understanding what is being done and how each of the elements relate. Always trust and understand the code to simplify what we are doing.


# IMPROVEMENTS FOR THE FUTURE:
- Display the profile, maybe the name or avatar, in the navbar or in the main task when I am logged in.
- Burguer menu for responsive navigation
- Making the tasks organise in order, maybe marking something as more important or just as something that should be done first.



