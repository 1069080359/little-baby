import { existsSync, renameSync, rmSync } from 'fs';
import { join } from 'path';
import log from 'npmlog';
import chalk from 'chalk';
import webAppConfig from '../config/webapp-config';
import pkg from '../package.json';
import { getDirname } from './utils';

const _dirname = getDirname(import.meta.url);

async function core() {
  const { projectPathName, webAppName } = webAppConfig.appSettings;
  const { WEBAPP_ENV = 'prod' } = process.env;
  const WEBAPP_VERSION: string = pkg.version;

  const deployPath = `${projectPathName}${webAppName}/`;
  const outputPath = deployPath.length > 1 ? deployPath.split('/').filter(Boolean).join('-') : 'dist';
  const targetPath = `${outputPath}-${WEBAPP_ENV}-v${WEBAPP_VERSION}`;

  const outputAbsPath = join(_dirname, '../', outputPath);
  const targetAbsPath = join(_dirname, '../', targetPath);
  if (existsSync(targetAbsPath)) {
    rmSync(targetAbsPath, { recursive: true, force: true });
  }
  if (existsSync(outputAbsPath)) {
    renameSync(outputAbsPath, targetAbsPath);
    log.info('', chalk.green(`🌻 打包成功，文件夹：${targetPath}`));
  } else {
    log.error('', chalk.red(`输出目录（${outputAbsPath}）不存在，重命名失败`));
  }
}

core();
