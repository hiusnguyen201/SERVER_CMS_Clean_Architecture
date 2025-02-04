import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  HttpCode,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { GetUsersDto } from './dto/get-users.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createUserDto: CreateUserDto) {
    const data = await this.usersService.create(createUserDto);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Create a new user successfully',
      data,
    };
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(@Query() query: GetUsersDto) {
    const data = await this.usersService.findAll(query);
    return {
      statusCode: HttpStatus.OK,
      message: 'Get all users successfully',
      data,
    };
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id') id: string) {
    const data = await this.usersService.findOneById(id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Get one user successfully',
      data,
    };
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const data = await this.usersService.updateById(id, updateUserDto);
    return {
      statusCode: HttpStatus.OK,
      message: 'Update user successfully',
      data,
    };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string) {
    await this.usersService.removeById(id);
    return {
      statusCode: HttpStatus.NO_CONTENT,
      message: 'Remove user successfully',
    };
  }
}
