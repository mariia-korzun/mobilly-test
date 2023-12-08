export default interface IAuthState {
  clientId: string;
  clientSecret: string;
  token?: IAccessToken;
}

export interface IAccessToken {
  accessToken: string;
  tokenType: string;
}
