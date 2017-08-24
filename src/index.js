import { hasSomeParentTheClass } from './utils.js'

export default class Regio {
  constructor(element, options) {
    this.element = element;
    this.config = options || {
      movable: true,
      drawable: true,
      resizable: true,
      removable: true
    }

    this.regio = {
      areas: [],
      isSelecting: false,
      selectingNode: [],
      toAppend: '',
      coordinates: {}
    }

    if (this.config.drawable) {
      element.addEventListener('mousedown', this._mouseDown.bind(this));
      element.addEventListener('mousemove', this._mouseMove.bind(this));
      element.addEventListener('mouseup', this._mouseUp.bind(this));
    }

    element.addEventListener('click', this._clickArea);
  }

  _mouseDown(event) {
    if (hasSomeParentTheClass(event.target, 'regio')) return;

    this.regio.selectingNode = document.createElement("div");
    this.regio.selectingNode.classList.add('regio');
    this.regio.selectingNode.classList.add('selecting')
    this.element.appendChild(this.regio.selectingNode)

    this.regio.coordinates = {
      x: Number(event.layerX),
      y: Number(event.layerY),
    }
    this.regio.isSelecting = true;
  }

  _mouseMove(event) {
    if (hasSomeParentTheClass(event.target, 'regio')) return;
    if (!this.regio.isSelecting) return;

    this.regio.selectingNode.style.height = Math.abs(event.layerY - this.regio.coordinates.y) + 'px';
    this.regio.selectingNode.style.width = Math.abs(event.layerX - this.regio.coordinates.x) + 'px'

    if (this.regio.coordinates.x < event.layerX) {
      this.regio.selectingNode.style.right = null;
      this.regio.selectingNode.style.left = this.regio.coordinates.x - 15 + 'px';
    } else {
      this.regio.selectingNode.style.left = null;
      this.regio.selectingNode.style.right = event.target.offsetWidth - this.regio.coordinates.x - 15 + 'px';
    }

    if (this.regio.coordinates.y < event.layerY) {
      this.regio.selectingNode.style.bottom = null;
      this.regio.selectingNode.style.top = this.regio.coordinates.y - 15 + 'px';
    } else {
      this.regio.selectingNode.style.top = null;
      this.regio.selectingNode.style.bottom = event.target.offsetHeight - this.regio.coordinates.y - 15 + 'px';
    }
  }

  _mouseUp(event) {
    if (hasSomeParentTheClass(event.target, 'regio')) return;
    this.regio.selectingNode.remove()

    var area = {
      width: this.regio.selectingNode.style.width,
      height: this.regio.selectingNode.style.height,
      top: this.regio.selectingNode.style.top,
      right: this.regio.selectingNode.style.right,
      bottom: this.regio.selectingNode.style.bottom,
      left: this.regio.selectingNode.style.left
    }

    this.regio.areas.push(area)
    this.add([area])

    this.regio.isSelecting = false;
  }

  areas(option) {
    var nodes = document.getElementsByClassName('regio');
    if (option === 'attrs') {
      return this.regio.areas
    }
    return nodes
  }

  _clickArea(event) {
    if (!event.target.className.includes('regio')) return;
    if (event.target.click) return event.target.click();
  }

  on(event, callback) {
    this.element.addEventListener(event || 'click', event => {
      if (!event.target.className.includes('regio')) return;
      callback(event.target, event)
    });
  }

  append({html, callback, event}) {
    this.regio.toAppend = html;
    this.element.addEventListener(event || 'click', event => {
      if (!event.target.className.includes('rg-append')) return;
      callback(event.target);
    })
  }

  remove(callback) {
    this.element.addEventListener('click', event => {
      if (!event.target.className.includes('rg-removable')) return;
      if (callback) callback(event.target.parentNode, event)
      event.target.parentNode.remove();
    });
  }

  add(newAreas) {
    this.regio.areas = newAreas;
    this.regio.areas.map(area => {
      var key = this.areas().length;
      this.regio.selectingNode = document.createElement("div");
      this.regio.selectingNode.classList.add('regio')
      this.regio.selectingNode.style.width = area.width;
      this.regio.selectingNode.style.height = area.height;
      this.regio.selectingNode.style.top = area.top;
      this.regio.selectingNode.style.right = area.right;
      this.regio.selectingNode.style.bottom = area.bottom;
      this.regio.selectingNode.style.left = area.left;
      this.regio.selectingNode.click = area.click;
      this.regio.selectingNode.index = key;
      if (parseInt(area.width) > 15 || parseInt(area.height) > 15) {
        this.element.appendChild(this.regio.selectingNode)
        if (this.config.resizable) {
          var regioEdit = document.createElement('div');
          regioEdit.classList.add('rg-resizable');
          this.regio.selectingNode.appendChild(regioEdit);
        }
        if (this.config.removable) {
          var regioRemove = document.createElement('div');
          regioRemove.classList.add('rg-removable');
          this.regio.selectingNode.appendChild(regioRemove);
        }
        if (this.regio.toAppend.length) {
          var parser = new DOMParser()
          var domToAppend = parser.parseFromString(this.regio.toAppend, "text/html").firstChild.lastChild.firstChild
          domToAppend.classList.add('rg-append')
          this.regio.selectingNode.appendChild(domToAppend);
        }
      }
      return area;
    })
  }
}
