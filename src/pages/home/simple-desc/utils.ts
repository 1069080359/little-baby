import moment from 'moment';

/** 一周按 7 天 */
const wek = 7;

/** 一个月按 4周7天算 */
const mts = 4 * wek;

/** 旧 停经时间，B 超之后更正 */
export const oldTtime = '2023-03-20';

// 新 停经时间 旧 时间 早 5 天
export const time = '2023-03-16';

/** 计算 停经时间 到今天 */
export const days = () => moment().diff(moment(time), 'days');

/** 计算 停经时间 到今天第几周 */
export const weeks = () => (days() / wek).toFixed(1);

/** 计算 停经时间 到今天第几个月 */
export const months = () => (days() / mts).toFixed(1);
