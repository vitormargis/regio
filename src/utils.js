export const hasSomeParentTheClass = (element, classname) => {
  if (!element.className) return false;
  if (element.className.split(' ').indexOf(classname) >= 0) return true;
  return element.parentNode && hasSomeParentTheClass(element.parentNode, classname);
}
