import React from 'react';
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { isError } from "./helper/helper";
import { PersonType } from "./type/Person";

export const PersonList = (): JSX.Element => {
    const [users, setUsers] = useState<PersonType[]>([]);
    const [error, setError] = useState<Error | undefined>(undefined);

    const fetchUser = useCallback(async () => {
        try {
            const response = await axios.get<PersonType[]>("http://localhost:4000/person");
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
            <table>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>nickName</th>
                        <th>age</th>
                        <th>group_id</th>
                        <th>allergy</th>
                        <th>remarks_food</th>
                        <th>remarks_other</th>
                        <th>created_at[JST]</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user: PersonType) => (
                        <tr key={user.id}>
                            <td> {user.id} </td>
                            <td> {user.nickName} </td>
                            <td> {user.age} </td>
                            <td> {user.group_id} </td>
                            <td> {user.allergy} </td>
                            <td> {user.remarks_food} </td>
                            <td> {user.remarks_other} </td>
                            <td> {user.created_at} </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};