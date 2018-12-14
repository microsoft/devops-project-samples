module.exports = {

    sendError: function (res, data, code) {
        data = data.toString();
        res.writeHead(code, { 'Content-Type': 'text/html', 'Content-Length': data.length });
        res.write(data);
        res.end();
    }
}