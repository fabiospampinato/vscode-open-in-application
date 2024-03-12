
/* IMPORT */

import {getConfig} from 'vscode-extras';
import type {Options} from './types';

/* MAIN */

const castArray = <T> ( value: T | T[] ): T[] => {

  return Array.isArray ( value ) ? value : [value];

};

const getOptions = (): Options => {

  const config = getConfig ( 'openInApplication' );
  const applications = isObject ( config?.applications ) ? config.applications as Options['applications'] : {}; //TODO: Make this actually type-safe

  return { applications };

};

const isObject = ( value: unknown ): value is Record<string, unknown> => {

  return typeof value === 'object' && value !== null;

};

const isString = ( value: unknown ): value is string => {

  return typeof value === 'string';

};

/* EXPORT */

export {castArray, getOptions, isObject, isString};
