import React, { useEffect, useState } from 'react';
import { TreeSelect } from 'antd';
import cityDatas from './citys';
import { initTreeData } from './utils';

const CitySelect = () => {
  const [options, setOptions] = useState<any>([]);

  const onSelect = (keys: any, node: any) => {
    console.log('node', node);
  };

  useEffect(() => {
    const newDatas = initTreeData(cityDatas).data;
    setOptions(newDatas);
  }, []);

  return (
    <TreeSelect
      treeData={options}
      style={{ width: '100%' }}
      fieldNames={{ value: 'L_ID', label: 'C_ZQNAME', children: 'child' }}
      onSelect={onSelect}
    />
  );
};

export default CitySelect;
