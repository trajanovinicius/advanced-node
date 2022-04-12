//Utilizando comand patterns para deixar o código mais bem escrito.
import { AuthenticationError } from "../../../src/domain/errors";
import { FacebookAuthentication } from "@/domain/features/facebook-authentication";
import { LoadFacebookUserApi } from "@/data/contracts/apis";

class FacebookAuthenticationService {
  constructor(private readonly loadFacebookUserApi: LoadFacebookUserApi) {}

  async perform(
    params: FacebookAuthentication.Params
  ): Promise<AuthenticationError> {
    await this.loadFacebookUserApi.loadUser(params);
    return new AuthenticationError();
  }
}

class LoadFacebookUserApiSpy implements LoadFacebookUserApi {
  token?: string;
  result = undefined;

  async loadUser(
    params: LoadFacebookUserApi.Params
  ): Promise<LoadFacebookUserApi.Result> {
    this.token = params.token;
    return this.result;
  }
}

describe("FacebookAuthenticationService", () => {
  it("should return AuthenticationError when LoadFacebookUserApi returns undefined", async () => {
    const loadFacebookUserApi = new LoadFacebookUserApiSpy();
    loadFacebookUserApi.result = undefined;
    const sut = new FacebookAuthenticationService(loadFacebookUserApi);

    const authResult = await sut.perform({ token: "any_token" });

    expect(authResult).toEqual(new AuthenticationError());
  });
});
