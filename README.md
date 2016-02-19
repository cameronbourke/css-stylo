stylo
=========================

Built with react in mind, stylo takes a string representing css and converts it to a style object (stylo).

## Installation

```
npm install --save stylo
```

## Demo & Example

Live demo: [cameronbourke.github.io/stylo](http://cameronbourke.github.io/stylo/example/index.html)

To build the example locally, clone this repo then run:

```
npm install
npm start
Then open localhost:8080 in a browser.
```

## Usage

Simply pass a string to `stylo`. Using ES6 [template strings](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/template_strings) makes creating a string of css trivial. The function will look for certain css selectors in the string, at the moment only `.classes` and `#ids` are supported. It will then go on and create a corresponding object of each selector.
```js
// using babel and a module loader
import stylo from 'stylo';

const style = stylo(`
	.example {
		color: #34e233;
		line-height: 1.4;
		padding: 10px 30px 20px 0px;
		border-bottom: 2px solid red;
	}
`);
```

The returned value looks like:
```css
{
	"example": {
	  "color": "#34e233",
	  "lineHeight": 1.4,
	  "padding": "10 30 20 0",
	  "borderBottom": "2 solid red"
	}
}
```

You can then use this object to apply inline styles to your components.
```html
<div style={style.example}>I'm an example</div>
```

This can be particularly handy when working with React Native because you are able to define your styles using css's syntax. **Note** when using `px` values, `stylo` will remove it so that both React and React Native are able to interpret the value, as React handles the number `10` to equal `10px`.

<!-- The best part is that the styles will cascade just like css does, so something like this will work as expected.
```js
// css string representation
const style = stylo(`
	.first {
		color: red;
		font-size: 20px;
	}

	.first {
		color: blue
	}
`);

// returned value
{
  "first": {
		"color": "blue",
		"fontSize": 20
  }
}
``` -->

### Bonus

We can even do nesting! Just like in Sass and Less.
```js
// css string representation
const style = stylo(`
	.initial {
		color: orange;

		.nested {
			border: '1px solid grey';

			.nested-again {
				width: 500px
			}

		}
	}
`);

// returned value
{
	"initial": {
	  "color": "orange",
	  "nested": {
	    "border": "'1 solid grey'",
	    "nested-again": {
	      "width": 500
	    }
	  }
	}
}

```

## Todo

- Add unit tests
- Create style objects without a selector
- Throw helpful errors if the css is not valid
- Add a second argument for parsing numbers
- Add a some ability to cascade styles

## License

MIT Licensed Copyright (c) Cameron Bourke 2016
