import { useEffect, useState } from 'react';
import { useSize } from 'ahooks';
import {
  Default_Design_Size,
  Default_Min_Size,
  Default_mode,
  Default_root_value,
  Default_tolerance,
  Default_unit_precision,
} from './constant';
import type { SizeScaleConfig } from './types';

let listening = false;
let sizeScaleConfig: SizeScaleConfig = {
  design: Default_Design_Size,
  min: Default_Min_Size,
  mode: Default_mode,
  unitPrecision: Default_unit_precision,
  tolerance: Default_tolerance,
  rootValue: Default_root_value,
};

const fixedPrecision = (value: number) => {
  return parseFloat(value.toFixed(sizeScaleConfig.unitPrecision));
};

/** 增加了容差计算，小于 tolerance 配置的宽、高不会再适配 */
export const getResponseScale = (clientWidth: number, clientHeight: number) => {
  const { design, min, mode, tolerance } = sizeScaleConfig;
  const aspectRatio = clientWidth / clientHeight;
  const designAspectRatio = design.width / design.height;
  if (mode === 'both' && aspectRatio > designAspectRatio) {
    // 大于最小高度 且 显示区域的宽度和高度之间的最小比例 大于 设计稿的宽高比， 则按照高度进行缩放
    if (clientHeight < min.height) {
      return min.height / design.height;
    }
    const offset = design?.height - clientHeight;
    // 容差范围内，不缩放
    if (offset >= 0 && offset <= tolerance?.height) {
      return 1;
    }
    return clientHeight / design.height;
  } else {
    // 大于最小宽度 且 显示区域的宽度和高度之间的最大比例 小于 设计稿的宽高比， 则按照宽度进行缩放
    if (clientWidth < min.width) {
      return min.width / design.width;
    }
    const offset = design?.width - clientWidth;
    // 容差范围内，不缩放
    if (offset >= 0 && offset <= tolerance?.width) {
      return 1;
    }
    return clientWidth / design.width;
  }
};
/** 计算当前缩放 */
const calculateScale = (currentWidth: number, currentHeight: number) => {
  return fixedPrecision(getResponseScale(currentWidth, currentHeight));
};

/** 配置缩放的设计稿大小等 */
export const configSizeScale = (config: SizeScaleConfig) => {
  sizeScaleConfig = config;
  listening = true;
};
/**
 * 开启适配处理并使用默认缩放设置
 * 如需使用自定义配置，请使用 `configSizeScale` 方法
 */
export const enableSizeScale = () => {
  const { clientWidth, clientHeight } = window.document.documentElement;
  calculateScale(clientWidth, clientHeight);
  listening = true;
};

/** 计算当前缩放 */
export const getScale = () => {
  if (!listening) {
    return 1;
  }
  const { clientWidth, clientHeight } = window.document.documentElement;
  return calculateScale(clientWidth, clientHeight);
};

/** 获取缩放后的大小 */
export const getScaledSize = (size: number) => {
  if (!listening) {
    return size;
  }
  return fixedPrecision(size * getScale());
};

/** 计算屏幕缩放比例 */
const useSizeScale = () => {
  const [scale, setScale] = useState<number>(getScale());
  const size = useSize(document.body);

  useEffect(() => {
    if (size && listening) {
      const newScale = calculateScale(size.width, size.height);
      setScale(newScale);
    }
    return () => {};
  }, [size]);

  return scale;
};

/** 计算缩放后的尺寸大小 */
export const useScaledSize = (size: number) => {
  const [scaledSize, setScaledSize] = useState<number>(size);
  const scale = useSizeScale();

  useEffect(() => {
    if (size && listening && size < sizeScaleConfig.design.width) {
      setScaledSize(fixedPrecision(size * scale));
    }
    return () => {};
  }, [size, scale]);
  return scaledSize;
};

export const useScaleSizeAndScale = (size: number) => {
  const [scaledSize, setScaledSize] = useState<number>(size);
  const scale = useSizeScale();

  useEffect(() => {
    if (size && listening && size < sizeScaleConfig.design.width) {
      setScaledSize(fixedPrecision(size * scale));
    }
    return () => {};
  }, [size, scale]);
  return { scaledSize, scale };
};

export default useSizeScale;
