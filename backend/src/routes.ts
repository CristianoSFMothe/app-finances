import { Router } from 'express'
import { CreateUserController } from './controllers/user/CreateUserController'
import { AuthUserController } from './controllers/user/AuthUserController'
import { ListDetailUserController } from './controllers/user/ListDetailUserController'
import { ListUserBalanceController } from './controllers/user/ListUserBalanceController'
import { CreateReceiveController } from './controllers/receive/CreateReceiveController'
import { ListReceivesController } from './controllers/receive/ListReceivesController'
import { DeleteReceiveController } from './controllers/receive/DeleteReceiveController'


import { isAuthenticated } from './middlewares/isAuthenticated';
import { ListUsersController } from './controllers/user/ListAllUsersController'

const router = Router();

// -- ROTAS --

// --- USER ---
router.post('/users', new CreateUserController().handle);

router.get('/users', isAuthenticated, new ListUsersController().handle)

// --- Auth ---

router.post("/login", new AuthUserController().handle);

router.get("/login/me", isAuthenticated, new ListDetailUserController().handle);

// --- USER BALANCE ---

router.get("/balance", isAuthenticated, new ListUserBalanceController().handle);

router.post("/receive", isAuthenticated, new CreateReceiveController().handle);

router.get("/receives", isAuthenticated, new ListReceivesController().handle);

router.delete("/receives/delete", isAuthenticated, new DeleteReceiveController().handle);

export { router };