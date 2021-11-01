import { SignUpService } from "./sign_up.service";
import { HttpBadRequestError } from "@errors/http";
import { connectDB } from "@services/db_connection";
import UserModel from "@models/MongoDB/user.model";
import * as bcrypt from "bcrypt";
import { log } from "@helper/logger";

export class SignUpManager {
  private readonly service: SignUpService;
  constructor() {
    this.service = new SignUpService();
  }

  async signUp(user) {
    const isInDB = await this.isUserInDB(user);
    if (isInDB) {
      return {
        statusCode: 400,
        message: { errorMessage: "User already exists " },
      };
    } else {
      this.service.createUser(user);
      return {
        statusCode: 200,
        message: { message: "Signed up" },
      };
    }
  }

  async isUserInDB(user) {
    await connectDB;

    const data = await UserModel.findOne({ email: user.email }).then((data) => {
      if (data) {
        return true;
      } else return false;
    });
    console.log(data);
    return data;
  }
}
