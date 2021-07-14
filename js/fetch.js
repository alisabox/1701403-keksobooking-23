const ERROR_MESSAGE = 'Ошибка загрузки данных с сервера.';
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
      onError(ERROR_MESSAGE);
    }
  }).catch(() => {
    onError(ERROR_MESSAGE);
  });
};

export {request};
