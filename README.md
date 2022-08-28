
# Are You Free? - Calendar App
a calendar app where you can add events to a calendar to keep track of schduled events or tasks.

### Project Overview
Major Features:

Are You Free? is a calendar app where you can create events to keep track of your daily events or tasks.

- Allows users to add events/appointments to their personal calendar

Frameworks Used:
- Django Rest Framework
- Vue
- Javascript
- Python

### Project Features
User Stories
1. As a busy human, I want a calendar where I can store all of my events because I want to be able to keep track of when I have something to do and when I have some availability.
  - Tasks:
    - Allow user to login to their own calendar(Python/Django)
    - Create a base calendar to store user events (using Vue/JavaScript)
    - Allow user to create new event (date/start time/end time/notes)(Vue/JavaScript)
    - Saves create events to users account through API (Django Rest Framework)

### Data Models
- Custom User Model - username; password; email; phone number; date of birth

### Installation
Make sure you have Python and Pipenv installed on your computer

1. Clone the repo
2. Navigate to the capstone_areyoufree folder in the terminal
3. `pipenv install` to create virtual environment and install dependencies
4. `pipenv shell` to enter the new virtual environment
5. `python manage.py migrate users` This app uses a custom user model so you MUST migrate the users app before migrating the rest!
6. `python manage.py migrate` Migrate all other models
7. `python manage.py runserver` Runserver and create an account to login to your own personal calendar!





