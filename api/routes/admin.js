import Router from 'express';
import admincontroller from '../controllers/admin';
import Auth from '../middleware/auth';

const adminRoutes = Router();


// admin create account
adminRoutes.post('/auth/admin/signup', admincontroller.AdminController.RegisterAdmin);
// admin log in
adminRoutes.post('/auth/admin/login', admincontroller.AdminController.AdminLogin);
// admin can view all users registered
adminRoutes.get('/admin/users/all', Auth.verifyAdmin, admincontroller.AdminController.GetAllUsers);
// admin get a user by id
adminRoutes.get('/admin/users/:id', Auth.verifyAdmin, admincontroller.AdminController.GetOneUser);
// admin changes user to mentor or viseversa
adminRoutes.patch('/admin/users/:id',Auth.verifyAdmin, admincontroller.AdminController.CheckToMentor);
// admin can delete user
adminRoutes.delete('/admin/users/:id',Auth.verifyAdmin, admincontroller.AdminController.DeleteOneUser);

export default adminRoutes;