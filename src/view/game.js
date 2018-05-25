import { View, CanvasLayer2d } from '@picabia/picabia';

import { BackgroundView } from './background';
import { PlayerView } from './player';
import { GridView } from './grid';

class GameView extends View {
  constructor (v, target, game) {
    super(v, target);

    this._game = game;

    this._container = this._v.get('container:main');
    this._viewport = this._v.get('viewport:camera');

    this._bgLayer = new CanvasLayer2d('bg', this._container);
    this._v.add(this._bgLayer);

    this._createChild(BackgroundView, { layer: 'bg' });

    this._v.add(new CanvasLayer2d('stage', this._container));

    this._game.on('new-player', (player) => {
      this._player = player;
      this._createChild(PlayerView, { layer: 'stage' }, player);

      this._player.on('move', () => {
        this._viewport.setPos({ x: this._player._pos.x, y: this._player._pos.y });
        this._viewport.setZoom(1 - this._player._speed / 2);
      });
    });

    this._game.on('new-grid', (grid) => {
      this._createChild(GridView, { layer: 'bg' }, grid);
    });
  }
}

export {
  GameView
};
