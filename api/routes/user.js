import Router from 'express';
import usercontroller from '../controllers/user';
import sessionController from '../controllers/session';
import Auth from '../middleware/auth';
import x from '../middleware/signup-middleware';

const userRoutes = Router();

// users create accounts to use the application
userRoutes.post('/auth/signup', x.signup, usercontroller.UserController.RegisterUser);
// user can login
userRoutes.post('/auth/login', x.signin, usercontroller.UserController.UserLogin);
// a user gets all the mentors available
userRoutes.get('/mentors', Auth.verifyUser, usercontroller.UserController.GetAvailableMentors);
// user gets one mentor
userRoutes.get('/mentors/:id', Auth.verifyUser, usercontroller.UserController.GetOneMentor);
// users create sessions
userRoutes.post('/sessions', Auth.verifyUser, sessionController.SessionController.createSession);
// mentor sees session requests
userRoutes.get('/sessions/requests', Auth.verifyUser, usercontroller.UserController.mentorViewSessionRequests);
// mentor sees a session request
userRoutes.get('/sessions/requests/:id', Auth.verifyUser, usercontroller.UserController.mentorViewSingleSessionRequest);
// accept session
userRoutes.patch('/sessions/requests/:id/accept', Auth.verifyUser, usercontroller.UserController.mentorAcceptsRequest);
// decline session
userRoutes.patch('/sessions/requests/:id/decline', Auth.verifyUser, usercontroller.UserController.mentorDeclinesRequest);

export default userRoutes;