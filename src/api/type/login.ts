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

export interface IBorrow {
  id: number;
  borrow_reader_id: number;
  borrow_book_isbn: string;
  is_borrow: string;
  borrow_time: string;
  should_return_time: string;
  is_return: string;
  really_return_time: string;
  agree_borrow_time?: string;
}
