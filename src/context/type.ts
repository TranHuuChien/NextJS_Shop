
export type LoginParams = {
  email: string;
  password: string;
  rememberMe: boolean;
  deviceToken: string;
}

export type RegisterParams = {
  email: string;
  password: string;
  fullName: string;
  phone: string;
  deviceToken: string;
}

export type UserDataType = {
   _id: string
  role: {
    name: string
    permissions: string[]
  }
  email: string,
  fullName: string,
  phone: string,
  avatar: string,
  address: string,
  gender: string,
  dateOfBirth: string,
  createdAt: string,
  updatedAt: string,
}

export type AuthContextType = {
  loading: boolean;
  user: UserDataType | null;
  login: (params: LoginParams) => Promise<void>;
  register: (params: RegisterParams) => Promise<void>;
  logout: () => void;
  setUser: (user: UserDataType | null) => void;
}