export function formateSongTime(time:number){
  let m = Math.floor(time / 1000 / 60);
  let s = Math.floor(time % 60000 / 1000);
  return m.toString().padStart(2,'0')+':'+s.toString().padStart(2,'0') 
}


export function formateSecendTime(time:number){
  let m = Math.floor(time / 60);
  let s = Math.floor(time % 60);
  return m.toString().padStart(2,'0')+':'+s.toString().padStart(2,'0') 
}


export function formateTime(time:number){


  const date  = new Date(time);

  const y = date.getFullYear();
  const m = date.getMonth() + 1+'';
  const d = date.getDate() +"";

  return `${y}-${m.padStart(2,'0')}-${d.padStart(2,'0')}`
}