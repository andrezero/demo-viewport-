import { View, Wave } from '@picabia/picabia';

class BackgroundView extends View {
  // -- view

  _preUpdate () {
    if (!this._generateAngles) {
      this._generateAngles = Wave.cosine(this._time.t, 0, Math.PI / 64, 5000);
    }
    this._viewport.setAngle(this._generateAngles(this._time));
  }

  render (renderer) {
    const shape = this._viewport.getShape();

    renderer.setStrokeStyle('rgba(0,0,0,1)');
    renderer.setStrokeWidth(50);

    renderer.beginPath();
    shape.forEach(vector => renderer.lineTo(vector.x, vector.y));
    renderer.lineTo(shape[0].x, shape[0].y);
    renderer.stroke();
  }
}

export {
  BackgroundView
};
