import { HttpBadRequestError } from "@errors/http";
import { LoginService } from "./login.service";
import { UserCredentials } from "@interfaces/user-credentials.interface";

export class LoginManager {
  private readonly service: LoginService;
  constructor() {
    this.service = new LoginService();
  }
}
