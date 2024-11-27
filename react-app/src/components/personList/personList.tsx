import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import Person from "./person";
/**
 * エラー型かどうかを判定する関数
 */
const isError = (error: unknown): error is Error => {
    return error instanceof Error;
};


export default function PersonList() {
    const [users, setUsers] = useState<Person[]>([]);
    const [error, setError] = useState<Error | undefined>(undefined);

    const fetchUser = useCallback(async () => {
        try {
            const response = await axios.get<Person[]>("http://localhost:4000/person");
            setUsers(response.data);
        } catch (e) {
            if (isError(e)) {
                setError(e);
            }
        }
    }, []);

    useEffect(() => {
        fetchUser();
    }, [fetchUser]);

    if (error) {
        return <div>{error.message}</div>;
    }

    return (
        <div>
            {users.map((user) => (
                <li key={user.id}>{user.nickName}</li>
            ))}
        </div>
    );
};