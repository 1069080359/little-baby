/**
 * @name 主题的配置
 * @description 虽然叫主题，但是其实只是 less 的变量设置
 * @doc antd的主题设置 https://ant.design/docs/react/customize-theme-cn
 * @doc umi 的theme 配置 https://umijs.org/docs/api/config#theme
 */
export default {
  // 如果不想要 configProvide 动态设置主题需要把这个设置为 default
  // 只有设置为 variable， 才能使用 configProvide 动态设置主色调
  'root-entry-name': 'variable',
};
