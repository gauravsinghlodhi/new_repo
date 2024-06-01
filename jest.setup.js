jest.setTimeout(30000);

const app = require('./app');
let http = require('http');
let port = 8045;
app.set('port', port);
const server = http.createServer(app);

beforeAll(done => {
    /*db.sequelize.sync({ force: true, logging: console.log }).then(() => {
      //server.listen(port);
      done();
    });*/
    server.listen(port);
    done();
});

afterAll(async () => {
    await server.close();
});
