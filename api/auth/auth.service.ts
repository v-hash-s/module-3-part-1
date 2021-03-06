import { getEnv } from "@helper/environment";
import * as jwt from "jsonwebtoken";
import { connectDB } from "@services/db_connection";
import UserModel from "@models/MongoDB/user.model";
import { Token, User } from "./auth.interfaces";
import * as bcrypt from "bcrypt";

export class AuthService {
  signJWTToken(userEmail: string): string {
    return jwt.sign({ email: userEmail }, getEnv("TOKEN_KEY"));
  }

  async createUser(user: User) {
    await connectDB;
    const newUser = new UserModel({
      email: user.email,
      password: await this.hashPassword(user.password),
    });

    await newUser.save().then((result) => console.log(result));
  }

  async hashPassword(password: string): Promise<string> {
    console.log("Pasword in function: ", password);
    const saltRounds = getEnv("SALT_ROUNDS");
    const salt = await this.getSalt(Number(saltRounds));
    const hashedPassword = await bcrypt.hash(password, salt);
    console.log("hashed password: ", hashedPassword);
    return hashedPassword;
  }

  async getSalt(saltRounds: number): Promise<number> {
    const salt = await bcrypt.genSalt(saltRounds);
    console.log("Salt: ", salt);
    return salt;
  }
}
