declare global {
    namespace Express {
        interface User {
            id: number;
            roles: string[];
        }

        interface Request {
            user?: User
        }
    }
}

export {}