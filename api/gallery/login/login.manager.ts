import { HttpBadRequestError } from "@errors/http";
import { LoginService } from "./login.service";
import { UserCredentials } from "@interfaces/user-credentials.interface";
import { connectDB } from "@services/db_connection";
import UsersModel from "@models/MongoDB/user.model";
import * as bcrypt from "bcrypt";

export class LoginManager {
  private readonly service: LoginService;
  constructor() {
    this.service = new LoginService();
  }

  async checkUserAndSignJWT(user: UserCredentials) {
    return { message: "checkUserAndSignJWT" };

    //   await connectDB;
    //   let usersPassword = user.password;
    //   let userDB = await UsersModel.findOne({ email: user.email });
    //   console.log(`userDB: ${userDB}`);
    //   if (bcrypt.compareSync(usersPassword, userDB.password)) {
    //     return this.service.signJWTToken(user.email);
    //   } else {
    //     throw new HttpBadRequestError("User not found");
    //   }
  }
}
