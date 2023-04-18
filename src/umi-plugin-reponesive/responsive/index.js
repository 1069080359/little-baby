import {
  configSizeScale,
  getResponseScale,
  keepDecimal,
} from '../use-size-scale';

configSizeScale({
  design: {
    width: REPONESIVE_DESIGN_WIDTH,
    height: REPONESIVE_DESIGN_HEIGHT,
  },
  min: {
    width: REPONESIVE_MIN_WIDTH,
    height: REPONESIVE_MIN_HEIGHT,
  },
  mode: REPONESIVE_MODE,
  unitPrecision: REPONESIVE_UNIT_PRECISION,
  rootValue: REPONESIVE_ROOT_VALUE,
  tolerance: {
    width: REPONESIVE_TOLERANCE_WIDTH,
    height: REPONESIVE_TOLERANCE_HEIGHT,
  },
});

const getResponseFontSize = (clientWidth, clientHeight) => {
  return REPONESIVE_ROOT_VALUE * getResponseScale(clientWidth, clientHeight);
};

function autoResponse() {
  const target = document.documentElement;
  const { clientWidth, clientHeight } = target;
  const fontSize = getResponseFontSize(clientWidth, clientHeight);
  target.style.fontSize = `${keepDecimal(fontSize, 0)}px`;
}

autoResponse();

window.addEventListener('resize', autoResponse);
