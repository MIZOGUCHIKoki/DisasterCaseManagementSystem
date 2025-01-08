export type DB_WaitingQueueType = {
    id: number,
    person_id: string,
    receive_id: number,
    number_of_people: number,
    complete: boolean,
    created_at: string
};