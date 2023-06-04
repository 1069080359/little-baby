const cityCode: any = {
  '2': 'sheng',
  '4': 'shi',
  '6': 'xian',
  '9': 'xinag',
  '12': 'cun',
};

export const initTreeData = (data: any) => {
  const result: { data: any; flatList: any } = {
    data: [...JSON.parse(JSON.stringify(data))],
    flatList: [],
  };
  const f = (array: any, parentItem?: any) => {
    if (Array.isArray(array)) {
      array.forEach((item) => {
        // item.key = item.L_ID;
        item.isLeaf = !item.child?.length;
        item.parentKey = parentItem?.key || item.L_PARID;
        // 有父级并且父级不是全国，组装个人需要的数据
        if (parentItem && parentItem.C_ZQCODE !== '200000') {
          // 存储 父级 item 按省、市、县、乡、村
          item.parents = {
            ...(parentItem.parents || {}),
            [cityCode[parentItem.C_ZQCODE.length]]: parentItem,
          };

          // 存储 拼接 父级 title code
          item.parentKeys ||= [];
          item.parentKeys.push(
            ...(parentItem.parentKeys || []),
            parentItem.C_ZQCODE,
          );
          item.titleCode = `${item.parentKeys.join('/')}/${item.C_ZQCODE}`;

          // 存储 拼接 父级 title
          item.parentTitleCodes ||= [];
          item.parentTitleCodes.push(
            ...(parentItem.parentTitleCodes || []),
            parentItem.C_ZQNAME,
          );
          item.title = `${item.parentTitleCodes.join('/')}/${item.C_ZQNAME}`;
        } else {
          item.titleCode = `${item.C_ZQCODE}`;
          item.title = `${item.C_ZQNAME}`;
        }
        result.flatList.push({ ...item });
        if (item.child && item.child.length) {
          f(item.child, item);
        }
      });
    }
    return result;
  };
  f(result.data);
  return result;
};
