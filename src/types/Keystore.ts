import User from "./User";

export default interface Keystore {
    id: number;
    clientId: number;
    client?: User;
    primaryKey: string;
    secondaryKey: string;
    status: boolean;
    createdAt: Date;
    updatedAt: Date;
}