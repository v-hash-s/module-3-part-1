import { HttpBadRequestError } from "@errors/http";
import { LoginService } from "./login.service";
import { UserCredentials } from "@interfaces/user-credentials.interface";
import { connectDB } from "@services/db_connection";
import UserModel from "@models/MongoDB/user.model";
import * as bcrypt from "bcrypt";
import { log } from "@helper/logger";
export class LoginManager {
  private readonly service: LoginService;
  constructor() {
    this.service = new LoginService();
  }
  async findUserInDB(user: UserCredentials) {
    await connectDB;

    const data = await UserModel.findOne({ email: user.email }).then((data) => {
      if (bcrypt.compareSync(user.password, data.password)) {
        log("USER PASSWORD: ", user.password);
        log("DB PASSWORD: ", data.password);
        return true;
      } else return false;
    });
    console.log(data);
    return data;
  }

  async sendResponseToUser(user) {
    let isInDB = await this.findUserInDB(user);
    if (isInDB) {
      return {
        statusCode: 200,
        content: { token: this.service.signJWTToken(user.email) },
      };
    } else {
      return {
        statusCode: 404,
        content: { errorMessage: "User not found" },
      };
    }
  }
}
