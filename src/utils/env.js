import dotenv from 'dotenv';

dotenv.config();

export function env(name, defaulValue) {
  const value = process.env[name];
  if (value) return value;
  if (defaulValue) return defaulValue;
  throw new Error(`missing: process.env['${name}']`);
}
