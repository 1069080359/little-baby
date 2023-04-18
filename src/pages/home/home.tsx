import { FloatButton } from 'antd';
import QRCode from './qr-code';
import SimpleDesc from './simple-desc';
import PregnancyKnowledge from './pregnancy-knowledge';
import './style.less';

const Home = () => {
  return (
    <div>
      <SimpleDesc />
      <PregnancyKnowledge />
      <FloatButton type="primary" style={{ right: 24 }} tooltip={<QRCode />} />
    </div>
  );
};
export default Home;
