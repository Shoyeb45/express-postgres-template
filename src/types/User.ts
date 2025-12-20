import Role from "./Role.js";

export default interface User {
    id: number;
    name: string;
    email: string;
    password: string;
    roles: Role[];
    verified: boolean;
    status: boolean;
    createdAt: Date;
    updatedAt: Date;
}
