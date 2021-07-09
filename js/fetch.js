const Urls = {
  GET: 'https://23.javascript.pages.academy/keksobooking/data',
  POST: 'https://23.javascript.pages.academy/keksobooking',
};

const request = (onSuccess, onError, method, body) => {
  fetch(
    Urls[method],
    {
      method,
      body,
    },
  ).then((response) => {
    if (response.ok) {
      response.json()
        .then((data) => {
          onSuccess(data);
        });
    } else {
      onError('Ошибка загрузки данных с сервера.');
    }
  }).catch(() => {
    onError('Ошибка загрузки данных с сервера.');
  });
};

export {request};
