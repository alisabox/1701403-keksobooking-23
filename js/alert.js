const ALERT_SHOW_TIME = 5000;

const Key = {
  ESC: 'Esc',
  ESCAPE: 'Escape',
};

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

const successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
const successMessage = successMessageTemplate.cloneNode(true);
const errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');
const errorMessage = errorMessageTemplate.cloneNode(true);

const closeMessageHandler = (evt) => {
  if (evt.key === Key.ESCAPE || evt.key === Key.ESC) {
    document.querySelector('.popup-message').remove();
  }
};

const closeMessage = (message) => {
  document.addEventListener('keydown', closeMessageHandler, {once: true});
  message.addEventListener('click', () => {
    message.remove();
    document.removeEventListener('keydown', closeMessageHandler);
  });
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
