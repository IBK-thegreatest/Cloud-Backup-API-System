export interface Register {
    username: string
    email: string
    password: string
    isAdmin: boolean
}

export interface Login {
    email: string
    password: string
}

export interface User extends Register {
    id: any
    token: string
}