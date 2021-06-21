import { define } from "typeorm-seeding"
import { User } from "../users/db/user.entity"
import {  hashSync } from "bcrypt";

define(User, (faker ) => {
    const username = "Administrator";
    const password =  hashSync("Administrator",10);
    const email = "foo@gmail.com"
    const role = "ADMIN"
  
    const user = new User()
    user.username = username;
    user.password = password;
    user.email = email;
    user.role = role;

    return user
  })