module.exports = function () {
    let operations = {
        POST,
    };


    function POST(req, res, next) {
        console.log(`About to register user: ${JSON.stringify(req.body)}`);
        res.status(201).send();
    }

    POST.apiDoc = {
        summary: "User signup with username, password, and email.",
        operationId: "registerUser",
        consumes: ["application/json"],
        parameters: [
            {
                in: "body",
                name: "RequestBody",
                schema: {
                    $ref: "#/definitions/UserSignupRequestBody",
                },
            },
        ],
        responses: {
            201: {
                description: "Created",
            },
            400: {
                description: "Bad Request - Missing fields",
            },
            409: {
                description: "Conflict - Email already registered",
            },
        },
    };


    return operations;
};