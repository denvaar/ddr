import store from './store';
import loadAssets from './loadAssets';
import { renderTargets } from './renderers/targets';
import targets from './targets';


store.subscribe(() => console.log(store.getState()));


const checkKey = (e, isDown) => {
  e = e || window.event;
  const msg = isDown ? 'PRESSED' : 'RELEASED';

  if (e.keyCode == '75') { // up arrow
    store.dispatch({ type: `UP_${msg}` });
  }
  else if (e.keyCode == '74') { // down arrow
    store.dispatch({ type: `DOWN_${msg}` });
  }
  else if (e.keyCode == '72') { // left arrow
    store.dispatch({ type: `LEFT_${msg}` });
  }
  else if (e.keyCode == '76') { // right arrow
    store.dispatch({ type: `RIGHT_${msg}` });
  }
}

const initGameController = () => {
  document.onkeydown = (e) => { checkKey(e, true) };
  document.onkeyup = (e) => { checkKey(e, false) };
};

const canvas = document.createElement('canvas');
canvas.width = 400;
canvas.height = 400;
canvas.style.border = "1px solid #ddd";
document.body.appendChild(canvas);
const ctx = canvas.getContext('2d');

const render = (ctx, targets) => {
  ctx.clearRect(0, 0, 400, 400);
  ctx.fillStyle = '#3d5966';
  ctx.fillRect(0, 0, 400, 400);

  renderTargets(ctx, targets);
};

const frame = (targets) => {
  render(ctx, targets)
  requestAnimationFrame(() => frame(targets));
};

window.onload = () => {
  initGameController();

  loadAssets((assets) => {
    targets.up.image = assets.up.img;
    targets.down.image = assets.down.img;
    targets.right.image = assets.right.img;
    targets.left.image = assets.left.img;
    requestAnimationFrame(() => frame(targets));
  });
};
