const dotenv = require('dotenv');
const path = require('path');
const Joi = require('joi');

dotenv.config({ path: path.join(__dirname, '../../.env') });

const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string().valid('production', 'development', 'test').required(),
    PORT: Joi.number().default(3000),
    MONGODB_URL: Joi.string().required().description('Mongo DB url'),
    JWT_SAMPLE_EMAIL: Joi.string().required().description('JWT sample email'),
    JWT_SAMPLE_PASSWORD: Joi.string().required().description('JWT sample password'),
    JWT_ACCESS_TOKEN_SECRET: Joi.string().required().description('JWT secret'),
    SEAT_PER_TABLE: Joi.number().description('Table seat default'),
    TOTAL_TABLE: Joi.number().description('Total Table init default'),
  })
  .unknown();

const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

module.exports = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
};
