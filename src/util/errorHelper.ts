'use strict';
import * as vscode from 'vscode';

import {IError} from './../spgo';
import {Logger} from '../util/logger';

export class ErrorHelper{

    static handleHttpError(err, reject){
        //HACK: this is sorta hacky- Detect if this error was due to credentials
        if(err.message && err.message.indexOf('wst:FailedAuthentication') > 0){
            vscode.window.spgo.credential = null;
            let error : IError ={
                message : 'Invalid user credentials. Please reset your credentials via the command menu and try again.' 
            };
            Logger.outputError(error, vscode.window.spgo.outputChannel);
        }
        //otherwise something else happened.
        else{
            if(err.message && err.message.value){
                Logger.showError(err.message.value, err);
            }
            // log sharepoint errors
            else if(err.error && err.error.error ){
                Logger.showError(err.error.error.message.value, err);
            }
            else{
                Logger.outputError(err, vscode.window.spgo.outputChannel);
            }
        }
        reject(err);
    }

    static handleHttpErrorSilently(err, reject){
        //HACK: this is sorta hacky- Detect if this error was due to credentials
        if(err.message && err.message.indexOf('wst:FailedAuthentication') > 0){
            vscode.window.spgo.credential = null;
            let error : IError ={
                message : 'Invalid user credentials. Please reset your credentials via the command menu and try again.' 
            };
            Logger.outputError(error, vscode.window.spgo.outputChannel);
        }
        //otherwise something else happened.
        else{
            if(err.message && err.message.value){
                Logger.outputError(err.message.value, err);
            }
            // log sharepoint errors
            else if(err.error && err.error.error ){
                Logger.outputError(err.error.error.message.value, err);
            }
            else{
                Logger.outputError(err, vscode.window.spgo.outputChannel);
            }
        }
        reject(err);
    }
}