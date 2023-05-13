import { Steps } from 'antd';
import { stepsDescInfo } from './const';

const StepsDesc = () => {
  return <Steps direction="vertical" progressDot items={[...stepsDescInfo]} />;
};
export default StepsDesc;
