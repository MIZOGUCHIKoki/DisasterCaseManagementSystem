export type DB_WaitingQueueType = {
    id: number,
    person_id: string,
    receive_id: number,
    numberOfMember: number,
    complete: boolean,
    created_at: string
};