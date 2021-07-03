const ALERT_SHOW_TIME = 5000;

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 100;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 0;
  alertContainer.style.top = 0;
  alertContainer.style.right = 0;
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '21px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';
  alertContainer.style.color = 'white';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

const closeMessage = (message) => {
  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      message.remove();
    }
  });
  message.addEventListener('click', message.remove);
};

const createSuccessMessage = () => {
  const messageTemplate = document.querySelector('#success').content.querySelector('.success');
  const message = messageTemplate.cloneNode(true);
  document.querySelector('body').append(message);
  closeMessage(message);
};

const createErrorMessage = () => {
  const messageTemplate = document.querySelector('#error').content.querySelector('.error');
  const message = messageTemplate.cloneNode(true);
  document.querySelector('body').append(message);
  closeMessage(message);
};

export {showAlert, createSuccessMessage, createErrorMessage};
