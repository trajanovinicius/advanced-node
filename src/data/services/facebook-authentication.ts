import { FacebookAuthentication } from "@/domain/features/facebook-authentication";
import { LoadFacebookUserApi } from "@/data/contracts/apis";
import {
  LoadUserAccountRepository,
  SaveFacebookAccountRepository,
} from "@/data/contracts/repos";
import { AuthenticationError } from "../../../src/domain/errors";
import { FacebookAccount } from "@/domain/features/models";

export class FacebookAuthenticationService {
  constructor(
    private readonly facebookApi: LoadFacebookUserApi,
    private readonly userAccountRepo: LoadUserAccountRepository &
      SaveFacebookAccountRepository
  ) {}

  async perform(params: FacebookAuthentication.Params): Promise<AuthenticationError> {
    const fbData = await this.facebookApi.loadUser(params);

    if (fbData !== undefined) {
      const accountData = await this.userAccountRepo.load({email: fbData.email});
      const fbAccount = new FacebookAccount(fbData, accountData)
      await this.userAccountRepo.saveWithFacebook(fbAccount);
    }
    return new AuthenticationError();
  }
} // Essa é a vantagem de criar modelos específicos para os casos que precisamos
//o código fica bem mais clean
