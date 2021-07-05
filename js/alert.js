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

const succeccMessageTemplate = document.querySelector('#success').content.querySelector('.success');
const successMessage = succeccMessageTemplate.cloneNode(true);
const errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');
const errorMessage = errorMessageTemplate.cloneNode(true);

const closeMessageHandler = (evt) => {
  if (evt.key === 'Escape' || evt.key === 'Esc') {
    if (successMessage) {
      successMessage.remove();
    }
    if (errorMessage) {
      errorMessage.remove();
    }
  }
};

const removeMessageListener = (evt) => {
  document.removeEventListener('keydown', closeMessageHandler(evt));
};

const closeMessage = (message) => {
  document.addEventListener('keydown', (evt) => {
    closeMessageHandler(evt);
    removeMessageListener(evt);
  });
  message.addEventListener('click', message.remove);
};

const createSuccessMessage = () => {
  document.querySelector('body').append(successMessage);
  closeMessage(successMessage);
};

const createErrorMessage = () => {
  document.querySelector('body').append(errorMessage);
  closeMessage(errorMessage);
};

export {showAlert, createSuccessMessage, createErrorMessage};
