import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { RoleService } from './role.service';
import { Role } from './role.entity';
import { CreateRoleDto, ReadRoleDto, UpdateRoleDto } from './dtos';

@Controller('roles')
export class RoleController {
    constructor(private readonly _roleService: RoleService) { }

    @Get(":id")
    getRole(@Param("id", ParseIntPipe) id: number): Promise<ReadRoleDto> {
        return this._roleService.get(id);
    }

    @Get()
    getRoles(): Promise<ReadRoleDto[]> {
        return this._roleService.getAll();
    }

    @Post("create")
    createRole(@Body() role: Partial<CreateRoleDto>): Promise<ReadRoleDto> {
        return this._roleService.create(role);
    }

    @Patch(":roleId")
    updateRole(@Param("roleId", ParseIntPipe) roleId: number, @Body() role: Partial<UpdateRoleDto>) {
        return this._roleService.update(roleId, role);
    }

    @Delete(":roleId")
    deleteRole(@Param("roleId", ParseIntPipe) roleId: number) {
        return this._roleService.delete(roleId);
    }
}
