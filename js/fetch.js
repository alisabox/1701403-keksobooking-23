const getData = (onSuccess, onError) => {
  fetch('https://23.javascript.pages.academy/keksobooking/data').then((response) => {
    if (response.ok) {
      return response.json();
    }
  }).then((json) => {
    onSuccess(json);
  }).catch(() => {
    onError('Ошибка загрузки данных с сервера.');
  });
};

const sendData = (onSuccess, onError, body) => {
  fetch('https://23.javascript.pages.academy/keksobooking',
    {
      method: 'POST',
      body,
    },
  ).then((response) => {
    if (response.ok) {
      onSuccess();
    } else {
      onError();
    }
  }).catch(() => {
    onError();
  });
};

export {getData, sendData};
