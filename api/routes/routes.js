import Router from 'express';
import usercontroller from '../controllers/user';
import admincontroller from '../controllers/admin';
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



export default routes;