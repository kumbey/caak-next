const https = require('https');
const AWS = require("aws-sdk");
const urlParse = require("url").URL;
const appsyncUrl = process.env.API_CAAKMN_GRAPHQLAPIENDPOINTOUTPUT;
const region = process.env.REGION;
const endpoint = new urlParse(appsyncUrl).hostname.toString();

const Call = async (params) => {
    try{

        const req = new AWS.HttpRequest(appsyncUrl, region);

        req.method = "POST";
        req.path = "/graphql";
        req.headers.host = endpoint;
        req.headers["Content-Type"] = "application/json";
        req.body = JSON.stringify({
            query: params.query,
            operationName: params.operation,
            variables: params.variables
        });

        const signer = new AWS.Signers.V4(req, "appsync", true);
        signer.addAuthorization(AWS.config.credentials, AWS.util.date.getDate());

        const data = await new Promise((resolve, reject) => {
            const httpRequest = https.request({ ...req, host: endpoint }, (result) => {
                let data = "";

                result.on("data", (chunk) => {
                    data += chunk;
                });

                result.on("end", () => {
                    resolve(JSON.parse(data.toString()));
                });
            });

            httpRequest.write(req.body);
            httpRequest.end();
        });

        return {
            statusCode: 200,
            body: JSON.stringify(data)
        };

    }catch(ex){
        return {
            statusCode: 400,
            body: JSON.stringify(ex)
        };
    }
};

module.exports = {
    call: Call
}