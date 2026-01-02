declare module "@prisma/client" {
  export enum Permission {
    GENERAL = "GENERAL",
  }

  export enum RoleCode {
    USER = "USER",
    ADMIN = "ADMIN",
  }

  export interface User {
    id: number;
    name: string;
    email: string;
    password: string;
    status: boolean;
    verified: boolean;
    createdAt: Date;
    updatedAt: Date;
  }
}
