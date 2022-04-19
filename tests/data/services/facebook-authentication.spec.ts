//Utilizando comand patterns para deixar o código mais bem escrito.
import { AuthenticationError } from "../../../src/domain/errors";
import { FacebookAuthenticationService } from "../../../src/data/services/facebook-authentication";
import { mock } from "jest-mock-extended";
import { LoadFacebookUserApi } from "@/data/contracts/apis";

describe("FacebookAuthenticationService", () => {
  it("should call LoadFacebookUserApi with correct params", async () => {
    const loadFacebookUserApi = mock<LoadFacebookUserApi>(); // faz o jest mock automático

    const sut = new FacebookAuthenticationService(loadFacebookUserApi);

    await sut.perform({ token: "any_token" });

    expect(loadFacebookUserApi.loadUser).toHaveBeenCalledWith({
      token: "any_token",
    });
    expect(loadFacebookUserApi.loadUser).toBeCalledTimes(1);
  });
  it("Should return AuthenticationError when LoadFacebookUserApi returns undefined", async () => {
    const loadFacebookUserApi = mock<LoadFacebookUserApi>();
    loadFacebookUserApi.loadUser.mockResolvedValueOnce(undefined);
    const sut = new FacebookAuthenticationService(loadFacebookUserApi);

    const authResult = await sut.perform({ token: "any_token" });

    expect(authResult).toEqual(new AuthenticationError());
  });
});
