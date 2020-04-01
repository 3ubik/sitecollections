const proxy = require("https-proxy-middleware");

module.exports = function(app) {

    app.use(proxy("/api", { target: "https://nzcollections.herokuapp.com" }));

};
