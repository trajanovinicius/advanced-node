import { AccessToken } from "@/domain/features/models";
import { AuthenticationError } from "@/domain/errors";

export interface FacebookAuthentication {
  perform: (
    params: FacebookAuthentication.Params
  ) => Promise<FacebookAuthentication.Result>;
}

namespace FacebookAuthentication {
  // evita conflitos de nomes
  export type Params = {
    token: string; //Comand pattern
  };
  export type Result = AccessToken | AuthenticationError;
}
