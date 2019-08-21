import Router from 'express';
import usercontroller from '../controllers/user';


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

export default routes;