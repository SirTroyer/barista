/**
 * @license
 * Copyright 2020 Dynatrace LLC
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { fork } from 'child_process';

/**
 * Starts the server that is serving the ssr application.
 * Returns the process id of the server.
 * @param serverPath The path to the express server that should be started
 * @param port The port where the server should run on.
 */
export function startServer(
  serverPath: string,
  port: number = 4000,
): Promise<number> {
  const child = fork(serverPath, [], {
    silent: true,
    env: { PORT: `${port}` },
  });

  return new Promise((resolve, reject) => {
    child.stdout!.on('data', (msg: Buffer) => {
      const message = msg.toString().trim();
      if (message.startsWith('Node Express server listening on')) {
        resolve(child.pid);
      }
    });

    // TODO: write tests for error handling
    child.on('error', reject);
  });
}
