import { FacebookAuthentication } from "@/domain/features/facebook-authentication";
import { LoadFacebookUserApi } from "@/data/contracts/apis";
import { AuthenticationError } from "../../../src/domain/errors";

export class FacebookAuthenticationService {
  constructor(private readonly loadFacebookUserApi: LoadFacebookUserApi) {}

  async perform(
    params: FacebookAuthentication.Params
  ): Promise<AuthenticationError> {
    await this.loadFacebookUserApi.loadUser(params);
    return new AuthenticationError();
  }
}
