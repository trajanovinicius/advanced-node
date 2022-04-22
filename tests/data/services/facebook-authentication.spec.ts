//Utilizando comand patterns para deixar o código mais bem escrito.
import { AuthenticationError } from "../../../src/domain/errors";
import { FacebookAuthenticationService } from "../../../src/data/services/facebook-authentication";
import { mock, MockProxy } from "jest-mock-extended";
import { LoadFacebookUserApi } from "@/data/contracts/apis";

type SutTypes = {
  sut: FacebookAuthenticationService;
  loadFacebookUserApi: MockProxy<LoadFacebookUserApi>;
};
const makeSut = (): SutTypes => {
  const loadFacebookUserApi = mock<LoadFacebookUserApi>();
  const sut = new FacebookAuthenticationService(loadFacebookUserApi);
  return {
    sut,
    loadFacebookUserApi,
  };
};

describe("FacebookAuthenticationService", () => {
  it("should call LoadFacebookUserApi with correct params", async () => {
    // faz o jest mock automático

    const { sut, loadFacebookUserApi } = makeSut();

    await sut.perform({ token: "any_token" });

    expect(loadFacebookUserApi.loadUser).toHaveBeenCalledWith({
      token: "any_token",
    });
    expect(loadFacebookUserApi.loadUser).toBeCalledTimes(1);
  });
  it("Should return AuthenticationError when LoadFacebookUserApi returns undefined", async () => {
    const { sut, loadFacebookUserApi } = makeSut();

    loadFacebookUserApi.loadUser.mockResolvedValueOnce(undefined);

    const authResult = await sut.perform({ token: "any_token" });

    expect(authResult).toEqual(new AuthenticationError());
  });
});
