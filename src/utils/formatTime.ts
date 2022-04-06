export function formateSongTime(time: number) {
  let m = Math.floor(time / 1000 / 60);
  let s = Math.floor(time % 60000 / 1000);
  return m.toString().padStart(2, '0') + ':' + s.toString().padStart(2, '0')
}


export function formateSecendTime(time: number) {
  let m = Math.floor(time / 60);
  let s = Math.floor(time % 60);
  return m.toString().padStart(2, '0') + ':' + s.toString().padStart(2, '0')
}


export function formateTime(time: number) {
  const date = new Date(time);
  const y = date.getFullYear();
  const m = date.getMonth() + 1 + '';
  const d = date.getDate() + "";
  return `${y}-${m.padStart(2, '0')}-${d.padStart(2, '0')}`
}

export function forMateCommentTime(time: number | any) {
  let publishTime = time / 1000,
    d_seconds,
    d_minutes,
    d_hours,
    d_days,
    timeNow = parseInt(new Date().getTime() / 1000 + ''),
    d,
    date = new Date(publishTime * 1000),
    Y = date.getFullYear() + '',
    M = date.getMonth() + 1 + '',
    D = date.getDate() + '',
    H = date.getHours() + '',
    m = date.getMinutes() + '',
    s = date.getSeconds() + '';


  d = timeNow - publishTime;
  d_days = parseInt(d / 86400 + '');
  d_hours = parseInt(d / 3600 + '');
  d_minutes = parseInt(d / 60 + '');
  d_seconds = parseInt(d + '');

  if (d_days > 0 && d_days < 3) {
    return d_days + '天前';
  } else if (d_days <= 0 && d_hours > 0) {
    return d_hours + '小时前';
  } else if (d_hours <= 0 && d_minutes > 0) {
    return d_minutes + '分钟前';
  } else if (d_seconds < 60) {
    if (d_seconds <= 0) {
      return '刚刚';
    } else {
      return d_seconds + '秒前';
    }
  } else if (d_days >= 3 && d_days < 30) {
    return M + '-' + D + ' ' + H + ':' + m;
  } else if (d_days >= 30) {
    return Y + '-' + M + '-' + D + ' ' + H + ':' + m;
  }
  return ''
}