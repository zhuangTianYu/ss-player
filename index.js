let instances = [];

class SSPlayer {
  constructor(config) {
    const {
      selector,
      autoplay = false,
      list = [],
    } = config;

    const $root = document.querySelector(selector);

    if (!$root) {
      return console.error(`Error: Can not found root element by "${selector}".`);
    }

    if (instances.includes(selector)) {
      return console.error(`Error: Exists player instance on "${selector}".`);
    }

    if (!(Array.isArray(list) && list.length)) {
      return console.error(`Error: List must be an array with length.`);
    }

    this.onDurationChange = this.onDurationChange.bind(this);
    this.onProgress = this.onProgress.bind(this);
    this.onCanPlay = this.onCanPlay.bind(this);
    this.onTimeUpdate = this.onTimeUpdate.bind(this);
    this.onEnded = this.onEnded.bind(this);
    this.handleDragStart = this.handleDragStart.bind(this);
    this.handleDragMove = this.handleDragMove.bind(this);
    this.handleDragEnd = this.handleDragEnd.bind(this);
    this.handleProgress = this.handleProgress.bind(this);
    this.handlePlay = this.handlePlay.bind(this);
    this.handlePause = this.handlePause.bind(this);
    this.handlePrev = this.handlePrev.bind(this);
    this.handleNext = this.handleNext.bind(this);

    this.play = this.handlePlay;
    this.pause = this.handlePause;
    this.prev = this.handlePrev;
    this.next = this.handleNext;

    this.isMobile = /mobile/i.test(window.navigator.userAgent);
    this.selector = selector;
    this.list = list;
    this.$root = $root;
    this.render();
    this.bind();
    this.loaded = 0;
    this.current = 0;
    this.duration = 0;
    this.playing = autoplay;
    this.dragging = false;
    this.dragEndTime = Date.now();
    this.index = 0;

    instances.push(selector);

    return this;
  }

  create(type, className, quickName, children) {
    const $el = document.createElement(type);
  
    className.split(' ').forEach(item => $el.classList.add(item));

    if (quickName) this[quickName] = $el;

    if (children === undefined) return $el;
  
    Array.isArray(children)
      ? children.forEach(item => $el.append(item))
      : $el.append(children);
  
    return $el;
  }

  render() {
    const create = this.create.bind(this);

    const $container = create(
      'div',
      'ss-player__container',
      '$container',
      [
        create('div', 'ss-player__board', '$board', [
          create('div', 'ss-player__current', '$current'),
          create(
            'div',
            'ss-player__progress',
            '$progress',
            [
              create('div', 'ss-player__slider', '$slider'),
              create('div', 'ss-player__played', '$played'),
              create('div', 'ss-player__loaded', '$loaded'),
            ],
          ),
          create('div', 'ss-player__duration', '$duration'),
        ]),
        create('div', 'ss-player__options', '$options', [
          create('button', 'ss-player__button ss-player__prev', '$prev', 'prev'),
          create('button', 'ss-player__button ss-player__play', '$play', 'play'),
          create('button', 'ss-player__button ss-player__pause', '$pause', 'pause'),
          create('button', 'ss-player__button ss-player__next', '$next', 'next'),
        ]),
        create('audio', 'ss-player__audio', '$audio'),
      ],
    );

    this.$root.append($container);
  }

  bind() {
    if (this.isMobile) {
      this.$slider.addEventListener('touchstart', this.handleDragStart);
    } else {
      this.$slider.addEventListener('mousedown', this.handleDragStart);
    }

    this.$progress.addEventListener('click', this.handleProgress);
    this.$play.addEventListener('click', this.handlePlay);
    this.$pause.addEventListener('click', this.handlePause);
    this.$prev.addEventListener('click', this.handlePrev);
    this.$next.addEventListener('click', this.handleNext);

    this.$audio.addEventListener('durationchange', this.onDurationChange);
    this.$audio.addEventListener('progress', this.onProgress);
    this.$audio.addEventListener('canplay', this.onCanPlay);
    this.$audio.addEventListener('timeupdate', this.onTimeUpdate);
    this.$audio.addEventListener('ended', this.onEnded);
  }

  unbind() {
    if (this.isMobile) {
      this.$slider.removeEventListener('touchstart', this.handleDragStart);
    } else {
      this.$slider.removeEventListener('mousedown', this.handleDragStart);
    }
  }

