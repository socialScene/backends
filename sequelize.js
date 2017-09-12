const Sequelize = require('sequelize');
const Model=require('./models/social.model.js');
const user=require('./models/users.model.js');
const post=require('./models/post.model.js');
const profile=require('./models/profile.model.js');
const errorHandler = require('feathers-errors/handler');
const notFound = require('feathers-errors/not-found');
//const middleware = require('feathers-permissions').middleware;
const service=require('feathers-sequelize');




module.exports = function () {
  const app = this;
  const connectionString = app.get('mysql');
   const config=  {
     "define": {
          "underscored": true
        }
    }
  const sequelize = new Sequelize(connectionString, {
    dialect: 'mysql',
    logging: false,
    user:'root',
    post:'root',
    profile:'root',
 database:'social',
    

  });






  
  const oldSetup = app.setup;

  app.set('sequelizeClient', sequelize);

  app.setup = function (...args) {
    const result = oldSetup.apply(this, args);
app.use('/profile',service({Model}))
app.use('/post',service({Model}))
app.use('/user',service({Model}))
app.use('/admin',service({Model}))





    // Set up data relationships
    const models = sequelize.models;
    Object.keys(models).forEach(name => {
      if ('associate' in models[name]) {
        models[name].associate(models);
      }
    });

    // Sync to the database
    sequelize.sync();
sequelize
.authenticate()
.then(() => {
	console.log('connection has been established successfully.');
})
.catch(err =>{
	console.log.error('unable to connect to the database:',err);
});
    return result;
  };
};
