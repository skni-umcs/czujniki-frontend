export enum Status {
    ONLINE = "Działa",
    OFFLINE = "Wyłączony",
    ERROR = "Nieaktualny",
};

export type TStatus = keyof typeof Status;
