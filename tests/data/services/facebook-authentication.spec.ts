//Utilizando comand patterns para deixar o código mais bem escrito.
import { LoadFacebookUserApi } from "@/data/contracts/apis";
import { LoadUserAccountRepository } from "@/data/contracts/repos";
import { FacebookAuthenticationService } from "../../../src/data/services/facebook-authentication";
import { AuthenticationError } from "../../../src/domain/errors";

import { mock, MockProxy } from "jest-mock-extended";

describe("FacebookAuthenticationService", () => {
  let loadFacebookUserApi: MockProxy<LoadFacebookUserApi>;
  let loadUserAccountRepo: MockProxy<LoadUserAccountRepository>;
  let sut: FacebookAuthenticationService;
  const token = "any_token";

  beforeEach(() => {
    loadFacebookUserApi = mock();
    loadFacebookUserApi.loadUser.mockResolvedValue({
      name: "any_fb_name",
      email: "any_fb_email",
      facebookId: "any_fb_id",
    });
    loadUserAccountRepo = mock();
    sut = new FacebookAuthenticationService(
      loadFacebookUserApi,
      loadUserAccountRepo
    );
  });

  it("should call LoadFacebookUserApi with correct params", async () => {
    await sut.perform({ token });

    expect(loadFacebookUserApi.loadUser).toHaveBeenCalledWith({
      token,
    });
    expect(loadFacebookUserApi.loadUser).toBeCalledTimes(1);
  });

  it("Should return AuthenticationError when LoadFacebookUserApi returns undefined", async () => {
    loadFacebookUserApi.loadUser.mockResolvedValueOnce(undefined);

    const authResult = await sut.perform({ token });

    expect(authResult).toEqual(new AuthenticationError());
  });

  it("Should call LoadUserAccountRepo when LoadFacebookUserApi returns data", async () => {
    await sut.perform({ token });

    expect(loadUserAccountRepo.load).toHaveBeenCalledWith({
      email: "any_fb_email",
    });
    expect(loadUserAccountRepo.load).toBeCalledTimes(1);
  });
});
