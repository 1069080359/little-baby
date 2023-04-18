import { getScaledSize } from './use-size-scale';

/**
 * 保留小数位数
 * @param decimals 数值
 * @param decimalLength 保留小数位
 * @returns
 */
export const keepDecimal = (decimals: number, decimalLength: number = 2) => {
  const length = Math.pow(10, Number(decimalLength));
  return Math.round(decimals * length) / length;
};

export const scaleConversionNumber = (size: number | string) => {
  // 判断是否是数字以及是否是字符串数字
  const isNum = !isNaN(parseFloat(size)) && isFinite(size);
  if (isNum) {
    return getScaledSize(+size);
  } else {
    // 判断如果是 % 的单位直接设置单位
    const reg2 = /^\d+(%)?$/;
    if (reg2.test(size)) {
      return size;
    }

    // 判断如果是带 px 的单位，去掉 px 转为数字返回
    const reg1 = /^\d+((px))?$/;
    if (reg1.test(size)) {
      const sizeNum = size.split('px')[0];
      return getScaledSize(+sizeNum);
    }
    return 0;
  }
};
