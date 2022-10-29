const form = document.getElementById('generate-form');
const qr = document.getElementById('qrCode');

/**
 * Purpose: Generates the QR-Code when user clicked on <Generate QR Code> button
 * @param {*} e 
 */
const onGenerateSubmit = (e) => {
  e.preventDefault();

  //clearing the UI first
  clearUI();

  //getting the input values
  const url = document.getElementById('url').value;
  const size = document.getElementById('size').value;

  // Validate url
  if (url === '') {
    alert('Please enter a URL');
  } else {
    showSpinner();
    // Show spinner for 1 sec
    setTimeout(() => {
      hideSpinner();
      generateQRCode(url, size);

      // Generate the save button after the qr code image src is ready
      //NOTE : Here we are loading the save button after some delay, because we will not able to get url from image until our QR not gets loaded to DOM.
      setTimeout(() => {
        // Get save url
        const saveUrl = qr.querySelector('img').src;
        // Create save button
        createSaveBtn(saveUrl);
      }, 50);
    }, 1000);
  }
};

/**
 * Purpose: Generate the QR Code for corresponding Url and size
 * @param {*} url 
 * @param {*} size 
 */
const generateQRCode = (url, size) => {
  const qrCode = new QRCode('qrCode', {
    text: url,
    width: size,
    height: size,
  });
};

/**
 * Purpose: Remove the QR Code and download button from DOM
 */
const clearUI = () => {
  qr.innerHTML = '';
  const saveBtn = document.getElementById('save-link');
  if (saveBtn) {
    saveBtn.remove();
  }
};

/**
 * Purpose: Show the loading screen
 */
const showSpinner = () => {
  const spinner = document.getElementById('spinner');
  spinner.style.display = 'block';
};

/**
 * Purpose: Hide the loading screen
 */
const hideSpinner = () => {
  const spinner = document.getElementById('spinner');
  spinner.style.display = 'none';
};

/**
 * Purpose: Creates a save button through which user can download the QR-Code
 * @param {*} saveUrl 
 */
const createSaveBtn = (saveUrl) => {
  const link = document.createElement('a');
  link.id = 'save-link';
  link.classList =
    'bg-blue-900 text-white font-bold py-2 rounded w-1/3 m-auto my-5';
  link.href = saveUrl;
  link.download = 'qrCode';
  link.innerHTML = 'Save Image';
  document.getElementById('generated').appendChild(link);
};

hideSpinner();
//EventListener for QR-Code Generation
form.addEventListener('submit', onGenerateSubmit);
