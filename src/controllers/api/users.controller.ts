import { Request, Response } from "express";
import userModel from "../../models/User.model";
import controller from "../controllers.main";

class UsersApi extends controller {

    async find(req: Request, res: Response) {
        let query: any = req.query;
        if (query.username)
            query = { username: new RegExp(query.username, 'i') }
        const user = req.currentUser
        const users = await userModel.find({
            username: query.username,
            userId: { $ne: user.userId }
        }, 'avatar userId username -_id', {
            limit: 10
        });
        res.json(users);
    }


}

export default new UsersApi();