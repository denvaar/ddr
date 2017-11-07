import store from '../store';


export const renderActiveTarget = (ctx, keyId, target) => {
  ctx.beginPath();
  ctx.arc(target.x + 25, 75, 25, 0, 2 * Math.PI, false);
  ctx.fillStyle = 'rgba(255,255,255,0.1)';
  ctx.shadowColor = 'rgb(255,255,255)';
  ctx.shadowBlur = 10;
  ctx.fill();
  ctx.shadowBlur = null;
  ctx.shadowColor = null;
};


export const renderTargets = (ctx, targets) => {
  const state = store.getState();

  ctx.drawImage(targets.left.image, targets.left.x, targets.left.y, 50, 50);
  ctx.drawImage(targets.down.image, targets.down.x, targets.down.y, 50, 50);
  ctx.drawImage(targets.up.image, targets.up.x, targets.up.y, 50, 50);
  ctx.drawImage(targets.right.image, targets.right.x, targets.right.y, 50, 50);

  Object.keys(state)
    .forEach(keyboardButton => {
      if (state[keyboardButton])
        renderActiveTarget(ctx, keyboardButton, targets[keyboardButton]);
    });
};
