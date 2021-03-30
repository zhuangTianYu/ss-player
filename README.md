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
    id: 485508366,
    name: '孤独症DEMO',
    author: '功夫胖KungFuPen / KEY.L刘聪',
    src: 'https://music.163.com/song/media/outer/url?id=485508366.mp3',
    cover: 'http://p1.music.126.net/52rLhBNVfT1wZJW0eYcvpQ==/109951162938499438.jpg?param=130y130',
  },
  {
    id: 31445772,
    name: '理想三旬',
    author: '陈鸿宇',
    src: 'https://music.163.com/song/media/outer/url?id=31445772.mp3',
    cover: 'http://p1.music.126.net/cqTTEPAaxXG3cOwaE4E_-g==/109951163104103366.jpg?param=130y130',
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
