const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('./db.json');
const middlewares = jsonServer.defaults();
const jwt = require('jsonwebtoken');
const port = process.env.PORT || 5000;
const TOKEN_KEY = 'abcdejfhajkfhkjdhlafkjhsdjkfhaslkf';

const bypassUrls = [
  {
    exct: true,
    url: '/api/auth',
  },
];

const verifyToken = (req, res, next) => {
  let token = req.body.token || req.query.token || req.headers['authorization'];

  for (let i = 0; i < bypassUrls.length; i++) {
    const auth = bypassUrls[i];
    if (auth.exct && auth.url == req.originalUrl) {
      return next();
    }
    if (req.originalUrl.startsWith(auth.url)) {
      return next();
    }
  }

  if (!token) {
    return res.status(403).send('A token is required for authentication');
  }
  try {
    if (token.startsWith('Bearer ')) {
      token = token.split(' ')[1];
    }
    const decoded = jwt.verify(token, TOKEN_KEY);
    req.user = decoded;
  } catch (err) {
    return res.status(401).send('Invalid Token');
  }
  return next();
};

server.use(middlewares);
server.use(jsonServer.bodyParser);
server.use(verifyToken);
server.use(
  jsonServer.rewriter({
    '/api/products': '/products',
  })
);

server.post('/api/productcollection', (req, res) => {
  const db = router.db; // Assign the lowdb instance

  if (Array.isArray(req.body)) {
    req.body.forEach((element) => {
      insert(db, 'products', element); // Add a post
    });
  } else {
    insert(db, 'products', req.body); // Add a post
  }
  res.sendStatus(200);

  /**
   * Checks whether the id of the new data already exists in the DB
   * @param {*} db - DB object
   * @param {String} collection - Name of the array / collection in the DB / JSON file
   * @param {*} data - New record
   */
  function insert(db, collection, data) {
    const table = db.get(collection);
    if (table.find(data).value()) {
      table.push(data).write();
    }
  }
});

server.get('/api/auth', (req, res) => {
  const user = { user_id: '0001', email: 'example@email.com' };
  const token = jwt.sign(user, TOKEN_KEY, {
    expiresIn: '2h',
  });
  const tkn = {
    token,
    user,
  };
  res.status(200).json(tkn);
});

server.use(router);
server.listen(port);
