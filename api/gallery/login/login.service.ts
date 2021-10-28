import { UserCredentials } from "@interfaces/user-credentials.interface";
import UserModel from "@models/MongoDB/user.model";
import { SignUpService } from "../signUp/sign_up.service";
import * as bcrypt from bcrypt;

export class LoginService {
  constructor() {}
}

async function isValidUser(user: UserCredentials) {
  const data = await UserModel.findOne(
    { email: user.email },
    { email: 1, password: 1 }
  ).then(function (data: any) {
    if (data) {
      const isValidPassword = bcrypt.compareSync(user.password, data.password);
      console.log("Is valid password: ", isValidPassword);
      if (data.email === user.email && isValidPassword) {
        return true;
      } else {
        return false;
      }
    }
  });
  console.log(data);

  return data;
}
