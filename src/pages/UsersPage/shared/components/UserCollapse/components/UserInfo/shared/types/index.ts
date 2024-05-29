import { ChangeEvent } from "react";
import { User } from "shared/types";

export type Column = {
    user: User;
    onColumnChange: (e: ChangeEvent<HTMLInputElement>) => void;
    editMode: boolean;
}