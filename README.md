# canvas-draw

A very simple library for describing scenes on a canvas, with the option of wiring up inputs. I would not recommend using it, as breaking changes are still going to occur, while it is being improved upon.

## Installation

As this library is not published on npm, it requires local installation, as follows:

```
npm run build && npm link
```

Then, in another project, run:

```
npm link canvas-draw
```

On subsequent updates, run

```
npm uninstall canvas-draw && npm link canvas-draw
```

in order to update the symbolic link, as it seems to becomes invalid.