export type User = {
  id: number;
  name: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
};

type Address = {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
};

type Geo = {
  lat: string;
  lng: string;
};

type Company = {
  name: string;
  catchPhrase: string;
  bs: string;
};

export type Post = {
  userId: User["id"];
  id: number;
  title: string;
  body: string;
};

export type Todo = {
  id: number;
  userId: User["id"];
  title: string;
  completed: boolean;
};

export type NormalizedState<T> = {
  byId: {
    [K: number]: T;
  };
  allIds: number[];
};
