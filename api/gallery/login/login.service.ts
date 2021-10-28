// import { UserCredentials } from "@interfaces/user-credentials.interface";
// import UserModel from "@models/MongoDB/user.model";
// import * as bcrypt from "bcrypt";
// import * as jwt from "jsonwebtoken";
// import { getEnv } from "@helper/environment";

// export class LoginService {
//   async toValidateUser() {
//     async function isValidUser(user: UserCredentials) {
//       const data = await UserModel.findOne(
//         { email: user.email },
//         { email: 1, password: 1 }
//       ).then(function (data: any) {
//         if (data) {
//           const isValidPassword = bcrypt.compareSync(
//             user.password,
//             data.password
//           );
//           console.log("Is valid password: ", isValidPassword);
//           if (data.email === user.email && isValidPassword) {
//             return true;
//           } else {
//             return false;
//           }
//         }
//       });
//       console.log(data);

//       return data;
//     }

//     async function sendToken(email: string) {
//       let token = await UserModel.findOne({ email: email }).then(
//         (user: any) => {
//           console.log("EMAIL FROM MONGO: ", user.email);
//           const userEmail = { email: user.email };
//           const accessToken = jwt.sign(userEmail, getEnv("TOKEN_KEY"), {
//             expiresIn: 600000,
//           });
//           return accessToken;
//         }
//       );
//       console.log("IN FUNCTION: ", token);
//       return token;
//     }
//   }
// }

import { getEnv } from "@helper/environment";
import * as jwt from "jsonwebtoken";

export class LoginService {
  signJWTToken(userEmail: string) {
    return jwt.sign({ email: userEmail }, getEnv("TOKEN_KEY"));
  }
}
