const plugin = require('tailwindcss/plugin');

const defaultColorValues = {
  transparent: 'transparent',
  current: 'currentColor',
  inherit: 'inherit',
  black: '0 0 0',
  white: '255 255 255',
};

function getColorConfig(colors) {
  const colorValues = {...defaultColorValues, ...colors};
  const colorConfig = {};

  Object.entries(colorValues).forEach((color) => {
    const [name, value] = color;

    if (typeof value === 'object') {
      colorConfig[name] = {};

      Object.keys(value).forEach((modifier) => {
        colorConfig[name][modifier] = ({ opacityValue }) => {
          let color = name;

          if (modifier !== 'DEFAULT') {
            color = `${name}-${modifier}`;
          }

          if (opacityValue === undefined) {
            return `rgb(var(--color-${color}))`;
          }

          return `rgb(var(--color-${color}) / ${opacityValue})`;
        };
      });

      return;
    }

    colorConfig[name] = ({ opacityValue }) => {
      if (['current', 'inherit', 'transparent'].includes(name)) {
        return `var(--color-${name})`;
      }

      if (opacityValue === undefined) {
        return `rgb(var(--color-${name}))`;
      }

      return `rgb(var(--color-${name}) / ${opacityValue})`;
    };
  });

  return colorConfig;
}

function getColorVars(colors) {
  const colorValues = {...defaultColorValues, ...colors};
  const colorVars = {};

  Object.entries(colorValues).forEach((color) => {
    const [name, value] = color;

    if (typeof value === 'object') {
      Object.keys(value).forEach((modifier) => {
        if (modifier === 'DEFAULT') {
          colorVars[`--color-${name}`] = colorValues[name][modifier];
          return;
        }

        colorVars[`--color-${name}-${modifier}`] = colorValues[name][modifier];
      });

      return;
    }

    colorVars[`--color-${name}`] = colorValues[name];
  });

  return colorVars;
}

module.exports = plugin.withOptions(function (colors) {
  return function ({ addBase }) {
    addBase({
      ':root': {
        ...getColorVars(colors),
      },
      '::backdrop': {
        ...getColorVars(colors),
      },
    });
  }
}, function (colors) {
  return {
    theme: {
      colors: getColorConfig(colors),
      fill: getColorConfig(colors),
      stroke: getColorConfig(colors),
    },
  };
});
