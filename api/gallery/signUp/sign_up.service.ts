import { UserCredentials } from "@interfaces/user-credentials.interface";
import { connectDB } from "@services/db_connection";
import UsersModel from "@models/MongoDB/user.model";
import * as crypto from "crypto";
import { getEnv } from "@helper/environment";
import {
  SignUpErrorMessage,
  SignUpMessage,
  SignUpResponse,
} from "./sign_up.interfaces";
import * as bcrypt from "bcrypt";

export class SignUpService {
  errorMessage: SignUpErrorMessage;
  message: SignUpMessage;
  response: SignUpResponse;

  constructor() {
    this.errorMessage = { errorMessage: "User already exists" };
    this.message = { message: "Signed up" };
    this.response = {
      statusCode: 200,
      message: this.message,
    };
  }

  async signUp(credentials: UserCredentials): Promise<SignUpResponse> {
    await connectDB;
    if (await UsersModel.exists({ email: credentials.email })) {
      this.response.statusCode = 300;
      this.response.message = this.errorMessage;
      return this.response;
    } else {
      await UsersModel.create({
        email: credentials.email,
        password: await hashPassword(credentials.password),
      });

      this.response.statusCode = 200;
      this.response.message = this.message;
      return this.response;
    }
  }
}

async function hashPassword(password: string) {
  console.log("Pasword in function: ", password);
  const saltRounds = process.env.SALT_ROUNDS;
  const salt = await getSalt(Number(saltRounds));
  const hashedPassword = await bcrypt.hash(password, salt);
  console.log("hashed password: ", hashedPassword);
  return hashedPassword;
}

async function getSalt(saltRounds: number) {
  const salt = await bcrypt.genSalt(saltRounds);
  console.log("Salt: ", salt);
  return salt;
}
