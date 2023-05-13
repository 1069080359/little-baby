import { FloatButton, Watermark } from 'antd';
import QRCode from './qr-code';
import StepsDesc from './steps-desc';
import SimpleDesc from './simple-desc';
import PregnancyKnowledge from './pregnancy-knowledge';
import './style.less';

const Home = () => {
  return (
    <Watermark
      content={['我老婆最美', '我老婆最棒', '肤白貌美大长腿', '就是我老婆']}
    >
      <SimpleDesc />
      <StepsDesc />
      <PregnancyKnowledge />
      <FloatButton type="primary" style={{ right: 24 }} tooltip={<QRCode />} />
    </Watermark>
  );
};
export default Home;
