import { View, CanvasLayer2d, CanvasRenderer2d } from '@picabia/picabia';

import { BackgroundView } from './background';
import { PlayerView } from './player';
import { GridView } from './grid';

class GameView extends View {
  _constructor (game) {
    this._game = game;
    this._viewport = this._vm.getViewport('camera');
    this._vm.addRenderer(new CanvasRenderer2d('2d'));

    this._bgLayer = new CanvasLayer2d('bg');
    this._vm.addLayer('main', this._bgLayer);

    this._createChild(BackgroundView, [], '2d', 'camera', 'bg');

    this._sceneLayer = new CanvasLayer2d('scene');
    this._vm.addLayer('main', this._sceneLayer);

    this._game.on('new-player', (player) => {
      this._player = player;
      this._createChild(PlayerView, [player], '2d', 'camera', 'scene');

      this._player.on('move', () => {
        this._viewport.setPos({ x: this._player._pos.x, y: this._player._pos.y });
        this._viewport.setZoom(1 - this._player._speed / 2);
      });
    });

    this._game.on('new-grid', (grid) => {
      this._createChild(GridView, [grid], '2d', 'camera', 'bg');
    });
  }
}

export {
  GameView
};
