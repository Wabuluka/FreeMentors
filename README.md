# FreeMentors

[![Build Status](https://travis-ci.org/Wabuluka/FreeMentors.svg?branch=develop)](https://travis-ci.org/Wabuluka/FreeMentors) [![Coverage Status](https://coveralls.io/repos/github/Wabuluka/FreeMentors/badge.svg?branch=ft-user-view-one-mentor-168047526-2)](https://coveralls.io/github/Wabuluka/FreeMentors?branch=ft-user-view-one-mentor-168047526-2) [![Maintainability](https://api.codeclimate.com/v1/badges/d3e39a603abcc904b26c/maintainability)](https://codeclimate.com/github/Wabuluka/FreeMentors/maintainability)

Free Mentors is a social initiative where accomplished professionals become role models to
young people to provide free mentorship sessions.

## Getting Started
To get started with Free Mentors, a user must create an account with the system that is hosted online in order to provide access to world wide users. A user with an account can gain access by simply logging into the system. 

In case one wants to test Free Mentors manually offline, they can do so by simply following the steps defined below in a sequence.

### Prerequisites
Firstly, the following prerequisites have to be fulfilled for the system to get working on one's offline version.

* Make sure you have installed git on your system
- If you have not yet done so you may have problems with some commands I will be describing here. because the commands shall cut across all the operating system platforms

* Clone the entire repo on to your local machine
```
$git clone https://github.com/Wabuluka/FreeMentors.git
```
- This should download the system code to your offline machine

* The machine can be of any operating system

* After successfully downloading the code, in the git bash terminal, head to the folder containing the code. This must be called FreeMentors
```
$cd FreeMentors
```

* While in the root folder of the code, install all the required dependencies
```
$npm install
```
- The above command will install all the required dependencies for the system to work

* After the installation has successfully completed, it is time to run the system.
```
$npm start
```
- This shall start the server

* In order to easily test the system , I recommend having Postman installed on your computer.

After all the above are met, it is time to start testing the system.

### Table of endpoints and their descriptions as used in the system API
|   METHODS     |   URL ENDPOINT                        |   DESCRIPTION                  |
|---------------|---------------------------------------|--------------------------------|
|   POST        |/api/v1/auth/admin/signup              |Admin Registration              |
|   POST        |/api/v1/auth/admin/login               |Admin Login                     |
|   POST        |/api/v1/auth/signup                    |User Registration               |
|   POST        |/api/v1/auth/login                     |Admin Login                     |
|   GET         |/api/v1/admin/users/all                |Admin Get All Users             |
|   GET         |/api/v1/admin/users/1                  |Admin Get One User              |
|   PATCH       |/api/v1/admin/users/1                  |Admin changes User to Mentor    |
|   DELETE      |/api/v1/admin/users/1                  |Admin deletes Mentor            |
|   GET         |/api/v1/mentors                        |User gets all avialable mentors |
|   GET         |/api/v1/mentors/1                      |User gets one avialable mentor  |
|   POST        |/api/v1/sessions                       |User creates sessions           |
|   GET         |/api/v1/sessions/requests              |Mentor gets all the requests    |
|   GET         |/api/v1/sessions/requests/1            |Mentor gets one request         |
|   PATCH       |/api/v1/sessions/requests/1/accept     |Mentor Accepts a session        |
|   PATCH       |/api/v1/sessions/requests/1/decline    |Mentor declines a session       |



### Running Unit Tests
The system has been developed with the aspect of TDD which means all the components have been testing using Unit Tests.
To carry out the tests one must run the following command which shows all the tests done.
```
$npm test
```
If the following command is run, one must be able to see the coverage of the tests done.
```
$npm run coverage
```
## Deployment
This API has been deployed on Heroku for live viewing. The link can be found below
[epicmail on heroku](https://freementor.herokuapp.com/api/v2/auth/signup) - Live demo

## Documentation
For a proper documentation of this API please refer to the link below
[epicmail documentation](https://freementor.herokuapp.com/apidocs) - Live demo

## Developer
**Davies Wabuluka**