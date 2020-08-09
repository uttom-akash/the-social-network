let { verifyToken } = require("../../utils/JwtUtility");

async function iRequestContextMiddleware(req, res, next) {
  try {
    let token = req.get("authorization").split(" ")[1] || "";
    let payload = await verifyToken(token);
    console.log(payload);

    req.user = {};
    req.user.userName = payload.userName;
    req.user.role = payload.role;
    req.user.id = payload.id;
  } catch (error) {
    req.user = {};
    req.user.userName = "";
    req.user.role = "";
    req.user.id = "";
  } finally {
    next();
  }
}

module.exports = iRequestContextMiddleware;
