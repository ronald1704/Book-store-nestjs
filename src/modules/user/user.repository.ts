import { Entity, EntityRepository, Repository } from "typeorm";
import { User } from "./usuario.entity";

@EntityRepository(User)
export class UserRepository extends Repository<User>{

}