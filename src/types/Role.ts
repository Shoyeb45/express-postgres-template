export enum RoleCode {
    USER = "USER",
    ADMIN = "ADMIN"
}

export default interface Role {
    id: number;
    code: RoleCode;
    status: boolean;
    createdAt: Date;
    updatedAt: Date;
}