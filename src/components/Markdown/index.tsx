/**
 * 页面渲染一个`.md`文件时使用。
 * 注意`react` 中能正常引入`.md`文件需要 `webpack` 配置[raw-loader](https://www.npmjs.com/package/raw-loader)。
 * htmlStr  `innerHTML`   string
 * source 符合`markdown`语法的字符串或者`.md`文件内容  string
 */

import React, { useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import classnames from 'classnames';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import type { SyntaxHighlighterProps } from 'react-syntax-highlighter';
import type { MarkdownProps } from './types';
import './index.less';

const PublicMarkdown = (props: MarkdownProps) => {
  const { className, htmlStr, source, ...resetProps } = props;
  const classNames = useMemo(
    () => classnames('markdown-container', className),
    [className],
  );
  // 解析后的.md文件
  if (source) {
    return (
      <ReactMarkdown
        className={classNames}
        // eslint-disable-next-line react/no-children-prop
        children={source}
        remarkPlugins={[remarkGfm]}
        components={{
          code: (params) => {
            const { node, inline, className: cls, children, ...reset } = params;
            const match = /language-(\w+)/.exec(cls || '');
            if (!inline && match) {
              return (
                <SyntaxHighlighter
                  language={match[1]}
                  PreTag="div"
                  className="language-container"
                  {...(reset as SyntaxHighlighterProps)}
                >
                  {String(children).replace(/\n$/, '')}{' '}
                </SyntaxHighlighter>
              );
            }
            return (
              <code className={cls} {...reset}>
                {children}
              </code>
            );
          },
        }}
        {...resetProps}
      />
    );
  }
  // html string
  if (htmlStr) {
    return (
      <div
        className={classNames}
        dangerouslySetInnerHTML={{ __html: htmlStr }}
      />
    );
  }
  return null;
};
export default PublicMarkdown;
