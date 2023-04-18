
# umi-plugin-reponesive - 屏幕适配 for umi 插件

## 何时使用

- 项目需要按照设计稿进行屏幕适配时（例如：大屏）。

## 安装依赖

```bash
pnpm add @mapzone/umi-plugin-reponesive
```

## 如何使用

## umi v3 版本：[umi v3](https://v3.umijs.org/config#plugins)

- 1、pnpm add @mapzone/umi-plugin-reponesive
- 2、在 .umirc.ts 中增加配置`reponesive`

## umi v4 版本：[umi v4](https://umijs.org/docs/api/config#plugins)

- 1、pnpm add @mapzone/umi-plugin-reponesive
- 2、在 .umirc.ts 中增加配置`reponesive`
- 3、在 .umirc.ts 中增加配置`plugins: ["@mapzone/umi-plugin-reponesive"]`

```js
import { defineConfig } from 'umi';

export default defineConfig({
  reponesive: {
    // 设计稿尺寸
    design: {
      width: 1920,
      height: 1080,
    },
    // 最小尺寸，少于该尺寸，不再进行缩放适配
    min: {
      width: 1280,
      height: 720,
    },
    // 容差，小于 tolerance 配置的宽、高不会再适配
    tolerance: {
      width: 100,
      height: 160
    }
    // 适配模式， both 兼顾宽、高进行适配，哪个缩放值小，使用哪个；width 只根据宽进行缩放适配
    mode: 'both',
    // 设计稿字体大小
    rootValue: 14,
    // 转换rem后，保存小数位
    unitPrecision: 5,

  },
  // 在 umi v4 中，需要配置 plugins
  plugins: ["@mapzone/umi-plugin-reponesive"]
});
```
