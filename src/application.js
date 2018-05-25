import { Container, Frame, ViewEngine, Viewport, CanvasRenderer2d, KeyboardInput } from '@picabia/picabia';
import { FpsCanvas } from '@picabia/component-fps';

import { GameModel } from './model/game';
import { GameView } from './view/game';

class Application {
  constructor (dom) {
    // -- model

    this._game = new GameModel();

    // -- view

    const containerOptions = {
      mode: 'cover',
      ratio: 1,
      maxPixels: 1000 * 1000
    };
    this._container = new Container('main', dom, containerOptions);

    this._v = new ViewEngine(dom);
    this._v.add(this._container);

    const renderer = this._v.add(new CanvasRenderer2d('2d'));

    const viewportOptions = {
      pos: { x: 100, y: 100 }
    };
    this._viewport = new Viewport('camera', viewportOptions);

    this._container.on('resize', (size) => this._viewport.setSize(size));
    this._v.add(this._viewport);

    this._v.add(new FpsCanvas(this._v, { renderer }, this._container));
    this._v.add(new GameView(this._v, { renderer }, this._game));

    // -- input

    this._keyboard = new KeyboardInput();
    this._keyboard.addGroup('move', {
      w: 'up',
      s: 'down',
      a: 'left',
      d: 'right',
      'a+w': 'up+left',
      'd+w': 'up+right',
      'a+s': 'down+left',
      'd+s': 'down+right'
    }, 'center');
    this._keyboard.addGroup('dash', {
      'shift': 'start'
    }, 'stop');

    this._keyboard.on('control', (control) => this._game.input(control));

    // -- start

    this.resize();

    const frameOptions = {
      freeze: true,
      maxDelta: 20,
      interval: false,
      intervalMs: 1000 / 50
    };
    this._frame = new Frame(frameOptions);
    this._frame.on('update', (time) => this._game.update(time));
    this._frame.on('render', (time) => this._v.render(time));
    this._frame.start();
  }

  resize () {
    this._container.resize();
    this._v.resize();
  }
}

export {
  Application
};
