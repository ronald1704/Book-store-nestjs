import { createParamDecorator } from "@nestjs/common";
import { UserDto } from "../user/dto/user.dot";

export const GetUser = createParamDecorator((key, req) => key ? req.user[key] : req.user,);