import { Controller, Get, Post, Body, Patch, Request, HttpException, HttpStatus } from '@nestjs/common';
import { UsersService } from '../services/users.service'; 
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserJwtResponse, UserProfileResponse, UserResponse } from 'src/types/userResponse.type';
import { UserLoginDto } from 'src/dto/user-login.dto';
import { ExpressRequest } from 'src/middlewares/auth.middleware';
import { UserPasswordDto } from 'src/dto/user-password.dto';
import { UserResetPasswordDto } from 'src/dto/user-resetpassword.dto';
import { ApiResponse } from 'src/types/ApiResponse.type';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('signup')
  async create(@Body() createUserDto: CreateUserDto) : Promise<UserResponse>{
    const user = await this.usersService.create(createUserDto);
    return this.usersService.buildUserResponse(user);
  }

  @Post('signin')
  async login(@Body() userLoginDto: UserLoginDto) : Promise<UserResponse>{
    const user = await this.usersService.loginUser(userLoginDto);
    return this.usersService.buildUserResponse(user);
  }

  @Get('profile')
  async findOne(@Request() req: ExpressRequest): Promise<UserProfileResponse> {
    if(!req.user){
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
    return this.usersService.buildUserProfileResponse(req.user);
  }

  @Patch('update')
  async update(@Request() req: ExpressRequest , @Body() updateUserDto: UpdateUserDto): Promise<UserProfileResponse> {
    if(!req.user){
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
    return await this.usersService.update(req.user._id, updateUserDto);
  }

  @Post('delete')
  async remove(@Request() req: ExpressRequest, @Body() userPasswordDto: UserPasswordDto) : Promise<ApiResponse>{ 
    if(!req.user){
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
    return await this.usersService.remove(req.user._id, userPasswordDto);
  }

  @Post('resetpassword')
  async changePassword(@Request() req: ExpressRequest, @Body() userResetPasswordDto: UserResetPasswordDto) : Promise<ApiResponse>{ 
    if(!req.user){
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
    return await this.usersService.changePassword(req.user._id, userResetPasswordDto);
  }

  @Get('resettoken')
  async resetToken(@Request() req: ExpressRequest) : Promise<UserJwtResponse>{
    if(!req.user){
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
    return await this.usersService.buildUserJwtResponse(req.user);
  }
}
