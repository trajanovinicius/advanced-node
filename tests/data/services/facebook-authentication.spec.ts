//Utilizando comand patterns para deixar o código mais bem escrito.
import { LoadFacebookUserApi } from "@/data/contracts/apis";
import { LoadUserAccountRepository, CreateFacebookAccountRepository, } from "@/data/contracts/repos";
import { FacebookAuthenticationService } from "../../../src/data/services/facebook-authentication";
import { AuthenticationError } from "../../../src/domain/errors";

import { mock, MockProxy } from "jest-mock-extended";

describe("FacebookAuthenticationService", () => {
  let facebookApi: MockProxy<LoadFacebookUserApi>;
  let userAccountRepo: MockProxy<LoadUserAccountRepository & CreateFacebookAccountRepository>;
  let sut: FacebookAuthenticationService;
  const token = "any_token";

  beforeEach(() => {
    facebookApi = mock();
    facebookApi.loadUser.mockResolvedValue({
      name: "any_fb_name",
      email: "any_fb_email",
      facebookId: "any_fb_id",
    });
    userAccountRepo = mock();
    sut = new FacebookAuthenticationService(facebookApi, userAccountRepo);
  });

  it("should call LoadFacebookUserApi with correct params", async () => {
    await sut.perform({ token });

    expect(facebookApi.loadUser).toHaveBeenCalledWith({token});
    expect(facebookApi.loadUser).toBeCalledTimes(1);
  });

  it("Should return AuthenticationError when LoadFacebookUserApi returns undefined", async () => {
    facebookApi.loadUser.mockResolvedValueOnce(undefined);

    const authResult = await sut.perform({ token });

    expect(authResult).toEqual(new AuthenticationError());
  });

  it("Should call LoadUserAccountRepo when LoadFacebookUserApi returns data", async () => {
    await sut.perform({ token });

    expect(userAccountRepo.load).toHaveBeenCalledWith({email: "any_fb_email"});
    expect(userAccountRepo.load).toBeCalledTimes(1);
  });

  it("Should call CreateFacebookAccountRepo when LoadUserAccountRepo returns undefined", async () => {
    userAccountRepo.load.mockResolvedValueOnce(undefined);

    await sut.perform({ token });

    expect(userAccountRepo.createFromFacebook).toHaveBeenCalledWith({
      email: "any_fb_email",
      name: "any_fb_name",
      facebookId: "any_fb_id",
    });
    expect(userAccountRepo.createFromFacebook).toBeCalledTimes(1);
  });
});


