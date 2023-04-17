import { FloatButton } from 'antd';
import QRCode from './qr-code';
import SimpleDesc from './simple-desc';

const Home = () => {
  return (
    <div>
      <SimpleDesc />
      - 孕 8 周去医院做第一次 b 超检查。
      <FloatButton type="primary" style={{ right: 24 }} tooltip={<QRCode />} />
    </div>
  );
};
export default Home;