  onDurationChange() {
    this.duration = this.$audio.duration;
  }

  onProgress() {
    this.loaded = this.$audio.buffered.end(this.$audio.buffered.length - 1);
  }

  onCanPlay() {
    if (this.playing) {
      this.$audio.play();
    }
  }

  onTimeUpdate() {
    if (this.dragging) return;

    this.current = this.$audio.currentTime;
  }

  onEnded() {
    this.index = this.index;
  }

  handleDragStart() {
    this.dragging = true;

    if (this.isMobile) {
      window.addEventListener('touchmove', this.handleDragMove);
      window.addEventListener('touchend', this.handleDragEnd);
    } else {
      window.addEventListener('mousemove', this.handleDragMove);
      window.addEventListener('mouseup', this.handleDragEnd);
    }
  }

  handleDragMove(e) {
    if (!this.dragging) return;

    const { left, width } = this.$progress.getClientRects()[0];

    let nextLeft;

    if (this.isMobile) {
      if (e.touches.length > 1) return;

      nextLeft = e.touches[0].clientX - left;
    } else {
      nextLeft = e.clientX - left;
    }

    if (nextLeft < 0) {
      this.current = 0;
    } else if (nextLeft > width) {
      this.current = this.duration;
    } else {
      const percent = nextLeft / width;

      this.current = this.duration * percent;
    }
  }

  handleDragEnd() {
    this.dragging = false;
    this.dragEndTime = Date.now();
    this.$audio.currentTime = this.current;

    if (this.isMobile) {
      window.removeEventListener('touchmove', this.handleDragMove);
      window.removeEventListener('touchend', this.handleDragEnd);
    } else {
      window.removeEventListener('mousemove', this.handleDragMove);
      window.removeEventListener('mouseup', this.handleDragEnd);
    }
  }

  handleProgress(e) {
    if (Date.now() - this.dragEndTime > 10) {
      const { width } = this.$progress.getClientRects()[0];
      const percent = e.offsetX / width;
      const current = this.duration * percent;

      this.current = current;
      this.$audio.currentTime = current;
    }
  }

  handlePlay() {
    this.playing = true;
    this.$audio.play();
  }

  handlePause() {
    this.playing = false;
    this.$audio.pause();
  }

  handlePrev() {
    this.index = (this.index - 1 + this.list.length) % this.list.length;
  }

  handleNext() {
    this.index = (this.index + 1) % this.list.length;
  }

  complete(num) {
    return num < 10 ? `0${num}` : num;
  }

  formatTime(second) {
    second = Math.round(second);

    const hh = this.complete(Math.floor(second / 3600));
    const mm = this.complete(Math.floor((second - hh * 3600) / 60));
    const ss = this.complete(second % 60);

    if (hh === '00') return `${mm}:${ss}`;

    return `${hh}:${mm}:${ss}`;
  }

  get current() {
    return this._current;
  }

  set current(value) {
    const percent = value / this.duration;

    this._current = value;
    this.$current.innerHTML = this.formatTime(value);
    this.$slider.style.left = `${(percent * 100).toFixed(2)}%`;
    this.$played.style.width = `${(percent * 100).toFixed(2)}%`;
  }

  get duration() {
    return this._duration;
  }

  set duration(value) {
    this._duration = value;
    this.$duration.innerHTML = this.formatTime(value);
  }

  get playing() {
    return this._playing;
  }

  set playing(value) {
    this._playing = value;

    if (value) {
      this.$play.style.display = 'none';
      this.$pause.style.display = 'inline-block';
    } else {
      this.$play.style.display = 'inline-block';
      this.$pause.style.display = 'none';
    }
  }

  get loaded() {
    return this._loaded;
  }

  set loaded(value) {
    const percent = value / this.duration;

    this._loaded = value;
    this.$loaded.style.width = `${(percent * 100).toFixed(2)}%`;
  }

  get index() {
    return this._index;
  }

  set index(value) {
    this._index = value;

    this.loaded = 0;
    this.current = 0;
    this.duration = 0;

    const item = list[value];

    this.$audio.src = item.src;
  }

  destory() {
    this.unbind();
    this.$root.innerHTML = null;
    instances = instances.filter(selector => selector !== this.selector);
  }
}
