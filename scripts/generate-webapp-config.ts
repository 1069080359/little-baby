import { existsSync, mkdirSync, writeFileSync, readFileSync } from 'fs';
import { join } from 'path';
import { execAsync, getDirname } from './utils';
import webappConfig from '../config/webapp-config';
import { WebAppConfigBrowserKey, WebAppConfigJsName } from '../config/constants';

const __dirname = getDirname(import.meta.url);

async function execute(): Promise<void> {
  const jsContent = `(function() {
  window.${WebAppConfigBrowserKey} = ${JSON.stringify(webappConfig)}
})()`;
  const targetFileBasePath = join(__dirname, '..', 'public', 'config');
  if (!existsSync(targetFileBasePath)) {
    mkdirSync(targetFileBasePath);
  }
  const targetFilePath = join(targetFileBasePath, WebAppConfigJsName);
  // 生成配置文件js
  writeFileSync(targetFilePath, jsContent);

  // 生成配置帮助文件
  const webappConfigTypeFile = join(__dirname, '..', 'config', 'webapp-config', 'types.ts');
  if (existsSync(webappConfigTypeFile)) {
    const typeContent = readFileSync(webappConfigTypeFile);
    const readmeMdContent = '# 项目配置修改指南\n\n可参考下方配置项类型声明及备注，修改配置的值。\n\n```ts\n' + typeContent + '\n```\n\n';
    writeFileSync(`${targetFilePath}.readme.md`, readmeMdContent);
  }

  // 格式化
  await execAsync(`prettier --no-config --single-quote --trailing-comma all  --write ${targetFilePath}`);
}

execute();
