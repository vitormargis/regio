# Regio

> Regio is a small plugin I’ve been working on for selecting/creating areas in DOM elements. WIP.

### Usage

```html
  <div class="canvas"></div>
```

```js
  var canvasElement = document.getElementsByClassName('canvas')[0];

  // Just by defining a new Ragio instance it will start working in the selected DOM node
  var canvas = new Regio(canvasElement {
    drawable: true, //default
    removable: true //default
  });

  function go(to){ window.open(to); }

  // You can programmatically create areas
  canvas.add([
    {"width":"250px","height":"90px","top":"0","right":"","bottom":"","left":"0","to":"https://www.ticketcarportalrede.com.br/#/login","click":go.bind(this, "https://www.ticketcarportalrede.com.br/#/login")},
    {"width":"250px","height":"90px","top":"200px","right":"","bottom":"","left":"0","to":"https://www.ticketcarportalrede.com.br/#/login","click":go.bind(this, "https://www.ticketcarportalrede.com.br/#/login")}
  ])

  // You can append DOM to your areas
  canvas.append({
    html: '<div class="edit"></div>',
    callback: function({ area }){
    // you can then do something with this new 'edit'
  }})

  // You can list all your areas
  canvas.areas();

  // You get a single area
  canvas.areas(1);

  // You can list all DOM nodes for the areas
  canvas.nodes();

  // You get a single DOM node for an area
  canvas.nodes(1);

  // You can programmatically remove an area
  canvas.remove(1);

```

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
