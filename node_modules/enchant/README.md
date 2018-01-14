## Enchant your objects

Transform objects or scalars using predefined set of transform functions.

## Installation

```sh
npm install enchant
```

## Usage

```js

// Define transform function
var transform = t({
	name: t().firstCharUpper().slice(0, 5),
	email: t().lowercase(),
	body: t().stripTags().trim()
});

// Apply transform function to the target object
contactRequestTransform({
	name: 'johny the wild',
	email: 'Johny.The.Wild@gmail.com',
	body: '<script>alert(1)</alert> uhaha!'
});

// ->

{
	name: 'Johny',
	email: 'johny.the.wild@gmail.com',
	body: 'uhaha!'
}
```

## Transforms

All transform are chainable.

### .lowercase()

Lowercase string

### .def(defaultValue)

Set default value

```js
t().def('beep').apply(null) === 'beep'; // true
```

### .del()

Remove property from object

```js
var transform = t({
	password: t().del()
});

transform({
	email: 'johny@example.com',
	password: 'qwerty123
});

// { email: 'johny@example.com' }
```

## License
MIT
