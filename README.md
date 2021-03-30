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

| 方法名 | 说明 | 参数 | 类型 | 必传 | 默认值 |
| - | - | - | - | - | - |
| play | 播放指定音频 | index | number | n | 0 |
| pause | 暂停 |  |  |  |  |
| prev | 播放上条音频 |  |  |  |  |
| next | 播放下条音频 |  |  |  |  |
| destory | 销毁实例 |  |  |  |  |

## usage

```javascript
const list = [
  {
    id: 1817447929,
    name: 'HAVE A NICE DAY',
    author: '魏如萱',
    src: 'https://music.163.com/song/media/outer/url?id=1817447929.mp3',
    cover: 'http://p1.music.126.net/0D5GQ9bVGVbG1G_Zd46xJQ==/109951165691103657.jpg?param=130y130',
  },
  {
    id: 1317457805,
    name: '披星戴月的想你',
    author: '告五人',
    src: 'https://music.163.com/song/media/outer/url?id=1317457805.mp3',
    cover: 'http://p2.music.126.net/NHOypDpCMWUSmGGdA2lXGQ==/109951163608032298.jpg?param=130y130',
  },
  {
    id: 487192031,
    name: '蓝雨',
    author: '张学友',
    src: 'https://music.163.com/song/media/outer/url?id=487192031.mp3',
    cover: 'http://p2.music.126.net/ubumnc-u_9hP7MOpZg4ygw==/18644418674184686.jpg?param=130y130',
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
