import { join } from 'path';
import pxtorem from 'postcss-pxtorem';
import type { IApi } from 'dumi';

export default (api: IApi) => {
  api.describe({
    key: 'reponesive',
    config: {
      schema(joi) {
        return joi.object({
          design: joi.object({
            width: joi.number(),
            height: joi.number(),
          }),
          min: joi.object({
            width: joi.number(),
            height: joi.number(),
          }),
          tolerance: joi
            .object({
              width: joi.number(),
              height: joi.number(),
            })
            .default({
              width: 100,
              height: 160,
            }),
          mode: joi.string().allow('both', 'width').default('both'),
          rootValue: joi.number().default(14),
          unitPrecision: joi.number().default(5),
        });
      },
    },
  });

  api.modifyConfig((memo) => {
    const { reponesive } = memo;

    if (!memo.theme) {
      memo.theme = {};
    }
    memo.theme = {
      REPONESIVE_DESIGN_WIDTH: reponesive.design.width,
      REPONESIVE_DESIGN_HEIGHT: reponesive.design.height,
      REPONESIVE_MIN_WIDTH: reponesive.min.width,
      REPONESIVE_MIN_HEIGHT: reponesive.min.height,
      REPONESIVE_TOLERANCE_WIDTH: reponesive.tolerance.width,
      REPONESIVE_TOLERANCE_HEIGHT: reponesive.tolerance.height,
      REPONESIVE_MODE: reponesive.mode,
      REPONESIVE_ROOT_VALUE: reponesive.rootValue,
      REPONESIVE_UNIT_PRECISION: reponesive.unitPrecision,
      ...memo.theme,
    };

    if (!memo.extraPostCSSPlugins) {
      memo.extraPostCSSPlugins = [];
    }
    memo.extraPostCSSPlugins = [
      pxtorem({
        rootValue: reponesive.rootValue,
        unitPrecision: reponesive.unitPrecision,
        propList: ['*'],
        selectorBlackList: [],
        replace: true,
        mediaQuery: false,
        minPixelValue: 0,
        exclude: '',
      }),
      ...memo.extraPostCSSPlugins,
    ];

    return memo;
  });

  api.chainWebpack((config) => {
    const { reponesive } = api.config;

    config.plugin('define').tap((options) => {
      options[0].REPONESIVE_DESIGN_WIDTH = reponesive.design.width;
      options[0].REPONESIVE_DESIGN_HEIGHT = reponesive.design.height;
      options[0].REPONESIVE_MIN_WIDTH = reponesive.min.width;
      options[0].REPONESIVE_MIN_HEIGHT = reponesive.min.height;
      options[0].REPONESIVE_TOLERANCE_WIDTH = reponesive.tolerance.width;
      options[0].REPONESIVE_TOLERANCE_HEIGHT = reponesive.tolerance.height;
      options[0].REPONESIVE_MODE = `'${reponesive.mode}'`;
      options[0].REPONESIVE_ROOT_VALUE = reponesive.rootValue;
      options[0].REPONESIVE_UNIT_PRECISION = reponesive.unitPrecision;
      return options;
    });

    config.module
      .rule('px2rem-loader')
      .test(/\.[jt]sx?$/)
      .use(join(__dirname, './loader/jsx-px2rem-loader.js'))
      .loader(join(__dirname, './loader/jsx-px2rem-loader.js'))
      .options({
        rootValue: reponesive.rootValue,
        unitPrecision: reponesive.unitPrecision,
      });

    config
      .entry('umi')
      .add(join(__dirname, `./responsive/index.js`))
      .add(join(__dirname, `./responsive/index.less`));

    return config;
  });
};
