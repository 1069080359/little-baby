import moment from 'moment';

// 一周按 7 天
const wek = 7;

// 一个月按 4周7天算
const mts = 4 * wek;

// 怀孕时间(停经时间)
export const time = '2023-03-20';

/** 计算 停经时间 到今天 */
export const days = () => moment().diff(moment(time), 'days');

/** 计算 停经时间 到今天第几周 */
export const weeks = () => (days() / wek).toFixed(2);

/** 计算 停经时间 到今天第几个月 */
export const months = () => (days() / mts).toFixed(2);
