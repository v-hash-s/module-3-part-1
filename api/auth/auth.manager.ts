import { HttpBadRequestError } from "@errors/http";
import { AuthService } from "./auth.service";
import { connectDB } from "@services/db_connection";
import UserModel from "@models/MongoDB/user.model";
import * as bcrypt from "bcrypt";
import { log } from "@helper/logger";
import { User, Response } from "./auth.interfaces";

export class AuthManager {
  private readonly service: AuthService;
  constructor() {
    this.service = new AuthService();
  }
  async findUserInDB(user: User): Promise<boolean> {
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

  async sendResponseToUser(user: User): Promise<Response> {
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

  async signUp(user: User): Promise<Response> {
    const isInDB = await this.isUserInDB(user);
    if (isInDB) {
      return {
        statusCode: 400,
        content: { errorMessage: "User already exists " },
      };
    } else {
      this.service.createUser(user);
      return {
        statusCode: 200,
        content: { message: "Signed up" },
      };
    }
  }

  async isUserInDB(user: User): Promise<boolean> {
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
