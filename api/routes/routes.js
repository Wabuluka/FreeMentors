import Router from 'express';
import usercontroller from '../controllers/user';
import admincontroller from '../controllers/admin';
import sessionController from '../controllers/session';
import Auth from '../middleware/auth';

const routes = Router();

// Landing Urls
routes.get("/", (req, res) => res.status(301).redirect("/api/v1"));
routes.get("/api/v1", (req, res) =>
  res.status(200).send({
    status: res.statusCode,
    message: "Welcome to FreeMentor"
  })
);


// users create accounts to use the application
routes.post('/api/v1/auth/signup', usercontroller.UserController.RegisterUser);
// user can login
routes.post('/api/v1/auth/login', usercontroller.UserController.UserLogin);


// admin create account
routes.post('/api/v1/auth/admin/signup', admincontroller.AdminController.RegisterAdmin);
// admin log in
routes.post('/api/v1/auth/admin/login', admincontroller.AdminController.AdminLogin);


// admin can view all users registered
routes.get('/api/v1/admin/users/all', Auth.verifyAdmin, admincontroller.AdminController.GetAllUsers);
// admin get a user by id
routes.get('/api/v1/admin/users/:id', Auth.verifyAdmin, admincontroller.AdminController.GetOneUser);
// admin changes user to mentor or viseversa
routes.patch('/api/v1/admin/users/:id',Auth.verifyAdmin, admincontroller.AdminController.CheckToMentor);
// admin can delete user
routes.delete('/api/v1/admin/users/:id',Auth.verifyAdmin, admincontroller.AdminController.DeleteOneUser);

// a user gets all the mentors available
routes.get('/api/v1/mentors', Auth.verifyUser, usercontroller.UserController.GetAvailableMentors);
// user gets one mentor
routes.get('/api/v1/mentors/:id', Auth.verifyUser, usercontroller.UserController.GetOneMentor);

// users create sessions
routes.post('/api/v1/sessions', Auth.verifyUser, sessionController.SessionController.createSession);
// mentor sees session requests
routes.get('/api/v1/sessions/requests', Auth.verifyUser, usercontroller.UserController.mentorViewSessionRequests);
// mentor sees a session request
routes.get('/api/v1/sessions/requests/:id', Auth.verifyUser, usercontroller.UserController.mentorViewSingleSessionRequest);
// accept session
routes.patch('/api/v1/sessions/requests/:id/accept', Auth.verifyUser, usercontroller.UserController.mentorAcceptsRequest);
// decline session
routes.patch('/api/v1/sessions/requests/:id/decline', Auth.verifyUser, usercontroller.UserController.mentorDeclinesRequest);

export default routes;