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
const config = {
  selector: '.ssl-player',
  list: [],
  autoplay: false,
};

const ssPlayer = new SSPlayer(config);

ssPlayer.play();
ssPlayer.pause();
ssPlayer.prev();
ssPlayer.next();
ssPlayer.destory();
```
