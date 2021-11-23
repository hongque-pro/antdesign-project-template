import { clientSession, initRequest } from "infra-sdk-core";
import Constants from "./constants";
import errors from "./errors";

const session = clientSession;
session.setClient(Constants.clientId, Constants.clientSecret);

const request = initRequest({
    clientId: session.clientId,
    clientSecret: session.secret,
    accessTokenUrl: "/api/oauth/token", //Spring 标准 Endpoint
    checkTokenUrl: "/api/oauth/check",
    errorDescriber: errors
});

export { request };