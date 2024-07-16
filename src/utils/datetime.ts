// 获取当前10位时间戳
export const getTimestamp = () => {
  return Math.floor(Date.now() / 1000);
};

// 10位时间戳转日期
export const timestampToDate = (timestamp: number) => {
  const date = new Date(timestamp * 1000);
  const Y = date.getFullYear();
  const M = date.getMonth() + 1;
  const D = date.getDate();
  const h = date.getHours();
  const m = date.getMinutes();
  return `${Y}-${M}-${D} ${h}:${m}`;
};
