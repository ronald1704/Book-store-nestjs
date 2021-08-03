import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../role/decorators/role.decorator';
import { RoleGuard } from '../role/guards/role.guard';
import { RoleService } from '../role/role.service';
import { RoleType } from '../role/roletype.enum';
import { UserDto } from './dto/user.dot';
import { UserService } from './user.service';
import { User } from './usuario.entity';

@Controller('users')
export class UserController {
    constructor(private readonly _userService: UserService) { }

    @Get(":id")
    //@Roles(RoleType.ADMIN)
    //@UseGuards(AuthGuard(), RoleGuard)

    async getUser(@Param("id", ParseIntPipe) id: number): Promise<User> {
        const user = await this._userService.get(id);
        return user;
    }

    @UseGuards(AuthGuard())
    @Get()
    async getUsers(): Promise<User[]> {
        const users = await this._userService.getAll();
        return users;
    }

    @Post("create")
    async createUser(@Body() user: User): Promise<User> {
        const createdUser = await this._userService.create(user);
        return createdUser;
    }

    @Patch(":id")
    async updateUser(@Param("id", ParseIntPipe) id: number, @Body() user: User) {
        console.log(id);
        await this._userService.update(id, user);
        return true;
    }

    @Delete(":id")
    async deleteUser(@Param("id", ParseIntPipe) id: number) {
        console.log(id);
        await this._userService.delete(id);
        return true;
    }

    @Post("setRole/:userId/:roleId")
    async setRoleToUser(@Param("userId", ParseIntPipe) userId: number, @Param("roleId", ParseIntPipe) roleId: number) {
        return this._userService.setRoleToUser(userId, roleId);
    }

}
