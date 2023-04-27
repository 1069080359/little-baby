import { days, months, time, weeks } from './utils';

export const column = 4;

export const descInfo = [
  {
    label: '验孕棒第一次',
    value: '2023年4月14号晚上',
    key: 'one-measurement',
    span: 2,
  },
  {
    label: '验孕棒第二次',
    value: '2023年4月15号早上',
    key: 'two-measurement',
    span: 2,
  },
  {
    label: '北京海淀医院',
    value: '2023年4月15号下午(Prog[32.6 ng/mL],HCG[133.1 mIU/mL])',
    key: 'hospital-measurement',
    span: 2,
  },
  {
    label: '怀来县妇幼保健院',
    value: '2023年4月26号下午Prog[18.67 ng/mL],HCG[9471.10 mIU/mL]',
    key: 'huai-lai-fu-you',
    span: 2,
  },
  {
    label: '停经时间',
    value: time,
    key: 'menopausal-time',
    span: 2,
  },
  {
    label: '怀孕时间(天)',
    value: `${days()}天`,
    key: 'pregnancy-time',
    span: 2,
  },
  {
    label: '怀孕时间(周)',
    value: `${weeks()}周`,
    key: 'pregnancy-time',
    span: 2,
  },
  {
    label: '怀孕时间(月)',
    value: `${months()}月`,
    key: 'pregnancy-time',
    span: 2,
  },
];
