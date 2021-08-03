import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleRepository } from '../role/role.repository';
import { UserRepository } from './user.repository';
import { User } from './usuario.entity';
import { status } from '../../shared/entity.status.enum';
import { ReadUserDto, UpdateUserDto } from './dto';
import { plainToClass } from 'class-transformer';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserRepository)
        private readonly _userRepository: UserRepository,
        @InjectRepository(RoleRepository)
        private readonly _roleRepository: RoleRepository) { }

    async get(id: number): Promise<ReadUserDto> {
        if (!id) {
            throw new BadRequestException("id must be sent!!!");
        }

        const user: User = await this._userRepository.findOne(id, { where: { status: status.ACTIVE }, });

        if (!user) {
            throw new NotFoundException();
        }

        return plainToClass(ReadUserDto, user);
    }

    async getAll(): Promise<ReadUserDto[]> {

        const users = await this._userRepository.find({ status: status.ACTIVE, });

        if (!users) {
            throw new NotFoundException();
        }

        return users.map((user: User) => plainToClass(ReadUserDto, user));
    }

    async update(userId: number, user: UpdateUserDto): Promise<ReadUserDto> {
        const foundUser = await this._userRepository.findOne(userId, { where: { status: status.ACTIVE } });
        if (!foundUser) {
            throw new NotFoundException("User does not exists!!!")
        }

        foundUser.username = user.username;
        const updateUser = await this._userRepository.save(foundUser);
        return plainToClass(ReadUserDto, updateUser);
    }

    async delete(userId: number): Promise<void> {
        const userExist = await this._userRepository.findOne(userId, { where: { status: status.ACTIVE } });

        if (!userExist) {
            throw new NotFoundException();
        }

        await this._userRepository.update(userId, { status: status.INACTIVE });
    }

    async setRoleToUser(userId: number, roleId: number): Promise<boolean> {
        const userExist = await this._userRepository.findOne(userId, { where: { status: status.ACTIVE } });

        if (!userExist) {
            throw new NotFoundException();
        }

        const roleExist = await this._roleRepository.findOne(roleId, { where: { status: status.ACTIVE } });

        if (!roleExist) {
            throw new NotFoundException("Role does not exist");
        }

        userExist.roles.push(roleExist);
        await this._userRepository.save(userExist);

        return true;
    }
}
