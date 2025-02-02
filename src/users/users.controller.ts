import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  HttpStatus,
  HttpCode,
  ConflictException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { makeHash } from 'src/utils/bcrypt.util';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createUserDto: CreateUserDto) {
    const isExistEmail = await this.usersService.checkExistEmail(
      createUserDto.email,
    );

    if (isExistEmail) {
      throw new ConflictException('Email already exists');
    }

    const user = await this.usersService.create({
      ...createUserDto,
      password: makeHash(createUserDto.password),
    });

    return {
      statusCode: HttpStatus.CREATED,
      message: 'Create a new user successfully',
      data: {
        user,
      },
    };
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll() {
    const users = await this.usersService.findAll();

    return {
      statusCode: HttpStatus.OK,
      message: 'Get all users successfully',
      data: {
        meta: users,
      },
    };
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id') id: string) {
    const user = await this.usersService.findOneById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return {
      statusCode: HttpStatus.OK,
      message: 'Get one user successfully',
      data: {
        user,
      },
    };
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const user = await this.usersService.findOneById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return await this.usersService.updateById(id, updateUserDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const user = await this.usersService.findOneById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return await this.usersService.removeById(id);
  }
}
