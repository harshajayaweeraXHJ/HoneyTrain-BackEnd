var Class = function(value1) {
  this.value = value1;
}
// properties and methods
Class.prototype = {
  value: "default_value",
  method: function() {
    return this.value+10;
  }
};
// node.js module export
module.exports = Class;