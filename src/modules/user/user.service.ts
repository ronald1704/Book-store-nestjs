import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getConnection } from 'typeorm';
import { Role } from '../role/role.entity';
import { RoleRepository } from '../role/role.repository';
import { UserDto } from './dto/user.dot';
import { UserDetails } from './user.details.entity';
import { UserRepository } from './user.repository';
import { User } from './usuario.entity';
import { status } from '../../shared/entity.status.enum';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserRepository)
        private readonly _userRepository: UserRepository,
        @InjectRepository(RoleRepository)
        private readonly _roleRepository: RoleRepository) { }

    async get(id: number): Promise<User> {
        if (!id) {
            throw new BadRequestException("id must be sent!!!");
        }

        const user: User = await this._userRepository.findOne(id, { where: { status: status.ACTIVE }, });

        if (!user) {
            throw new NotFoundException();
        }

        return user;
    }

    async getAll(): Promise<User[]> {

        const users = await this._userRepository.find({ status: status.ACTIVE, });

        if (!users) {
            throw new NotFoundException();
        }

        return users;
    }

    async create(user: User): Promise<User> {
        const details = new UserDetails();
        user.details = details;
        const repo = await getConnection().getRepository(Role);
        const defaultRole = await repo.findOne({ where: { name: "GENERAL" } });
        user.roles = [defaultRole];
        const savedUser: User = await this._userRepository.save(user);
        return savedUser;
    }

    async update(id: number, user: User): Promise<void> {
        await this._userRepository.update(id, user);
    }

    async delete(id: number): Promise<void> {
        const userExist = await this._userRepository.findOne(id, { where: { status: status.ACTIVE } });

        if (!userExist) {
            throw new NotFoundException();
        }

        await this._userRepository.update(id, { status: status.INACTIVE });
    }

    async setRoleToUser(userId: number, roleId: number) {
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
