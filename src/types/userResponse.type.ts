import { User } from "src/entities/user.entity";

export type UserResponse = Omit<User, 'password'> & { statusCode: number, access_token: string, refresh_token: string }

export type UserProfileResponse = Omit<User, 'password'> & { statusCode: number }
