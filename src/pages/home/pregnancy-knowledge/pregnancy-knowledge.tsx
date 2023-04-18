import { useState } from 'react';
import { Card, List, Badge, Tabs } from 'antd';
import { weeks } from '../simple-desc';
import { pregnancyInstructionsInfo, pregnancyCycleInfo } from './const';
import './style.less';
const PregnancyKnowledge = () => {
  const [active, setActive] = useState<string>('1');

  const onChange = (key: string) => {
    setActive(key);
  };

  const renderItem = (item) => {
    const week = weeks().split('.')[0];
    console.log('item', week);
    return (
      <List.Item>
        <Badge.Ribbon
          text="当前周"
          color="green"
          placement="end"
          className={item.key !== +week ? 'hideBadge' : ''}
        >
          <Card title={item.title} className="pregnancy-knowledge-card">
            {item.data.map((i) => {
              return <p>{i}</p>;
            })}
          </Card>
        </Badge.Ribbon>
      </List.Item>
    );
  };

  const renderList = () => {
    const info = {
      '1': pregnancyInstructionsInfo,
      '2': pregnancyCycleInfo,
    };
    return (
      <List
        className="pregnancy-knowledge"
        grid={{ gutter: 16, column: 4 }}
        dataSource={info[active]}
        rowKey="key"
        renderItem={renderItem}
      />
    );
  };

  const renderTabsItem = [
    {
      key: '1',
      label: '孕须知',
      children: renderList(),
    },
    {
      key: '2',
      label: '孕周期',
      children: renderList(),
    },
  ];

  return <Tabs items={renderTabsItem} activeKey={active} onChange={onChange} />;
};

export default PregnancyKnowledge;
