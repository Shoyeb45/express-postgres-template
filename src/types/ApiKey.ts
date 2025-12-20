import { Permission } from "./permissions";

export default interface ApiKey {
    id: number;
    key: string;
    version: number;
    permissions: Permission[];
    comments: string[];
    status: boolean;
    createdAt: Date;
    updatedAt: Date;
}