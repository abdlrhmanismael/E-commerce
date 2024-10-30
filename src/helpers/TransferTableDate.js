export default function TransferTableDate(date) {
  const theDate = new Date(date);
  const day = theDate.getDate().toString().padStart(2, "0");
  const month = (theDate.getMonth() + 1).toString().padStart(2, "0");
  const year = theDate.getFullYear().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
}
