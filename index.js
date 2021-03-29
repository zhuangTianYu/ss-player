let instances = [];

class SSPlayer {
  constructor(selector) {
    const $root = document.querySelector(selector);

    if (!$root) {
      return console.error(`Error: Can not found root element by "${selector}".`);
    }

    if (instances.includes(selector)) {
      return console.error(`Error: Exists player instance on "${selector}".`);
    }

    this.handleDragStart = this.handleDragStart.bind(this);
    this.handleDragMove = this.handleDragMove.bind(this);
    this.handleDragEnd = this.handleDragEnd.bind(this);

    this.isMobile = /mobile/i.test(window.navigator.userAgent);
    this.selector = selector;
    this.$root = $root;
    this.render();
    this.bind();
    this.current = 0;
    this.duration = 0;
    this.dragEndTime = Date.now();

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

    this.$progress.addEventListener('click', e => {
      if (Date.now() - this.dragEndTime > 10) {
        const { width } = this.$progress.getClientRects()[0];
        const percent = e.offsetX / width;

        this.current = this.duration * percent;
      }
    });
  }

  unbind() {
    if (this.isMobile) {
      this.$slider.removeEventListener('touchstart', this.handleDragStart);
    } else {
      this.$slider.removeEventListener('mousedown', this.handleDragStart);
    }
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

    if (this.isMobile) {
      window.removeEventListener('touchmove', this.handleDragMove);
      window.removeEventListener('touchend', this.handleDragEnd);
    } else {
      window.removeEventListener('mousemove', this.handleDragMove);
      window.removeEventListener('mouseup', this.handleDragEnd);
    }
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

  destory() {
    this.unbind();
    this.$root.innerHTML = '';
    instances = instances.filter(selector => selector !== this.selector);
  }
}

const ssPlayer = new SSPlayer('.ss-player');

ssPlayer.duration = 60;
