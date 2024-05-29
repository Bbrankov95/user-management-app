import { User } from "shared/types";

const createUserFilterOptions = (users: User[]) => users.map((user: User) => ({
    value: user.id,
    text: user.name,
}));

export default createUserFilterOptions