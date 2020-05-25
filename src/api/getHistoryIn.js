const URL =
  'https://misappmobile.000webhostapp.com/Lichsugiaodich/lichsuIn.php';

const getHistoryIn = idNguoiDung =>
  fetch(URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({idNguoiDung}),
  }).then(response => response.json());

module.exports = getHistoryIn;
