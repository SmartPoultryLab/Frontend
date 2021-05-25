/* Defines the User entity */
export class User {
    id: number;
    token: string;
    fullName: string;
    password: string;
    email: string;
    avatarUrl: string;
    isAuthenticated: boolean;
}
