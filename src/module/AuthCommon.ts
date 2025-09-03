export interface PayloadLogin {
  username: string;
  password: string;
}

export interface UserProfile {
    data?: Data,
    status: 'init' | 'error' |'sucsess' | 'logout',
    roleCode: string
}

interface Data {
  userId?: number;
  username?: string;
  roleCode?: string;
  roleName?: string;
  listMenu?: ListMenu[];
}

export interface ListMenu {
  objectId?: number;
  objectCode?: string;
  title?: string;
  icons?: string;
  objectUrl?: string;
  listMenuChild?: ListMenuChild[];
  listMenuComponent?: any[];
  role?: String;
}

interface ListMenuChild {
  objectId?: number;
  objectCode?: string;
  icons?: string;
  title?: string;
  objectUrl?: string;
  listMenuChild?: any[];
  listMenuComponent?: any[];
}
