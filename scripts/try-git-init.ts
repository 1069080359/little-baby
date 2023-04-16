import { existsSync } from 'node:fs';
import { join } from 'node:path';
import log from 'npmlog';
import chalk from 'chalk';
import { execAsync } from './utils.js';

const core = async () => {
  try {
    const git = join('./.git');
    if (!existsSync(git)) {
      const res = await execAsync('git init', {
        cwd: process.cwd(),
        stdio: 'inherit',
      });
      if (res.error) {
        throw new Error(`git init 失败：${res.error}`);
      }
      log.info('', chalk.green('git init 成功'));
    }
  } catch (e: any) {
    log.error('run try-git-init失败', chalk.redBright(e.message));
    process.exit(1);
  }
};

core();
