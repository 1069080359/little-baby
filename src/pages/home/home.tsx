import { Divider, FloatButton, Input, List, Watermark } from 'antd';
import { useMemo, useState } from 'react';
import QRCode from './qr-code';
import { songSheet } from './song-sheet';
import './style.less';

const Home = () => {
  const [songList, setSongList] = useState(songSheet);
  /** 歌手数量 */
  const numberSingers = useMemo(() => {
    return songList.length;
  }, [songList]);
  /** 歌曲数量 */
  const numberSongs = useMemo(() => {
    const num = songList.reduce((pre, item) => {
      return pre + item.songTitles.length;
    }, 0);
    return num;
  }, [songList]);

  const onFilterChange = (value: string) => {
    if (!value) {
      setSongList(songSheet);
    }
    // 使用 filter 方法对数组进行筛选
    const result = songSheet.filter((song) => {
      // 检查歌手名是否包含关键词
      const singerMatch = song.singer.includes(value);
      // 检查歌曲标题是否包含关键词
      const titleMatch = song.songTitles.some((title) => title.includes(value));
      // 返回歌手名或歌曲标题中包含关键词的条目
      return singerMatch || titleMatch;
    });
    setSongList(result);
  };

  return (
    <div className="home-wrapper">
      <Input.Search
        placeholder="搜索歌手/歌曲"
        style={{ width: '100%' }}
        allowClear
        onSearch={onFilterChange}
        enterButton
      />
      <div className="number-wrapper">
        <div>
          <span>歌手数量</span>
          <span>{numberSingers}</span>
        </div>
        <div>
          <span>歌曲数量</span>
          <span>{numberSongs}</span>
        </div>
      </div>
      <Watermark
        content={['我老婆最美', '我老婆最棒', '肤白貌美大长腿', '就是我老婆']}
      >
        {songList.map((item, index) => {
          return (
            <div key={index} className="song-sheet-wrapper">
              <List
                key={index}
                size="small"
                header={`${index + 1}、${item.singer}`}
                dataSource={item.songTitles}
                renderItem={(i, d) => (
                  <List.Item key={d}>
                    {d + 1}、{i}
                  </List.Item>
                )}
              />
              <Divider style={{ margin: '0' }} />
            </div>
          );
        })}
        <FloatButton.Group shape="circle">
          <FloatButton.BackTop key="t" />
          <FloatButton type="primary" key="c" tooltip={<QRCode />} />
        </FloatButton.Group>
      </Watermark>
    </div>
  );
};
export default Home;
