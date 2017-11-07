const loadAssets = (callback) => {
  let loadedCount = 0;
  const images = [
    { id: 'up',   file: "staticUp",     ext: ".png" },
    { id: 'down', file: "staticDown",   ext: ".png" },
    { id: 'left', file: "staticLeft",   ext: ".png" },
    { id: 'right', file: "staticRight",  ext: ".png" }
  ];

  const imageLoaded = (event) => {
    loadedCount++;
    if (loadedCount === images.length) callback(assets);
  };

  const assets = images.reduce((acc, cur, i) => {
    const img = new Image();
    acc[cur.id] = {};
    img.src = `assets/${cur.file}${cur.ext}`;
    img.onload = imageLoaded;
    acc[cur.id].img = img;
    return acc;
  }, {});
};

export default loadAssets;
