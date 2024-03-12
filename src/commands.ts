
/* IMPORT */

import fs from 'node:fs';
import path from 'node:path';
import vscode from 'vscode';
import {alert, getActiveFilePath, openInApp, prompt} from 'vscode-extras';
import {castArray, getOptions, isString} from './utils';

/* MAIN */

const open = async ( filePath?: string | vscode.Uri ): Promise<void> => {

  filePath ||= getActiveFilePath ();

  if ( !filePath ) return alert.error ( 'You need to open a file first' );

  if ( !isString ( filePath ) ) filePath = filePath?.fsPath;

  const isFolder = fs.lstatSync ( filePath ).isDirectory ();
  const extAll = isFolder ? 'folder' : path.basename ( filePath ).replace ( /^[^.]*\./, '' );
  const extLast = isFolder ? 'folder' : path.extname ( filePath ).replace ( /^\./, '' );

  const {applications} = getOptions ();
  const apps = castArray ( applications[extAll] || applications[`.${extAll}`] || applications[extLast] || applications[`.${extLast}`] || [] );
  const app = apps.length > 1 ? await prompt.select ( 'Select the application...', apps ) : apps[0];

  openInApp ( filePath, app );

};

/* EXPORT */

export {open};
