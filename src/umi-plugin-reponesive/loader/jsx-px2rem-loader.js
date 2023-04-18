// 默认参数
const defaultopts = {
  rootValue: 14, // rem unit value (default: 14)
  unitPrecision: 5, // rem value precision (default: 5)
};

const pxRegExp = /\b(\d+(\.\d+)?)px\b/g;
/** 替换 行内 px 转 rem */
module.exports = function jsxPx2Rem(source) {
  if (this.cacheable) {
    this.cacheable();
  }
  let options = {};
  if (this.getOptions) {
    options = this.getOptions();
  }
  const config = { ...defaultopts, ...options };
  // 先test下有没有符合的如果有再进行替换
  if (pxRegExp.test(source)) {
    return source.replaceAll(pxRegExp, ($0, $1) => {
      let val = $1 / config.rootValue;
      // 精确到几位
      val = parseFloat(val.toFixed(config.unitPrecision));
      return val === 0 ? val : val + 'rem';
    });
  }
  return source;
};
