import { Router } from 'express';

import UserController from './app/controllers/UserController';
import StudentController from './app/controllers/StudentController';
import SessionController from './app/controllers/SessionController';
import PlanController from './app/controllers/PlanController';
import MembershipController from './app/controllers/MembershipController';
import CheckinController from './app/controllers/CheckinController';
import OrderController from './app/controllers/OrderController';
import AnswerController from './app/controllers/AnswerController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.get('/students/:id/checkins', CheckinController.index);
routes.post('/students/:id/checkins', CheckinController.store);

routes.get('/students/:id/help-orders', OrderController.index);
routes.post('/students/:id/help-orders', OrderController.store);

/**
 * Authentication middleware, all routes that
 * need authenticated user comes after this
 */
routes.use(authMiddleware);

routes.put('/users', UserController.update);

routes.post('/help-orders/:id/answer', AnswerController.store);

routes.post('/students', StudentController.store);
routes.get('/students', StudentController.index);
routes.put('/students/:id', StudentController.update);

routes.post('/plans', PlanController.store);
routes.get('/plans', PlanController.index);
routes.put('/plans/:id', PlanController.update);
routes.delete('/plans/:id', PlanController.delete);

routes.post('/membership', MembershipController.store);
routes.get('/membership', MembershipController.index);
routes.put('/membership/:studentId', MembershipController.update);
routes.delete('/membership/:studentId', MembershipController.delete);

export default routes;
