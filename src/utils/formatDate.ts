export const formatDateToYYYYMMDD = (seconds: number) => {
  const d = new Date(seconds);

  let date: number | string = d.getDate();
  let month: number | string = d.getMonth() + 1;
  let year: number | string = d.getFullYear();

  if (date < 10) {
    date = "0" + date;
  }
  if (month < 10) {
    month = "0" + month;
  }

  return `${year}.${month}.${date}`;
};

export const convertTimestamp = (timestamp: any) => {
  return timestamp?.toDate().toISOString().split("T")[0];
};
