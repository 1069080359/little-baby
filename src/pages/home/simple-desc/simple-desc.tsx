import React from 'react';
import { Descriptions } from 'antd';
import { column, descInfo } from './const';

const SimpleDesc = () => {
  return (
    <Descriptions
      title="老婆孕期详细信息"
      // layout="vertical"
      // bordered
      column={column}
    >
      {descInfo.map((item) => {
        return (
          <Descriptions.Item label={item.label} key={item.key} span={item.span}>
            {item.value}
          </Descriptions.Item>
        );
      })}
    </Descriptions>
  );
};

export default SimpleDesc;
