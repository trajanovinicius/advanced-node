//Utilizando comand patterns para deixar o código mais bem escrito.
import { LoadFacebookUserApi } from "@/data/contracts/apis";
import { LoadUserAccountRepository, SaveFacebookAccountRepository } from "@/data/contracts/repos";
import { FacebookAuthenticationService } from "../../../src/data/services/facebook-authentication";
import { AuthenticationError } from "../../../src/domain/errors";

import { mock, MockProxy } from "jest-mock-extended";

describe("FacebookAuthenticationService", () => {
  let facebookApi: MockProxy<LoadFacebookUserApi>;
  let userAccountRepo: MockProxy<LoadUserAccountRepository & SaveFacebookAccountRepository>; // union type
  //União do três tipos, não precisamos colocar uma outra depedência
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
    userAccountRepo.load.mockResolvedValue(undefined);
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

  it("Should create account with facebook data", async () => {
    await sut.perform({ token });

    expect(userAccountRepo.saveWithFacebook).toHaveBeenCalledWith({
      email: "any_fb_email",
      name: "any_fb_name",
      facebookId: "any_fb_id",
    });
    expect(userAccountRepo.saveWithFacebook).toBeCalledTimes(1);
  });

  it("Should not update account name", async () => {
  userAccountRepo.load.mockResolvedValueOnce({
    id: 'any_id', //toda vez que tivermos um campo opcional, provavelmente vamos precisar fazer test com valor e sem valor
    name: 'any_name'
  })

  await sut.perform({ token });

  expect(userAccountRepo.saveWithFacebook).toHaveBeenCalledWith({
    id: 'any_id',
    name: "any_name",
    email: "any_fb_email",
    facebookId: "any_fb_id",
  });
  expect(userAccountRepo.saveWithFacebook).toHaveBeenCalledTimes(1);
 });

  it("Should call update account name", async () => {
  userAccountRepo.load.mockResolvedValueOnce({
    id: 'any_id', 
  })

  await sut.perform({ token });

  expect(userAccountRepo.saveWithFacebook).toHaveBeenCalledWith({
    id: 'any_id',
    name: "any_fb_name",
    email: "any_fb_email",
    facebookId: "any_fb_id",
  });
  expect(userAccountRepo.saveWithFacebook).toHaveBeenCalledTimes(1);
 });
})


