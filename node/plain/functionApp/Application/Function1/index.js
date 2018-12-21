module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    if (req.query.name || (req.body && req.body.name)) {
        context.res = {
            status: 200, /* Defaults to 200 */
            body: "Hello " + (req.query.name || req.body.name) + "! Welcome to Azure Functions!"
        };
    }
    else {
        context.res = {
            status: 200,
            body: "Hello there! Welcome to Azure Functions!"
        };
    }
};