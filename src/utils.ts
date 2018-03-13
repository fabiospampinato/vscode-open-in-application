
/* IMPORT */

import * as _ from 'lodash';
import * as fs from 'fs';
import * as pify from 'pify';
import * as vscode from 'vscode';
import * as Commands from './commands';

/* UTILS */

const Utils = {

  initCommands ( context: vscode.ExtensionContext ) {

    const {commands} = vscode.extensions.getExtension ( 'fabiospampinato.vscode-open-in-application' ).packageJSON.contributes;

    commands.forEach ( ({ command, title }) => {

      const commandName = _.last ( command.split ( '.' ) ) as string,
            handler = Commands[commandName],
            disposable = vscode.commands.registerCommand ( command, handler );

      context.subscriptions.push ( disposable );

    });

    return Commands;

  },

  folder: {

    async is ( folderpath ) {

      const stats = await pify ( fs.lstat )( folderpath );

      return stats.isDirectory ();

    }

  }

};

/* EXPORT */

export default Utils;
