import Router from 'express';
import admincontroller from '../controllers/admin';
import Auth from '../middleware/auth';
import y from '../middleware/admin-middleware';

const adminRoutes = Router();


// admin create account
adminRoutes.post('/auth/admin/signup', y.signup, admincontroller.AdminController.RegisterAdmin);
// admin log in
adminRoutes.post('/auth/admin/login', y.login, admincontroller.AdminController.AdminLogin);
// admin can view all users registered
adminRoutes.get('/admin/users/all', y.getallusers, Auth.verifyAdmin, admincontroller.AdminController.GetAllUsers);
// admin get a user by id
adminRoutes.get('/admin/users/:id', y.getoneuser, Auth.verifyAdmin, admincontroller.AdminController.GetOneUser);
// admin changes user to mentor or viseversa
adminRoutes.patch('/admin/users/:id',y.usertomentor, Auth.verifyAdmin, admincontroller.AdminController.CheckToMentor);
// admin can delete user
adminRoutes.delete('/admin/users/:id',y.deleteuser, Auth.verifyAdmin, admincontroller.AdminController.DeleteOneUser);

export default adminRoutes;