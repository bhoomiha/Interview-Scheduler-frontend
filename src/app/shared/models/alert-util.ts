export function customAlert(message: string): void {
  const alertContainer = document.createElement('div');
  alertContainer.style.position = 'fixed';
  alertContainer.style.top = '10%';
  alertContainer.style.left = '50%';
  alertContainer.style.transform = 'translate(-50%, -50%)';
  alertContainer.style.color = '#1A1A1A';
  alertContainer.style.backgroundColor = '#FFFFFF'; // light gray with some opacity
  alertContainer.style.padding = '16px 24px';
  alertContainer.style.border = '1px solid #D1D5DB';
  alertContainer.style.borderRadius = '8px';
  alertContainer.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
  alertContainer.style.zIndex = '1000';
  alertContainer.style.textAlign = 'center';

  const alertText = document.createElement('p');
  alertText.textContent = message;
  alertText.style.marginBottom = '8px';

  const okButton = document.createElement('button');
  okButton.textContent = 'OK';
  okButton.style.backgroundColor = '#9b6fa5';
  okButton.style.color = '#fff';
  okButton.style.padding = '6px 12px';
  okButton.style.border = 'none';
  okButton.style.borderRadius = '4px';
  okButton.style.cursor = 'pointer';

  okButton.onclick = () => document.body.removeChild(alertContainer);

  alertContainer.appendChild(alertText);
  alertContainer.appendChild(okButton);
  document.body.appendChild(alertContainer);
}
