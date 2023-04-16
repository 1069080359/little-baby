import { days, months, time, weeks } from './utils';

export const column = 4;

export const descInfo = [
  {
    label: '验孕棒第一次测试日期',
    value: '2023年4月14号晚上',
    key: 'one-measurement',
    span: 1,
  },
  {
    label: '验孕棒第二次测试日期',
    value: '2023年4月15号早上',
    key: 'two-measurement',
    span: 1,
  },
  {
    label: '北京海淀医院',
    value: '2023年4月15号下午',
    key: 'hospital-measurement',
    span: 2,
  },
  {
    label: '停经时间',
    value: time,
    key: 'menopausal-time',
    span: 1,
  },
  {
    label: '怀孕时间(停经时间) 天',
    value: `${days()}天`,
    key: 'pregnancy-time',
    span: 1,
  },
  {
    label: '怀孕时间(停经时间) 周',
    value: `${weeks()}周`,
    key: 'pregnancy-time',
    span: 1,
  },
  {
    label: '怀孕时间(停经时间) 月',
    value: `${months()}月`,
    key: 'pregnancy-time',
    span: 1,
  },
];
