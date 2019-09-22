const $ = str => {
  const node = document.querySelectorAll(str);
  if (node.length === 1) return node[0];
  else if (node.length === 0) return document;
  else return node;
}

(function() {
  const addHandler = function(el, ev, func) {
    el.addEventListener(ev, func)
  }
  const removeItem = function(el) {
    el.parentNode.removeChild(el);
  }

  const findElem = function(el, str) {
    let a = $(str);
    if (a instanceof NodeList) {
      for(let i = 0; i < a.length; i++) {
        let node = a[i];
        while (node.parentNode) {
          node = node.parentNode;
          if (node === el) return a[i]
        }
      }
    } else {
      let node = a;
      while (node.parentNode) {
        node = node.parentNode;
        if (node === el) return a
      }
    }
  }

  Node.prototype.on = function(ev, func) {
    addHandler(this, ev, func)
  }

  NodeList.prototype.on = function(ev, func) {
    for (let i = 0; i < this.length; i++) {
      addHandler(this[i], ev, func)
    }
  }

  Node.prototype.remove = function() {
    removeItem(this)
  }

  NodeList.prototype.remove = function() {
    for (let i = 0; i < this.length; i++) {
      removeItem(this[i])
    }
  }

  Node.prototype.find = function(str) {
    return findElem(this, str)
  }
})()