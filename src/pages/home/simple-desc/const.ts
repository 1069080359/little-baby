import { days, months, oldTtime, time, weeks } from './utils';

export const column = 2;

export const descInfo = [
  {
    label: '停经时间',
    value: time,
    key: 'menopausal-time',
    span: column,
  },
  {
    label: '怀孕-天',
    value: `${days()}天`,
    key: 'pregnancy-time',
    span: column,
  },
  {
    label: '怀孕-周',
    value: `${weeks()}周`,
    key: 'pregnancy-time',
    span: column,
  },
  {
    label: '怀孕-月',
    value: `${months()}月`,
    key: 'pregnancy-time',
    span: column,
  },
];
