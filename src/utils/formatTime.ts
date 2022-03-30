export function formateSongTime(time:number){
  let m = Math.floor(time / 1000 / 60);
  let s = Math.floor(time % 60000 / 1000);
  return m.toString().padStart(2,'0')+':'+s.toString().padStart(2,'0') 
}