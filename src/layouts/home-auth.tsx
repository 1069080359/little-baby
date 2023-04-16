import { useOutlet, Navigate } from 'umi';
import { localCache } from '@/utils';

/** 可在此处进行判断用户是否登录，或者是否有权限进入，类型路由守卫 */
const UserAuthentication = () => {
  const outlet = useOutlet();
  const token = localCache.getItem('tooken');
  const tokenNull = JSON.stringify(token) == '{}';
  return <>{!tokenNull ? outlet : <Navigate to="/login" />}</>;
};

export default UserAuthentication;
