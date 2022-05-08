export interface ILoginResult {
  data: ITokenResult;
}
export interface ITokenResult {
  token: string;
}

export interface IBookTypeTree {
  id: number;
  name: string;
  pId: number;
  remake?: string;
  level?: string;
  children?: Array<IBookTypeTree>;
}
