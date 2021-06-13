export interface User {
    login: string,
    id: number,
    public_repos: number
}

export interface Repo {
    id: number
    name: string,
    language: string
}

export interface Final {
    language: string,
    count: number
}