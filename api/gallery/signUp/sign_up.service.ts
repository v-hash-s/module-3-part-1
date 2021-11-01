import { connectDB } from "@services/db_connection";
import UserModel from "@models/MongoDB/user.model";
import { getEnv } from "@helper/environment";

import * as bcrypt from "bcrypt";

export class SignUpService {
  async createUser(user) {
    await connectDB;
    const newUser = new UserModel({
      email: user.email,
      password: await this.hashPassword(user.password),
    });

    await newUser.save().then((result) => console.log(result));
  }

  async hashPassword(password: string) {
    console.log("Pasword in function: ", password);
    const saltRounds = getEnv("SALT_ROUNDS");
    const salt = await this.getSalt(Number(saltRounds));
    const hashedPassword = await bcrypt.hash(password, salt);
    console.log("hashed password: ", hashedPassword);
    return hashedPassword;
  }

  async getSalt(saltRounds: number) {
    const salt = await bcrypt.genSalt(saltRounds);
    console.log("Salt: ", salt);
    return salt;
  }
}
