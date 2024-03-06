
/* IMPORT */

import fs from 'node:fs';
import path from 'node:path';
import openPath from 'open';
import vscode from 'vscode';
import {getConfig} from 'vscode-extras';
import {castArray, isString} from './utils';

/* MAIN */

const open = async ( filePath?: string | vscode.Uri ): Promise<void> => {

  filePath ||= vscode.window.activeTextEditor?.document.uri.fsPath || vscode.window.tabGroups.activeTabGroup.activeTab?.input?.uri?.fsPath;

  if ( !filePath ) return void vscode.window.showErrorMessage ( 'For this file you might have to trigger this action from the right-click menu' );

  if ( !isString ( filePath ) ) filePath = filePath?.fsPath;

  const config = getConfig ( 'openInApplication' );
  const isFolder = fs.lstatSync ( filePath ).isDirectory ();
  const extAll = isFolder ? 'folder' : path.basename ( filePath ).replace ( /^[^.]*\./, '' );
  const extLast = isFolder ? 'folder' : path.extname ( filePath ).replace ( /^\./, '' );
  const appsMap = config?.applications || {};
  const apps = castArray ( appsMap[extAll] || appsMap[`.${extAll}`] || appsMap[extLast] || appsMap[`.${extLast}`] || [] );
  const app = apps.length ? ( apps.length > 1 ? await vscode.window.showQuickPick ( apps, { placeHolder: 'Select the application...' } ) || false : apps[0] ) : undefined;

  if ( app === false ) {

    return;

  } else if ( app ) {

    openPath ( filePath, { app: { name: app } } );

  } else {

    openPath ( filePath );

  }

};

/* EXPORT */

export {open};
