
const authenticate = (req, res, next) => {
  const header = req.headers['x-user-id'];
  const id = header ? Number(header) : 1;
  req.user = { id };
  next();
};

module.exports = { authenticate };
