"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatusCodeEnum = void 0;
var StatusCodeEnum;
(function (StatusCodeEnum) {
    StatusCodeEnum[StatusCodeEnum["OK"] = 200] = "OK";
    StatusCodeEnum[StatusCodeEnum["CREATED"] = 201] = "CREATED";
    StatusCodeEnum[StatusCodeEnum["BAD_REQUEST"] = 400] = "BAD_REQUEST";
    StatusCodeEnum[StatusCodeEnum["UNAUTHORIZED"] = 401] = "UNAUTHORIZED";
    StatusCodeEnum[StatusCodeEnum["PAYMENT_REQUIRED"] = 402] = "PAYMENT_REQUIRED";
    StatusCodeEnum[StatusCodeEnum["FORBIDDEN"] = 403] = "FORBIDDEN";
    StatusCodeEnum[StatusCodeEnum["NOT_FOUND"] = 404] = "NOT_FOUND";
    StatusCodeEnum[StatusCodeEnum["CONFLICT"] = 409] = "CONFLICT";
    StatusCodeEnum[StatusCodeEnum["INTERNAL_SERVER_ERROR"] = 500] = "INTERNAL_SERVER_ERROR";
    StatusCodeEnum[StatusCodeEnum["BAD_GATEWAY"] = 502] = "BAD_GATEWAY";
    StatusCodeEnum[StatusCodeEnum["SERVICE_UNAVAILABLE"] = 503] = "SERVICE_UNAVAILABLE";
})(StatusCodeEnum || (exports.StatusCodeEnum = StatusCodeEnum = {}));
