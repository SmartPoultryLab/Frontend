/* Defines the User entity */
export class BasicUser {
  fullName: string;
  email: string;
  avatarUrl: string | Avatar;
}
export class User extends BasicUser{
    id: number;
    token: string;
    isAuthenticated: boolean;
    password: string;
}

export class Avatar {
  file_type:string;
  contents: string;
}

export interface Password_Parameters {
  password :string,
  password_confirmation :string,
}
