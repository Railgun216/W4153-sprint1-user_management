module.exports = function () {
    let operations = {
        GET,
    };

    function GET(req, res, next) {
        // if token is verified, return user profile
        const userProfile = {
            id: 1,
            username: "andy",
            email: "email@hello.com",
        };

        res.status(200).json(userProfile);
    }

    GET.apiDoc = {
        summary: "Verify the user token and retrieve the user profile.",
        operationId: "getUserProfile",
        parameters: [
            {
                in: "header",
                name: "Authorization",
                required: true,
                type: "string",
                description: "Bearer token for authentication",
            },
        ],
        responses: {
            200: {
                description: "User profile retrieved successfully.",
                schema: {
                    $ref: "#/definitions/UserProfile",
                },
            },
            401: {
                description: "Unauthorized - Invalid or missing token",
            },
            500: {
                description: "Internal server error",
            },
        },
    };

    return operations;
};
