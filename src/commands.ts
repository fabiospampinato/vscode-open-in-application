
/* IMPORT */

import * as _ from 'lodash';
import * as openPath from 'open';
import * as path from 'path';
import * as vscode from 'vscode';
import Config from './config';
import Utils from './utils';

/* COMMANDS */

async function open ( filepath ) {

  filepath = filepath && !_.isString ( filepath ) ? filepath.fsPath : filepath;

  if ( !filepath ) { // Active file

    const editor = vscode.window.activeTextEditor;

    if ( !editor ) return vscode.window.showErrorMessage ( 'For this file you\'ll have to trigger this action from the right-click menu' );

    filepath = editor.document.uri.fsPath;

  }

  const config = Config.get (),
        isFolder = await Utils.folder.is ( filepath ),
        ext = isFolder ? 'folder' : _.trimStart ( path.parse ( filepath ).ext, '.' ),
        apps = _.castArray ( config.applications[ext] || [] ),
        app = apps.length ? ( apps.length > 1 ? await vscode.window.showQuickPick ( apps, { placeHolder: 'Select the application...' } ) || false : apps[0] ) : undefined;

  if ( app === false ) return;

  openPath ( filepath, app );

}

/* EXPORT */

export {open};
