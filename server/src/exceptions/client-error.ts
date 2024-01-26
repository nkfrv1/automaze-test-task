class ClientError extends Error {
    status: number;

    constructor(message: string, status: number) {
        super(message);
        this.status = status;
    }

    static BadRequest(message = "Bad request") {
        return new ClientError(message, 400);
    }

    static NotFound(message = "Not Found") {
        return new ClientError(message, 404);
    }
}

export default ClientError;
