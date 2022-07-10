const utils = {
  convertDate: (dateInput) => dateInput.split("-").reverse().join("-"),
  onlyUnique: (value, index, self) => self.indexOf(value) === index,
  convertStringToDate: (str) => {
    let date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
  },
};
export default utils;
