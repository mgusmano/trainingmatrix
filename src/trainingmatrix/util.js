export const getDates = () => {
  let d = new Date();
  let g = d.toLocaleDateString();
  d.setDate(d.getDate() - 180);
  var y = d.toLocaleDateString();
  d.setDate(d.getDate() - 300);
  var r = d.toLocaleDateString();
  return [g,y,r]
}