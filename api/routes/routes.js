import express from 'express';
import adminRoutes from './admin';
import userRoutes from './user';

const routes = express.Router();
// Landing Urls
routes.get("/", (req, res) => res.status(301).redirect("/api/v1"));
routes.get("/api/v1", (req, res) =>
  res.status(200).send({
    status: res.statusCode,
    message: "Welcome to FreeMentor"
  })
);

routes.use('/api/v1', adminRoutes);
routes.use('/api/v1', userRoutes);


export default routes;