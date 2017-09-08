/*
  r = require('rethinkdbdash')({
  port: process.env.rethink_port,
  host: process.env.rethink_host,
  db: process.env.rethink_db
  });
*/

/*
  const accessLevel = function () {
  const accesslvls = arguments;
  return function (req, res, next) {
  r.table('users')
  .filter(r.row('name').eq('kristiana')) //req.users.sAMAccountName
  .run()
  .then(function (response) {
  for (x = 0; x < accesslvls.length; x++) {
  const accesslvl = accesslvls[x];
  for (var i = 0, l = response.length; i < l; i++) {
  const group = (response[i]['groups']);
  for (var a = 0, ln = group.length; a < ln; a++) {
  if (group[a] == accesslvl) {
  return next();
  }
  }
  }
  }
  res.send('Ikke tilgang!');
  });
  }
  };
*/

/*
exports.listUser = (req, res) => {
  // Get users from the rethinkdb
  r.table('users').run()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(error => {
      res.status(500).send(error)
    });
};


exports.postUser = (req, res) => {
  r.table('users').insert({
    name: req.body.name,
    roles: req.body.roles
  }, {returnChanges: "always"})
    .run()
    .then(function (response) {
      res.status(201).json(response.changes[0].new_val);
    })
    .error(function (err) {
      console.log('error occurred ', err);
    });
  //console.log(res.body);

};


exports.getUser = (req, res) => {
  r.table('users').filter(r.row('id').eq(req.params.id))
    .run()
    .then(function (response) {
      res.send(response);
    })
    .error(function (err) {
      console.log('error occurred ', err);
    });
};


exports.putUser = (req, res) => {
  //console.log(req.body);
  r.table('users').filter(r.row('id').eq(req.body.id))
    .update({
      name: req.body.name,
      roles: req.body.roles
    }, {returnChanges: "always"})
    .run()
    .then(function (response) {
      console.log(response.changes[0].new_val);
      res.status(200).json(response.changes[0].new_val);
    })
    .error(function (err) {
      console.log('error occurred ', err);
    });

};

exports.deleteUser = (req, res) => {
  r.table('users').filter(r.row('id').eq(req.params.id))
    .delete()
    .then(function (response) {
      res.status(200).json(req.params.id);
    })
    .error(function (err) {
      console.log('error occurred ', err);
    });
};

*/
