import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { User } from 'src/entities/user.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserJwtResponse, UserProfileResponse, UserResponse } from 'src/types/userResponse.type';
import { UserLoginDto } from 'src/dto/user-login.dto';
import { compare, hash } from 'bcrypt';
import {sign} from 'jsonwebtoken';
import { UserPasswordDto } from 'src/dto/user-password.dto';
import { UserResetPasswordDto } from 'src/dto/user-resetpassword.dto';
import { ApiResponse } from 'src/types/ApiResponse.type';

@Injectable()
export class UsersService {

  constructor(@InjectModel(User.name) private userModel : Model<User>){} 
  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = await this.userModel.findOne({email: createUserDto.email});
    if(user){
      throw new HttpException('User already exists', HttpStatus.UNPROCESSABLE_ENTITY);
    }
    const createUser = new this.userModel(createUserDto);
    return await createUser.save();
  }
  async loginUser(userLoginDto: UserLoginDto): Promise<User> {
    const user = await this.userModel.findOne({email: userLoginDto.email}).select('+password');
    if(!user){
      throw new HttpException('User does not exist', HttpStatus.UNPROCESSABLE_ENTITY);
    }
    const isMatch = await compare(userLoginDto.password, user.password);
    if(!isMatch){
      throw new HttpException('Incorrect password', HttpStatus.UNPROCESSABLE_ENTITY);
    }
    return user
  }
  async findOne(id: string): Promise<User>{
    return await this.userModel.findOne({_id: id});
  }

  async update(id: string, updateUserDto: UpdateUserDto) : Promise<UserProfileResponse> {
    try {
      await this.userModel.findByIdAndUpdate(id, updateUserDto, {new: false})
      const user =  await this.findOne(id);
      return this.buildUserProfileResponse(user);
    } catch (error) {
      throw new HttpException('Failed to Update', HttpStatus.BAD_REQUEST);
    }
  }
  async remove(id: string,  userPasswordDto: UserPasswordDto): Promise<ApiResponse> {
    const user = await this.userModel.findOne({_id: id}).select('+password');
    if(!user){
      throw new HttpException('User does not exist', HttpStatus.UNPROCESSABLE_ENTITY);
    }
    const isMatch = await compare(userPasswordDto.password, user.password);
    if(!isMatch){
      throw new HttpException('Incorrect password', HttpStatus.UNPROCESSABLE_ENTITY);
    }
    await this.userModel.findByIdAndDelete(id);
    return {
      statusCode: 200,
      message: 'User deleted successfully',
    }
  }

  async changePassword(id: string, userPasswordDto: UserResetPasswordDto): Promise<ApiResponse> {
    const user = await this.userModel.findOne({_id: id}).select('+password');
    if(userPasswordDto.oldpassword === userPasswordDto.newpassword){
      throw new HttpException('New password cannot be same as old password', HttpStatus.UNPROCESSABLE_ENTITY);
    }
    if(!user){
      throw new HttpException('User does not exist', HttpStatus.UNPROCESSABLE_ENTITY);
    }
    const isMatch = await compare(userPasswordDto.oldpassword, user.password);
    if(!isMatch){
      throw new HttpException('Incorrect old password', HttpStatus.UNPROCESSABLE_ENTITY);
    }
    const newPassword = await hash(userPasswordDto.newpassword, 10);
    await this.userModel.findByIdAndUpdate(id, {password: newPassword});
    return {
      statusCode: 200,
      message: 'Password changed successfully',
    }
  }

  buildUserResponse(user: User): UserResponse{
    return {
      _id: user._id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      created_At: user.created_At,
      updated_At: user.updated_At,
      statusCode: 200,
      access_token: this.generateJwt(user, '7d'),
      refresh_token: this.generateJwt(user, '30d')    
    }
  }

  buildUserProfileResponse(user: User): UserProfileResponse{
    return {
      _id: user._id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      created_At: user.created_At,
      updated_At: user.updated_At,
      statusCode: 200  
    }
  }

  buildUserJwtResponse(user: User): UserJwtResponse{
    return {
      statusCode: 200,
      access_token: this.generateJwt(user, '7d'),
      refresh_token: this.generateJwt(user, '30d')    
    }
  }

  generateJwt(user: User, time: string): string{
    const secret = process.env.JWT_SECRET;
    if(!secret){
      throw new Error('JWT_SECRET not defined');
    }
    const data = {email: user.email, _id: user._id};
    return sign(data, secret, {expiresIn: time});
  }
}
