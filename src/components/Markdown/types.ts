import type { Options } from 'react-markdown';

export type MarkdownProps = Omit<Options, 'children'> & {
  className?: string;
  // html片段
  htmlStr?: string;
  // 数据源
  source?: string;
};
