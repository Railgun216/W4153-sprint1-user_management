const apiDoc = {
    swagger: "2.0",
    basePath: "/",
    info: {
        title: "User Authentication Service API.",
        version: "1.0.0",
    },
    definitions: {
        UserSignupRequestBody: {
            type: "object",
            properties: {
                username: {
                    type: "string",
                },
                password: {
                    type: "string",
                },
                email: {
                    type: "string",
                },
            },
            required: ["username", "password", "email"],
        },
        UserLoginRequestBody: {
            type: "object",
            properties: {
                password: {
                    type: "string",
                },
                email: {
                    type: "string",
                },
            },
            required: ["email", "password"],
        },
        UserProfile: {
            type: "object",
            properties: {
                id: {
                    type: "number",
                },
                username: {
                    type: "string",
                },
                email: {
                    type: "string",
                },
            },
            required: ["id", "username", "email"],
        },
    },
    paths: {},
};

module.exports = apiDoc;
