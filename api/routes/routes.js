import Router from 'express';
import usercontroller from '../controllers/user';
import admincontroller from '../controllers/admin';


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

export default routes;