export enum Status {
    ONLINE = "Działa",
    OFFLINE = "Wyłączony",
    ERROR = "Błąd",
};

export type TStatus = keyof typeof Status;
