# Are You Free? - Calendar App
a calendar app where you can share your calendar with friends to see each other's availability. It also allows for users to send event requests to one another to schedule plans with eachtoher.

### Project Overview
Major Features:

Are You Free? is a calendar app where you can share your personal calendar with friends and also view your friend's calendar(s). The app will allow you to keep track of your own events and allow you to schedule events with your friends on days/times where you are both/all available. This will help friends/friend groups to simply make plans through scheduling events through the Are You Free? app!

- Allows users to add events/appointments to their personal calendar
- Allows users to see friend's calendars to see their friend's availability
- Allows users to send requests to schedule events with friends during times that they are available
- Sends notifications to user when a request to schedule something has come from a friend
Problem This App Is Attempting To Solve:
This app will help friends stay connected with one another by allowing them to input their busy schedules and be able to see their friend's schedules as well to determine a day where both/all friends are available (can work for any group but is targetted for friends).

Libraries/Frameworks To Be Used:
- Django Rest Framework
- Vue
- Vue Notification or Vue + Twilio (for SMS/notifications)

### Project Features
User Stories
1. As a busy human, I want a calendar where I can store all of my events because I want to be able to keep track of when I have something to do and when I have some availability.
  - Tasks:
    - Create a base calendar to store user events (using Vue/JavaScript)
    - Allow user to create new event (date/start time/end/time/notes); also allow for editting and deleting events. (Vue/JavaScript)
2. As a busy friend, I want my friends to be able to view my calendar because I want them to know when I am available to make plans with them(& vice versa).
  - Tasks:
    - Create user accounts to save user events/calendar (using Vue/JavaScript)
    - Create friend request option to add friends to account and allow them to see your calendar (using Vue/JavaScript)
3. As a busy friend, I want to send my friends requests to make plans on days that their calendar shows that they are available because I want to make sure we have time scheduled to spend time together.
  - Tasks:
    - Allow user to request to add event to both their calendar and another user's calendar (if there are no overlapping events) (Vue  (permissions?)/Javascript)
4. As a busy friend group, I want everyone attending an event to be able to edit it (date/start time/end time) because I want an app that can accomodate everyone's changing schedules.
  - Tasks:
    - Allow users who are associated with same event to have access to edit/delete the event (Vue/Javascript)
5. As a busy friend, I want notifications sent to my email/phone number for requests sent by friends for any plans they want to make because I want to ensure I see the request before I become unavailable.
  - Tasks:
    - Include functionality to send notifications to users when an event is requested to be added to their calendar by another user
      - possible notification libraries to user: Vue Notification, Vue + Twilio

### Data Models
- Event Model - Date; start time; end time; notes
- Custom User Model - username; password; email; phone number

### Schedule
Week 1 (Tuesday 7/19 - Friday 7/22)
- Work on/Complete basic calendar functionality (creating/editing/deleting an event) (Wednesday 7/20 - Friday 7/22)
- Work on/Complete user login/signup functionality (Wednesday 7/20 - Friday 7/22)

Week 2 (Monday 7/25 - Friday 7/29)
- Complete any finishing touches from Week 1's tasks (if necessary) (Monday 7/25)
- Add some HTML/CSS to ensure the app could work as a viable product if needed (Monday 7/25)
- Research/Work on/Complete functionality to share calendars and request edits on other's calendars (Tuesday 7/26 - Friday 7/29)
- Complete functionality to allow users to edit shared events (Thursday 7/28 - Friday 7/29)

Week 3 (Monday 8/1 - Thursday 8/4)
- Research/Work on/Complete notification/SMS functionality (Monday 8/1 - Tuesday 8/2)
- Work on HTML/CSS to make sure app looks exactly how it was planned to look (Wednesday 8/3 - Thursday 8/4)
- Finish up any final touches (Wednesday 8/3 - Thursday 8/4)




