export const storeLocalData = (key: string, data: any) => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const getLocaldata = (key: string) => {
  const data = localStorage.getItem(key);
  if (data) {
    return JSON.parse(data);
  }
  return null;
};

export const removeLocalData = (key: string) => {
  localStorage.removeItem(key);
};

export const imgtobase64 = (file: File) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (err) => reject(err);
  });
};
