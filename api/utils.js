function extractFieldsMiddleware(viewModel, strict = false) {
    return function (req, res, next) {
        result = {};
        for (const prop in viewModel) {
            if (!viewModel.hasOwnProperty(prop)) {
                continue;
            }
            if (strict && !req.body[prop]) {
                // TODO: Better handle
                return void next(new Error('BAD_REQUEST'));
            }

            result[prop] = req.body[prop];
        }

        req.body = result;
        next();
    };
}

module.exports = {
    extractFieldsMiddleware
}
