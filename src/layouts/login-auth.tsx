import { Navigate, Outlet } from 'umi';
import { localCache } from '@/utils';

export default () => {
  const token = localCache.getItem('tooken');
  const tokenNull = JSON.stringify(token) == '{}';
  if (!tokenNull) {
    return <Navigate to="/" />;
  } else {
    return <Outlet />;
  }
};
