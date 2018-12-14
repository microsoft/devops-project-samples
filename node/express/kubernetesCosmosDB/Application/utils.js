module.exports = {

    sendError: function (res, data, code) {
        res.writeHead(code, { 'Content-Type': 'text/html', 'Content-Length': data.length });
        res.write(data);
        res.end();
    }
}