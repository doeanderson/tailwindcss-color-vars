# Tailwind CSS Color Vars Plugin

Tailwind CSS plugin to easily manage colors via CSS variables. Pass an object of colors defined in RGB format and the theme's `colors`, `fill` and `stroke` will automatically have them, as well as a CSS variable for each color added to the document root.

## Usage

```bash
yarn add --dev @doeanderson/tailwindcss-color-vars
```

Add the following plugin to your `tailwind.config.js` file:

```js
require('./tailwind-colors-plugin')({
  colorName: 'R G B',
})
```

If you want variants of one color, you can format it like this:

```js
{
  colorName: {
    light: 'R G B',
    DEFAULT: 'R G B',
  },
}
```

Additionally, you can still extend or override colors via the standard theme configuration property.

## License

MIT License
