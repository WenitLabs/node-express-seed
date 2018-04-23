import _ from 'lodash';

const Config = {
  env: {
    development: {
    },
    production: {
    },
  },
  server: {
    locale: 'pt-br',
    port: 8080,
  },
  messages: {
    'pr-br': {
      hello: 'Olá mundo!',
    },
    'en-us': {
      hello: 'Hello world!',
    },
  },
};

const nodeEnv = process.env.NODE_ENV;
Config.env.current = Config.env[nodeEnv];

Config.get = (key, def) => _.get(Config, key, def);

Config.getMessage = (key, def) => {
  const locale = process.env.LOCALE || Config.get('server.locale', 'pt-br');
  const current = _.get(Config.messages, locale, Config.messages['pr-br']);
  const message = _.get(current, key, def);
  return message;
};

export default Config;
