const feathers=require('feathers')
const authentication = require('feathers-authentication');
const jwt = require('feathers-authentication-jwt');
const local = require('feathers-authentication-local');
const app = feathers();

const memory = require('feathers-memory');

const service=require('feathers-sequelize');
const Model=require('./models/social.model.js');
const users=require('./models/users.model.js');
const profile=require('./models/profile.model.js');
const post=require('./models/post.model.js');
const admin=require('./models/admin.model.js');
const services = require('./services');
const sequelize = require('./sequelize');
const middleware = require('./middleware');
module.exports = function () {
  const app = this;
  const config = app.get('authentication');

  // Set up authentication with the secret
  //app.configure(authentication(config));
app.configure(authentication({ secret: 'supersecret' }))


  app.configure(jwt());
  app.configure(local());
app.configure(sequelize);
app.use('/users', memory())


// Configure other middleware (see `middleware/index.js`)
app.configure(middleware);
// Set up our services (see `services/index.js`)
app.configure(services);


  // The `authentication` service is used to create a JWT.
  // The before `create` hook registers strategies that can be used
  // to create a new valid JWT (e.g. local or oauth2)
  app.service('authentication').hooks({
    before: {
      create: [
        authentication.hooks.authenticate(['jwt', 'local']),
      ],
      remove: [
        authentication.hooks.authenticate('jwt')
      ]
    }
  });
};






console.log('Feathers authentication with local auth started on 127.0.0.1:3030');
