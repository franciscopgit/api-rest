import { Router } from "express";
import userController from "../controllers/UserController";
import loginRequired from "../middlewares/loginRequired";

const router = new Router();

// Não deveria existir
// router.get('/:id', userController.show);

// Rotas realmente uteis
router.post("/", userController.store); // usando um middlewere na rota que cria users
router.put("/", loginRequired, userController.update);
router.delete("/", loginRequired, userController.delete);
router.get("/", userController.index); // usando um middlewere na rota que mostra os users do banco de dados
export default router;

/*
index -> lista todos os usuarios -> GET
store ou create -> cria novo usuario -> POST
delete -> apaga um usuario -> DELETE
show -> mostra um usuario -> GET
update -> atualiza usuario -> PATCH ou PUT
*/
