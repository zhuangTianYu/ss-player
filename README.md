# ss-player

## about

你可以为 `ss-player` 赋予任何名字。

无论是 `seaside`，`sunset`，或是简单的紫色。

## config

| 参数 | 说明 | 类型 | 必传 | 默认值 |
| - | - | - | - | - |
| selector | 挂载实例元素 | string | y |  |
| autoplay | 是否自动播放 | boolean | n | false |
| list | 音频列表 | array | y | [] |
| └─ item.id | 音频 id | number | y |  |
| └─ item.name | 音频名称 | string | y |  |
| └─ item.author | 音频作者 | string | y |  |
| └─ item.src | 音频资源 | string | y |  |
| └─ item.cover | 音频封面 | string | y |  |

## api

| 方法名 | 说明 | 用法 |
| - | - | - |
| play | 播放 | ssPlayer.play() |
| pause | 暂停 | ssPlayer.pause() |
| prev | 播放上条音频 | ssPlayer.prev() |
| next | 播放下条音频 | ssPlayer.next() |
| destory | 销毁实例 | ssPlayer.destory() |

## usage

```javascript
const list = [
  {
    id: 167977,
    name: '七号公园',
    author: '许嵩',
    src: 'https://music.163.com/song/media/outer/url?id=167977.mp3',
    cover: 'http://p1.music.126.net/yLnUrQMddgKLzvVEjeZG5Q==/6012129581027921.jpg?param=130y130',
  },
  {
    id: 430793721,
    name: '当妮走了',
    author: '徐真真',
    src: 'https://music.163.com/song/media/outer/url?id=430793721.mp3',
    cover: 'http://p2.music.126.net/6rutfuUq9RFByWwGNy_FrQ==/17939631719002226.jpg?param=130y130',
  },
  {
    id: 22201016,
    name: '你快乐所以我快乐 (Live)',
    author: '王菲',
    src: 'https://music.163.com/song/media/outer/url?id=22201016.mp3',
    cover: 'http://p1.music.126.net/3Qs4Hf3V4b00GjH7s1pJ8w==/109951163262931938.jpg?param=130y130',
  },
];

const config = {
  selector: '.ss-player',
  autoplay: false,
  list,
};

const ssPlayer = new SSPlayer(config);

ssPlayer.play();
ssPlayer.pause();
ssPlayer.prev();
ssPlayer.next();
ssPlayer.destory();
```
