import * as configs from './config.json';

export interface Config {
  baseUrl: string;
  jsonWebToken: string;
  paystack: {
    baseUrl: string;
    secret: string;
  };
}

export default class EnvironmentVars {
  public static get config(): Config {
    const ENV: string = process.env.NODE_ENV || 'local';
    return configs[ENV];
  }
}
