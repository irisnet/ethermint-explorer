let filter = {
  _int: function (val) {
    return isNaN(parseInt(val)) ? 0 : parseInt(val)
  }
}
export default filter

