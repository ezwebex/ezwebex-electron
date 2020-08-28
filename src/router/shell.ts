import { Application } from 'express';
import { GachonLoginSession, GachonUserData } from '../gachon/interface';
import {shell} from 'electron';

export function registerShellRouter(app: Application) {

  app.get('/shell/:request', async (req, res) => {
    const request = req.params.request;
    shell.openExternal(request);
  });
}
