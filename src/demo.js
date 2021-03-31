import SSPlayer from './ss-player';
import './ss-player.css';

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

window.ssPlayer = ssPlayer;
