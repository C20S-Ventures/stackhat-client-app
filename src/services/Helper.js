/**
 * Helper utility functions for lists, strings, objects, data, and files
 */
class Helper {

  list = {
    inArray: inArray,
    exists: exists,
    getById: getById,
    getByIds: getByIds,
    getByIdDetail: getByIdDetail,
    toggle: toggle,
    getIds: getIds,
    filter: filter,
    orderObjectBy: orderObjectBy
  }

  string = {
    isNullOrEmpty: isNullOrEmpty,
    isNullOrWhitespace: isNullOrWhitespace,
    isNumber: stringIsNumber
  }

  obj = {
    getProperty: getProperty
  }

  data = {
    toBlob: toBlob
  }

  files = {
    getFilename: getFilename
  }
}



///////////////////////////////////
// lists
///////////////////////////////////

function toggle(elem, array, shadowElem, shadowArray) {
  var i = inArray(elem, array);
  if (i === -1) {
    array.push(elem);
    if (shadowElem && shadowArray)
      shadowArray.push(shadowElem);
  } else {
    array.splice(i, 1);
    if (shadowElem && shadowArray)
      shadowArray.splice(i, 1);
  }
}

function exists(elem, array) {
  return inArray(elem, array) > -1;
}

function inArray(elem, array) {
  if (array.indexOf) {
    return array.indexOf(elem);
  }
  for (var i = 0, length = array.length; i < length; i++) {
    if (array[i] === elem) {
      return i;
    }
  }
  return -1;
}

function getById(list, idName, id, index) {
  if (list.length > 0) {
    for (var i = 0; i < list.length; i++) {
      if (list[i][idName] == id) {
        index = i;
        return list[i];
      }
    }
  }
}

function getByIdDetail(list, idName, id) {
  if (list.length > 0) {
    for (var i = 0; i < list.length; i++) {
      if (list[i][idName] == id) {
        return {
          index: i,
          item: list[i]
        }
      }
    }
  }
}

function getByIds(list, idName, ids) {
  var result = [];
  if (list.length > 0) {
    for (var i = 0; i < list.length; i++) {
      if (ids.indexOf(list[i][idName]) > -1) {
        result.push(list[i]);
      }
    }
  }
  return result;
}

function getIds(list, idName) {
  var result = [];
  if (list.length > 0) {
    for (var i = 0; i < list.length; i++) {
      result.push(list[i][idName]);
    }
  }
  return result;
}

/**
 * Filter a list based on an expression
 * @param {Array} list - The list to filter
 * @param {Function|Object|string} expression - Filter expression
 * @returns {Array} Filtered list
 */
function filter(list, expression) {
  if (!list || !Array.isArray(list)) return [];
  if (typeof expression === 'function') {
    return list.filter(expression);
  }
  if (typeof expression === 'object') {
    return list.filter(item => {
      return Object.keys(expression).every(key => item[key] === expression[key]);
    });
  }
  if (typeof expression === 'string') {
    const searchStr = expression.toLowerCase();
    return list.filter(item => {
      return Object.values(item).some(val =>
        String(val).toLowerCase().includes(searchStr)
      );
    });
  }
  return list;
}

/**
 * Sort a list by a field
 * @param {Array} list - The list to sort
 * @param {string} field - Field to sort by
 * @param {boolean} reverse - Whether to reverse the sort order
 * @returns {Array} Sorted list
 */
function orderObjectBy(list, field, reverse) {
  if (!list || !Array.isArray(list)) return [];
  const sorted = [...list].sort((a, b) => {
    const aVal = a[field];
    const bVal = b[field];
    if (aVal < bVal) return -1;
    if (aVal > bVal) return 1;
    return 0;
  });
  return reverse ? sorted.reverse() : sorted;
}

///////////////////////////////////
// strings
///////////////////////////////////

function isNullOrEmpty(s) {
  if (typeof s === 'undefined' || s == null) return true;
  return ('' + s).length === 0;
}

function isNullOrWhitespace(s) {
  if (typeof s === 'undefined' || s == null) return true;
  return ('' + s).replace(/\s/g, '').length < 1;
}

function stringIsNumber(s) {
  var x = +s; // made cast obvious for demonstration
  return x.toString() === s;
}

///////////////////////////////////
// obj
///////////////////////////////////

/**
 * Get a nested property from an object
 * @param {Array} propPath - Array of property names forming the path
 * @param {Object} obj - The object to get the property from
 * @returns {*} The value at the property path, or null if not found
 */
function getProperty(propPath, obj) {
  if (!obj || !propPath || !Array.isArray(propPath)) return null;
  var result = Object.assign({}, obj);
  for (var i = 0; i < propPath.length; i++) {
    if (result[propPath[i]] === undefined)
      return null;
    else {
      result = result[propPath[i]];
    }
  }
  return result;
}

///////////////////////////////////
// data
///////////////////////////////////

function toBlob(data, isBase64) {
  var chars = "";
  if (isBase64) chars = atob(data); else chars = data;
  var bytes = new Array(chars.length);
  for (var i = 0; i < chars.length; i++) bytes[i] = chars.charCodeAt(i);
  var blob = new Blob([new Uint8Array(bytes)]);
  return blob;
}

///////////////////////////////////
// files
///////////////////////////////////

function getFilename(title, extension) {
  return `${title.replace(/[^a-z0-9]/gi, '_').toLowerCase().substring(0, 50)}.${extension}`
}

export default new Helper()
