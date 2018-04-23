import Config from '../../../config';

const Hello = {
  register: (app) => {
    app.get('/', (req, res) => {
      res.send(`${Config.getMessage('hello', 'Olá mundo!')} - ${new Date()}`);
    });
  },
};

export default Hello;
