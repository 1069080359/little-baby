import { FloatButton } from 'antd';
import QRCode from './qr-code';
import SimpleDesc from './simple-desc';

const Home = () => {
  return (
    <div>
      <SimpleDesc />
      <p>- 25 号回家再做一次检查。</p>
      <p>- 孕 8 周去医院做第一次 b 超检查。</p>
      <FloatButton type="primary" style={{ right: 24 }} tooltip={<QRCode />} />
    </div>
  );
};
export default Home;
