function setWithExpiry(key, value) {
  const now = new Date();
  //console.log(now);
  const item = {
    value: value,
    expiry: now.getTime() + 3600000,
  };
  //console.log(item);
  localStorage.setItem(key, JSON.stringify(item));
}

function getWithExpiry(key) {
  const itemStr = localStorage.getItem(key);

  if (!itemStr) {
    return null;
  }
  const item = JSON.parse(itemStr);
  const now = new Date();
  if (now.getTime() > item.expiry) {
    localStorage.removeItem(key);
    return null;
  }
  return item.value;
}

export { setWithExpiry, getWithExpiry };
