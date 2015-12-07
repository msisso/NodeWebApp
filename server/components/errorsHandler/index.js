module.exports[404] = function pageNotFound(req, res) {
    var viewFilePath = 'Errors/404';
    var errorCode = 404;
    var result = {
        status: errorCode
    };

    res.status(result.status);
    res.render(viewFilePath, function (err) {
        if (err) { return res.json(result, result.status); }

        res.render(viewFilePath);
    });
};


