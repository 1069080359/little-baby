export type DesignSize = {
  width: number;
  height: number;
};

export type SizeScaleConfig = {
  /** 设计稿尺寸，默认1920 * 1080 */
  design?: DesignSize;
  /** 最新缩放尺寸，默认1280 * 720 */
  min?: DesignSize;
  /** 缩放参照点，width 以设计稿宽度和实际宽度进行缩放，both: 兼顾设计稿宽度和高度和实际高度的缩放比例，那个小采用哪个 */
  mode: 'width' | 'both';
  /** 小数点位数， 默认5 */
  unitPrecision: number;
  /** 容差范围内按设计稿尺寸适配，反之按实际页面大小适配 */
  tolerance: DesignSize;
  /** 设计稿字体大小 */
  rootValue: number;
};
