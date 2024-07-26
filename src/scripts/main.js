'use strict';

document.addEventListener('DOMContentLoaded', () => {
  const firstPromise = new Promise((resolve, reject) => {
    let isResolved = false;

    document.addEventListener('click', () => {
      if (!isResolved) {
        isResolved = true;
        resolve('First promise was resolved');
      }
    });

    setTimeout(() => {
      if (!isResolved) {
        reject(new Error('First promise was rejected'));
      }
    }, 3000);
  });

  const secondPromise = new Promise((resolve) => {
    document.addEventListener('click', () => {
      resolve('Second promise was resolved');
    });

    document.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      resolve('Second promise was resolved');
    });
  });

  const thirdPromise = new Promise((resolve) => {
    let leftClicked = false;
    let rightClicked = false;

    document.addEventListener('click', () => {
      leftClicked = true;

      if (leftClicked && rightClicked) {
        resolve('Third promise was resolved');
      }
    });

    document.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      rightClicked = true;

      if (leftClicked && rightClicked) {
        resolve('Third promise was resolved');
      }
    });
  });

  const handleSuccess = (message) => {
    const notification = document.createElement('div');

    notification.className = 'message success';
    notification.setAttribute('data-qa', 'notification');
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
      notification.remove();
    }, 2000);
  };

  const handleError = (error) => {
    const notification = document.createElement('div');

    notification.className = 'message error';
    notification.setAttribute('data-qa', 'notification');
    notification.textContent = error.message;
    document.body.appendChild(notification);

    setTimeout(() => {
      notification.remove();
    }, 2000);
  };

  firstPromise.then(handleSuccess).catch(handleError);
  secondPromise.then(handleSuccess).catch(handleError);
  thirdPromise.then(handleSuccess).catch(handleError);
});
