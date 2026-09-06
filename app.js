/**
 * ============================================================================
 * NGO RECEIPT & 80G TAX BENEFIT CERTIFICATE GENERATOR
 * Vanilla JavaScript: Multi-Template, Live Sync, Number-to-Words, Zoom, Print & PNG
 * ============================================================================
 */

// --- Number to Words Converter (Indian Currency Format) ---
const ones = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine',
  'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];

const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

function convertTwoDigits(num) {
  if (num < 20) return ones[num];
  const ten = Math.floor(num / 10);
  const unit = num % 10;
  return tens[ten] + (unit ? ' ' + ones[unit] : '');
}

function convertThreeDigits(num) {
  let str = '';
  const hundred = Math.floor(num / 100);
  const rest = num % 100;
  if (hundred > 0) {
    str += ones[hundred] + ' Hundred';
    if (rest > 0) str += ' and ';
  }
  if (rest > 0) {
    str += convertTwoDigits(rest);
  }
  return str.trim();
}

function numberToIndianWords(amount) {
  if (isNaN(amount) || amount === null || amount === '') return '';
  const num = parseFloat(amount);
  if (num === 0) return 'Zero Rupees Only';
  if (num < 0) return 'Negative Amount';

  const parts = num.toString().split('.');
  let rupees = parseInt(parts[0], 10);
  let paise = parts.length > 1 ? parseInt(parts[1].slice(0, 2).padEnd(2, '0'), 10) : 0;

  let words = '';

  const crore = Math.floor(rupees / 10000000);
  rupees %= 10000000;

  const lakh = Math.floor(rupees / 100000);
  rupees %= 100000;

  const thousand = Math.floor(rupees / 1000);
  rupees %= 1000;

  const hundred = rupees;

  if (crore > 0) {
    words += convertTwoDigits(crore) + ' Crore ';
  }
  if (lakh > 0) {
    words += convertTwoDigits(lakh) + ' Lakh ';
  }
  if (thousand > 0) {
    words += convertTwoDigits(thousand) + ' Thousand ';
  }
  if (hundred > 0) {
    words += convertThreeDigits(hundred) + ' ';
  }

  words = words.trim();
  if (!words) words = 'Zero';

  let result = words + ' Rupees';

  if (paise > 0) {
    result += ' and ' + convertTwoDigits(paise) + ' Paise';
  }

  result += ' Only';
  return result;
}

// --- Date Formatter helper (DD-MM-YYYY) ---
function formatDateDDMMYYYY(dateString, separator = '-') {
  if (!dateString) return '';
  const [year, month, day] = dateString.split('-');
  if (!year || !month || !day) return dateString;
  return `${day}${separator}${month}${separator}${year}`;
}

// --- Main Application Controller ---
document.addEventListener('DOMContentLoaded', () => {
  // Template Setup
  let activeTemplate = 'portrait'; // 80G Certificate
  const certificate80GCard = document.getElementById('certificate80GCard');
  const receiptCard = document.getElementById('receiptCard');
  const paperSizeBadge = document.querySelector('.paper-size-badge');

  function switchTemplate(templateName) {
    activeTemplate = templateName;
    if (templateName === 'portrait') {
      if (certificate80GCard) certificate80GCard.style.display = 'block';
      if (receiptCard) receiptCard.style.display = 'none';
      if (paperSizeBadge) paperSizeBadge.textContent = 'A4 Portrait';
    } else {
      if (certificate80GCard) certificate80GCard.style.display = 'none';
      if (receiptCard) receiptCard.style.display = 'block';
      if (paperSizeBadge) paperSizeBadge.textContent = 'A4 Landscape';
    }
  }

  // Form Inputs
  const receiptTypeInput = document.getElementById('receiptType');
  const receiptNoInput = document.getElementById('receiptNo');
  const receiptDateInput = document.getElementById('receiptDate');
  const formNoInput = document.getElementById('formNo');
  const donationForInput = document.getElementById('donationFor');
  const donationForCustomInput = document.getElementById('donationForCustom');
  const donorNameInput = document.getElementById('donorName');
  const donorPanInput = document.getElementById('donorPan');
  const paymentModeInput = document.getElementById('paymentMode');
  const transactionIdInput = document.getElementById('transactionId');
  const bankNameInput = document.getElementById('bankName');
  const amountInput = document.getElementById('amount');
  const amountInWordsInput = document.getElementById('amountInWords');

  // Org Details
  const orgNameInput = document.getElementById('orgName');
  const orgAddressInput = document.getElementById('orgAddress');
  const orgHeadAddressInput = document.getElementById('orgHeadAddress');
  const orgPhoneInput = document.getElementById('orgPhone');
  const orgEmailInput = document.getElementById('orgEmail');
  const orgWebsiteInput = document.getElementById('orgWebsite');
  const orgInstaInput = document.getElementById('orgInsta');
  const orgSubInput = document.getElementById('orgSub');
  const orgMottoInput = document.getElementById('orgMotto');
  const orgCinInput = document.getElementById('orgCin');
  const orgPanInput = document.getElementById('orgPan');
  const orgTanInput = document.getElementById('orgTan');
  const orgDarpanInput = document.getElementById('orgDarpan');
  const orgPledgeInput = document.getElementById('orgPledge');

  // Bank Transfer Details Inputs
  const bankAccNameInput = document.getElementById('bankAccName');
  const bankAccNoInput = document.getElementById('bankAccNo');
  const bankIfscInput = document.getElementById('bankIfsc');
  const bankOrgNameInput = document.getElementById('bankOrgName');
  const bankBranchInput = document.getElementById('bankBranch');
  const showBankDetailsCheck = document.getElementById('showBankDetails');

  // Toggles
  const showStampCheck = document.getElementById('showStamp');
  const showSignatureCheck = document.getElementById('showSignature');
  const showQrCodeCheck = document.getElementById('showQrCode');
  const useOfficialLogoCheck = document.getElementById('useOfficialLogo');

  // Portrait Certificate Preview Elements
  const certTrustName = document.getElementById('certTrustName');
  const certRegSub = document.getElementById('certRegSub');
  const certMotto = document.getElementById('certMotto');
  const certWebsite = document.getElementById('certWebsite');
  const certEmail = document.getElementById('certEmail');
  const certPhone = document.getElementById('certPhone');
  const certInsta = document.getElementById('certInsta');
  const certDocHeading = document.getElementById('certDocHeading');
  const certDate = document.getElementById('certDate');
  const certReceiptNo = document.getElementById('certReceiptNo');
  const certFormNo = document.getElementById('certFormNo');
  const certDonationFor = document.getElementById('certDonationFor');
  const certDonorName = document.getElementById('certDonorName');
  const certDonorPan = document.getElementById('certDonorPan');
  const certPaymentMode = document.getElementById('certPaymentMode');
  const certTransactionId = document.getElementById('certTransactionId');
  const certBankName = document.getElementById('certBankName');
  const certAmount = document.getElementById('certAmount');
  const certAmountInWords = document.getElementById('certAmountInWords');
  const certPan = document.getElementById('certPan');
  const certTan = document.getElementById('certTan');
  const certCin = document.getElementById('certCin');
  const certDarpan = document.getElementById('certDarpan');
  const certBankCard = document.getElementById('certBankCard');
  const certAccName = document.getElementById('certAccName');
  const certAccNo = document.getElementById('certAccNo');
  const certAccIfsc = document.getElementById('certAccIfsc');
  const certAccBank = document.getElementById('certAccBank');
  const certAccBranch = document.getElementById('certAccBranch');
  const certForTrust = document.getElementById('certForTrust');
  const certStampImg = document.getElementById('certStampImg');
  const certSignImg = document.getElementById('certSignImg');
  const certSignatoryTitle = document.getElementById('certSignatoryTitle');
  const certQrSide = document.getElementById('certQrSide');
  const certFooterPledge = document.getElementById('certFooterPledge');
  const certFooterAct = document.getElementById('certFooterAct');
  const certRegAddress = document.getElementById('certRegAddress');
  const certHeadAddress = document.getElementById('certHeadAddress');
  const certFooterContact = document.getElementById('certFooterContact');

  // Landscape Classic Receipt Preview Elements
  const viewDocHeading = document.getElementById('viewDocHeading');
  const viewReceiptNo = document.getElementById('viewReceiptNo');
  const viewReceiptDate = document.getElementById('viewReceiptDate');
  const viewDonorName = document.getElementById('viewDonorName');
  const viewAmount = document.getElementById('viewAmount');
  const viewAmountInWords = document.getElementById('viewAmountInWords');
  const viewPaymentMode = document.getElementById('viewPaymentMode');
  const viewTransactionId = document.getElementById('viewTransactionId');
  const viewPurpose = document.getElementById('viewPurpose');
  const viewOrgName = document.getElementById('viewOrgName');
  const viewOrgAddress = document.getElementById('viewOrgAddress');
  const viewOrgHeadAddress = document.getElementById('viewOrgHeadAddress');
  const viewOrgPhone = document.getElementById('viewOrgPhone');
  const viewOrgEmail = document.getElementById('viewOrgEmail');
  const viewOrgWebsite = document.getElementById('viewOrgWebsite');
  const viewOrgInsta = document.getElementById('viewOrgInsta');
  const viewOrgCin = document.getElementById('viewOrgCin');
  const viewOrgPan = document.getElementById('viewOrgPan');
  const viewOrgTan = document.getElementById('viewOrgTan');
  const viewOrgDarpan = document.getElementById('viewOrgDarpan');
  const viewOfficialLogo = document.getElementById('viewOfficialLogo');
  const viewSvgLogo = document.getElementById('viewSvgLogo');
  const viewQrScanCard = document.getElementById('viewQrScanCard');
  const viewQrTitle = document.getElementById('viewQrTitle');
  const viewStampWrapper = document.getElementById('viewStampWrapper');
  const viewSignatureWrapper = document.getElementById('viewSignatureWrapper');
  const viewSignatoryTitle = document.getElementById('viewSignatoryTitle');

  // Zoom & Action Buttons
  const zoomLevelDisplay = document.getElementById('zoomLevel');
  const btnZoomIn = document.getElementById('btnZoomIn');
  const btnZoomOut = document.getElementById('btnZoomOut');
  const btnZoomReset = document.getElementById('btnZoomReset');
  const paperViewport = document.getElementById('paperViewport');

  const btnPrintReceipt = document.getElementById('btnPrintReceipt');
  const btnDownloadImage = document.getElementById('btnDownloadImage');
  const btnLoadSample = document.getElementById('btnLoadSample');
  const btnNewReceipt = document.getElementById('btnNewReceipt');
  const btnNextNumber = document.getElementById('btnNextNumber');
  const btnSaveToHistory = document.getElementById('btnSaveToHistory');
  const btnToggleHistory = document.getElementById('btnToggleHistory');
  const btnCloseHistory = document.getElementById('btnCloseHistory');
  const btnClearAllHistory = document.getElementById('btnClearAllHistory');
  const historyDrawer = document.getElementById('historyDrawer');
  const historyBackdrop = document.getElementById('historyBackdrop');
  const historyList = document.getElementById('historyList');
  const historyCount = document.getElementById('historyCount');
  const toast = document.getElementById('toast');

  let currentZoom = 1;

  // Set default today's date in datepicker
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const dd = String(today.getDate()).padStart(2, '0');
  receiptDateInput.value = `${yyyy}-${mm}-${dd}`;

  // --- Real-Time Update Function ---
  function updatePreview() {
    const formattedDateDash = formatDateDDMMYYYY(receiptDateInput.value, '-');
    const formattedDateSlash = formatDateDDMMYYYY(receiptDateInput.value, '/');
    const amtVal = amountInput.value ? amountInput.value.trim() : '';
    const hasAmt = amtVal !== '' && !isNaN(amtVal);
    const amt = hasAmt ? parseFloat(amtVal) : null;
    const words = amountInWordsInput.value.trim() || (hasAmt ? numberToIndianWords(amt).toUpperCase() : '');

    // 1. Update Certificate (Matching Reference Layout)
    if (certTrustName) certTrustName.textContent = orgNameInput.value || 'SAVING SARVAHITA FOUNDATION';
    if (certRegSub) certRegSub.textContent = orgSubInput ? orgSubInput.value : 'Registered Under MCA / Section 8 No. U88900MH2026NPL472880';
    if (certMotto) certMotto.textContent = orgMottoInput ? orgMottoInput.value : 'Together For A Better Tomorrow';
    if (certWebsite) certWebsite.textContent = orgWebsiteInput.value || 'savingsarvahita.org';
    if (certEmail) certEmail.textContent = orgEmailInput.value || 'savingsarvahitafoundation@gmail.com';
    if (certPhone) certPhone.textContent = orgPhoneInput.value || '+91 8828428845';
    if (certInsta) certInsta.textContent = orgInstaInput.value || '@savingsarvahitafoundation';
    if (certDocHeading) certDocHeading.textContent = receiptTypeInput.value || 'DONATION RECEIPT';

    if (certDate) certDate.textContent = formattedDateDash || '';
    if (certReceiptNo) certReceiptNo.textContent = receiptNoInput.value || '';
    if (certFormNo) certFormNo.textContent = formNoInput ? formNoInput.value : '';
    const activeDonationFor = (donationForInput && donationForInput.value === 'CUSTOM')
      ? ((donationForCustomInput && donationForCustomInput.value.trim()) || '')
      : (donationForInput ? donationForInput.value : '');

    if (certDonationFor) certDonationFor.textContent = activeDonationFor;

    if (certDonorName) certDonorName.textContent = (donorNameInput.value || '').toUpperCase();
    if (certDonorPan) certDonorPan.textContent = donorPanInput ? donorPanInput.value.toUpperCase() : '';
    if (certPaymentMode) certPaymentMode.textContent = (paymentModeInput.value || '').toUpperCase();
    if (certTransactionId) certTransactionId.textContent = transactionIdInput.value || '';
    if (certBankName) certBankName.textContent = bankNameInput ? bankNameInput.value : '';
    if (certAmount) certAmount.textContent = hasAmt ? `${amt.toFixed(2)} INR` : '';
    if (certAmountInWords) certAmountInWords.textContent = words.toUpperCase();

    if (certPan) certPan.textContent = orgPanInput.value || 'ABUCS1753L';
    if (certTan) certTan.textContent = orgTanInput ? orgTanInput.value : 'MUMS48324K';
    if (certCin) certCin.textContent = orgCinInput ? orgCinInput.value : 'U88900MH2026NPL472880';
    if (certDarpan) certDarpan.textContent = orgDarpanInput.value || 'MH/2026/1136477';

    // Bank Details
    if (certBankCard) certBankCard.style.display = (showBankDetailsCheck && showBankDetailsCheck.checked) ? 'block' : 'none';
    if (certAccName) certAccName.textContent = bankAccNameInput ? bankAccNameInput.value : 'SAVING SARVAHITA FOUNDATION';
    if (certAccNo) certAccNo.textContent = bankAccNoInput ? bankAccNoInput.value : '6057762991';
    if (certAccIfsc) certAccIfsc.textContent = bankIfscInput ? bankIfscInput.value : 'KKBK0000653';
    if (certAccBank) certAccBank.textContent = bankOrgNameInput ? bankOrgNameInput.value : 'Kotak Mahindra Bank';
    if (certAccBranch) certAccBranch.textContent = bankBranchInput ? bankBranchInput.value : 'MUMBAI - BORIVALI (WEST)';

    if (certForTrust) certForTrust.textContent = orgNameInput.value || 'Saving Sarvahita Foundation';
    if (certStampImg) certStampImg.style.display = showStampCheck.checked ? 'block' : 'none';
    if (certSignImg) certSignImg.style.display = showSignatureCheck.checked ? 'block' : 'none';
    if (certSignatoryTitle) certSignatoryTitle.textContent = 'Authorized Signatory';
    if (certQrSide) certQrSide.style.display = showQrCodeCheck.checked ? 'flex' : 'none';

    if (certFooterPledge) certFooterPledge.textContent = orgPledgeInput ? orgPledgeInput.value : 'EVEN THE SMALLEST OF CONTRIBUTIONS ARE USED TO BUILD A BETTER FUTURE FOR TOMORROW';
    if (certFooterAct) certFooterAct.textContent = orgCinInput.value ? `Registered under MCA / Section 8 Act No. ${orgCinInput.value}` : 'Registered under MCA / Section 8 Act';
    if (certRegAddress) certRegAddress.textContent = orgAddressInput.value || 'Flat 609, B Wing, Vklal, Vishnu, Ph 1 Kokani Pada, Dahisar, Mumbai, Dahisar East, Maharashtra, India, 400068';
    if (certHeadAddress) certHeadAddress.textContent = (orgHeadAddressInput && orgHeadAddressInput.value) ? orgHeadAddressInput.value : 'Office No 1, Double Basement Sai Krupa Mall, LT Road Tawde Wadi, Opp Dahisar Railway Station, Dahisar West, Mumbai, Maharashtra, India, 400068';
    if (certFooterContact) certFooterContact.textContent = `Contact / WhatsApp : ${orgPhoneInput.value || '+91 8828428845'} | Instagram : ${orgInstaInput.value || '@savingsarvahitafoundation'}`;

    // 2. Update Landscape Classic Receipt
    if (viewDocHeading) viewDocHeading.textContent = receiptTypeInput.value || 'DONATION RECEIPT';
    if (viewReceiptNo) viewReceiptNo.textContent = receiptNoInput.value || '';
    if (viewReceiptDate) viewReceiptDate.textContent = formattedDateSlash || '';
    if (viewDonorName) viewDonorName.textContent = donorNameInput.value || '';
    if (viewAmount) viewAmount.textContent = hasAmt ? `₹${amt.toLocaleString('en-IN')}/-` : '';
    if (viewAmountInWords) viewAmountInWords.textContent = words;
    if (viewPaymentMode) viewPaymentMode.textContent = paymentModeInput.value || '';
    if (viewTransactionId) viewTransactionId.textContent = transactionIdInput.value || '';
    if (viewPurpose) viewPurpose.textContent = activeDonationFor;

    if (viewOrgName) viewOrgName.textContent = orgNameInput.value;
    if (viewOrgAddress) viewOrgAddress.textContent = orgAddressInput.value || 'Flat 609, B Wing, Vklal, Vishnu, Ph 1 Kokani Pada, Dahisar, Mumbai, Dahisar East, Maharashtra, India, 400068';
    if (viewOrgHeadAddress) viewOrgHeadAddress.textContent = (orgHeadAddressInput && orgHeadAddressInput.value) ? orgHeadAddressInput.value : 'Office No 1, Double Basement Sai Krupa Mall, LT Road Tawde Wadi, Opp Dahisar Railway Station, Dahisar West, Mumbai, Maharashtra, India, 400068';
    if (viewOrgPhone) viewOrgPhone.textContent = orgPhoneInput.value;
    if (viewOrgEmail) viewOrgEmail.textContent = orgEmailInput.value;
    if (viewOrgWebsite) viewOrgWebsite.textContent = orgWebsiteInput.value;
    if (viewOrgInsta) viewOrgInsta.textContent = orgInstaInput.value;
    if (viewOrgCin) viewOrgCin.textContent = orgCinInput.value;
    if (viewOrgPan) viewOrgPan.textContent = orgPanInput.value;
    if (viewOrgTan) viewOrgTan.textContent = orgTanInput.value;
    if (viewOrgDarpan) viewOrgDarpan.textContent = orgDarpanInput.value;

    if (viewOfficialLogo && viewSvgLogo && useOfficialLogoCheck) {
      if (useOfficialLogoCheck.checked) {
        viewOfficialLogo.style.display = 'block';
        viewSvgLogo.style.display = 'none';
      } else {
        viewOfficialLogo.style.display = 'none';
        viewSvgLogo.style.display = 'block';
      }
    }

    if (viewQrScanCard && showQrCodeCheck) {
      viewQrScanCard.style.display = showQrCodeCheck.checked ? 'flex' : 'none';
    }
    if (viewQrTitle) {
      viewQrTitle.textContent = 'Scan to Support Us';
    }

    if (viewStampWrapper) viewStampWrapper.style.display = showStampCheck.checked ? 'block' : 'none';
    if (viewSignatureWrapper) viewSignatureWrapper.style.display = showSignatureCheck.checked ? 'flex' : 'none';
    if (viewSignatoryTitle) viewSignatoryTitle.textContent = 'Authorised Signatory';
  }

  // --- Event Listeners for Live Form Updates ---
  const inputsToListen = [
    receiptTypeInput, receiptNoInput, receiptDateInput, formNoInput,
    donationForInput, donationForCustomInput, donorNameInput, donorPanInput, paymentModeInput,
    transactionIdInput, bankNameInput, amountInWordsInput,
    orgNameInput, orgAddressInput, orgHeadAddressInput, orgPhoneInput, orgEmailInput,
    orgWebsiteInput, orgInstaInput, orgSubInput, orgMottoInput,
    orgCinInput, orgPanInput, orgTanInput, orgDarpanInput, orgPledgeInput,
    bankAccNameInput, bankAccNoInput, bankIfscInput, bankOrgNameInput, bankBranchInput,
    showStampCheck, showSignatureCheck, showQrCodeCheck, useOfficialLogoCheck,
    showBankDetailsCheck
  ];

  inputsToListen.forEach(el => {
    if (el) {
      el.addEventListener('input', updatePreview);
      el.addEventListener('change', updatePreview);
    }
  });

  // Toggle Custom Donation Purpose input
  if (donationForInput) {
    donationForInput.addEventListener('change', () => {
      if (donationForInput.value === 'CUSTOM') {
        if (donationForCustomInput) {
          donationForCustomInput.style.display = 'block';
          donationForCustomInput.focus();
        }
      } else {
        if (donationForCustomInput) {
          donationForCustomInput.style.display = 'none';
        }
      }
      updatePreview();
    });
  }

  // Amount special handler (auto converts to words)
  amountInput.addEventListener('input', () => {
    const val = amountInput.value.trim();
    if (val !== '' && !isNaN(val) && parseFloat(val) > 0) {
      amountInWordsInput.value = numberToIndianWords(parseFloat(val)).toUpperCase();
    } else {
      amountInWordsInput.value = '';
    }
    updatePreview();
  });

  // --- Auto-Increment Receipt Number ---
  function incrementReceiptNo(currentVal) {
    if (!currentVal || !currentVal.trim()) return '1';
    return currentVal.replace(/(\d+)$/, (match) => {
      const nextNum = parseInt(match, 10) + 1;
      return String(nextNum).padStart(match.length, '0');
    });
  }

  btnNextNumber.addEventListener('click', () => {
    receiptNoInput.value = incrementReceiptNo(receiptNoInput.value);
    updatePreview();
    showToast(`Receipt number incremented to ${receiptNoInput.value}`);
  });

  // --- Load Sample Data ---
  if (btnLoadSample) {
    btnLoadSample.addEventListener('click', () => {
      receiptTypeInput.value = 'DONATION RECEIPT';
      receiptNoInput.value = '6073';
      receiptDateInput.value = '2026-05-31';
      if (formNoInput) formNoInput.value = '';
      donationForInput.value = 'EDUCATION / HEALTH PROGRAM / ANIMAL WELFARE AND HUNGER SUPPORT';
      if (donationForCustomInput) {
        donationForCustomInput.style.display = 'none';
        donationForCustomInput.value = '';
      }
      donorNameInput.value = 'WELL WISHER / DONOR';
      if (donorPanInput) donorPanInput.value = '';
      paymentModeInput.value = 'ONLINE TRANSFER';
      transactionIdInput.value = 'TXN123456789';
      if (bankNameInput) bankNameInput.value = '';
      amountInput.value = '1000';
      amountInWordsInput.value = 'ONE THOUSAND RUPEES ONLY';

      orgNameInput.value = 'SAVING SARVAHITA FOUNDATION';
      if (orgSubInput) orgSubInput.value = 'Registered Under MCA / Section 8 No. U88900MH2026NPL472880';
      orgAddressInput.value = 'Flat 609, B Wing, Vklal, Vishnu, Ph 1 Kokani Pada, Dahisar, Mumbai, Dahisar East, Maharashtra, India, 400068';
      if (orgHeadAddressInput) orgHeadAddressInput.value = 'Office No 1, Double Basement Sai Krupa Mall, LT Road Tawde Wadi, Opp Dahisar Railway Station, Dahisar West, Mumbai, Maharashtra, India, 400068';
      orgPhoneInput.value = '+91 8828428845';
      orgEmailInput.value = 'savingsarvahitafoundation@gmail.com';
      orgWebsiteInput.value = 'savingsarvahita.org';
      orgInstaInput.value = '@savingsarvahitafoundation';
      orgCinInput.value = 'U88900MH2026NPL472880';
      orgPanInput.value = 'ABUCS1753L';
      orgTanInput.value = 'MUMS48324K';
      orgDarpanInput.value = 'MH/2026/1136477';
      if (orgPledgeInput) orgPledgeInput.value = 'EVEN THE SMALLEST OF CONTRIBUTIONS ARE USED TO BUILD A BETTER FUTURE FOR TOMORROW';

      if (bankAccNameInput) bankAccNameInput.value = 'SAVING SARVAHITA FOUNDATION';
      if (bankAccNoInput) bankAccNoInput.value = '6057762991';
      if (bankIfscInput) bankIfscInput.value = 'KKBK0000653';
      if (bankOrgNameInput) bankOrgNameInput.value = 'Kotak Mahindra Bank';
      if (bankBranchInput) bankBranchInput.value = 'MUMBAI - BORIVALI (WEST)';
      if (showBankDetailsCheck) showBankDetailsCheck.checked = true;

      showStampCheck.checked = true;
      showSignatureCheck.checked = true;
      showQrCodeCheck.checked = true;
      useOfficialLogoCheck.checked = true;

      updatePreview();
      showToast('Sample details loaded successfully!');
    });
  }

  // --- New Receipt Button ---
  if (btnNewReceipt) {
    btnNewReceipt.addEventListener('click', () => {
      receiptNoInput.value = incrementReceiptNo(receiptNoInput.value);
      donorNameInput.value = '';
      if (donorPanInput) donorPanInput.value = '';
      paymentModeInput.value = '';
      amountInput.value = '';
      amountInWordsInput.value = '';
      transactionIdInput.value = '';
      if (bankNameInput) bankNameInput.value = '';
      receiptDateInput.value = `${yyyy}-${mm}-${dd}`;
      updatePreview();
      donorNameInput.focus();
      showToast('New receipt initialized!');
    });
  }

  // --- Print / PDF ---
  btnPrintReceipt.addEventListener('click', () => {
    window.print();
  });

  // --- Download PNG via html2canvas ---
  btnDownloadImage.addEventListener('click', () => {
    showToast('Generating high-resolution PNG...');
    const targetElement = activeTemplate === 'portrait' ? certificate80GCard : receiptCard;
    if (!targetElement) return;

    const originalTransform = targetElement.style.transform;
    const originalMarginBottom = targetElement.style.marginBottom;
    targetElement.style.transform = 'none';
    targetElement.style.marginBottom = '0px';

    if (window.html2canvas) {
      window.html2canvas(targetElement, {
        scale: 2.5,
        useCORS: true,
        backgroundColor: '#ffffff'
      }).then(canvas => {
        targetElement.style.transform = originalTransform;
        targetElement.style.marginBottom = originalMarginBottom;
        const link = document.createElement('a');
        const fileName = (receiptNoInput.value || 'receipt').replace(/[^a-zA-Z0-9_-]/g, '_');
        link.download = `Donation_Receipt_${fileName}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
        showToast('PNG downloaded successfully!');
      }).catch(err => {
        targetElement.style.transform = originalTransform;
        targetElement.style.marginBottom = originalMarginBottom;
        console.error('Download error:', err);
        showToast('Error generating image. You can use "Print / PDF" instead.');
      });
    } else {
      showToast('Image renderer not ready. Please use Print / PDF.');
    }
  });

  // --- Zoom Controls ---
  function applyZoom(zoom) {
    currentZoom = Math.min(Math.max(zoom, 0.2), 1.6);
    const targetElement = activeTemplate === 'portrait' ? certificate80GCard : receiptCard;
    if (!targetElement) return;

    targetElement.style.transform = `scale(${currentZoom})`;
    targetElement.style.transformOrigin = 'top center';

    // Collapses unscaled vertical blank space when scaled down on mobile/tablet
    const unscaledHeight = activeTemplate === 'portrait' ? 1080 : 680;
    if (currentZoom < 1) {
      const reducedPx = Math.round(unscaledHeight * (1 - currentZoom));
      targetElement.style.marginBottom = `-${reducedPx}px`;
    } else {
      targetElement.style.marginBottom = '0px';
    }

    if (zoomLevelDisplay) {
      zoomLevelDisplay.textContent = `${Math.round(currentZoom * 100)}%`;
    }
  }

  function autoFitToScreen() {
    if (!paperViewport) return;
    const padding = window.innerWidth <= 576 ? 16 : (window.innerWidth <= 768 ? 24 : 40);
    const viewportWidth = paperViewport.clientWidth - padding;
    const targetWidth = activeTemplate === 'portrait' ? 794 : 1020;
    if (viewportWidth > 0 && viewportWidth < targetWidth) {
      const fitZoom = (viewportWidth / targetWidth);
      applyZoom(fitZoom);
    } else {
      applyZoom(1);
    }
  }

  btnZoomIn.addEventListener('click', () => applyZoom(currentZoom + 0.1));
  btnZoomOut.addEventListener('click', () => applyZoom(currentZoom - 0.1));
  btnZoomReset.addEventListener('click', autoFitToScreen);

  window.addEventListener('resize', () => {
    autoFitToScreen();
  });
  window.addEventListener('orientationchange', () => {
    setTimeout(autoFitToScreen, 200);
  });

  // --- LocalStorage History ---
  const STORAGE_KEY = 'ssf_receipts_history';

  function getSavedReceipts() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    } catch {
      return [];
    }
  }

  function saveReceiptsList(list) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    renderHistory();
  }

  function renderHistory() {
    const list = getSavedReceipts();
    historyCount.textContent = list.length;

    if (list.length === 0) {
      historyList.innerHTML = '<div class="empty-history">No receipts saved yet. Click "Save Receipt" to save your work.</div>';
      return;
    }

    historyList.innerHTML = list.map((item, index) => `
      <div class="history-item">
        <div class="history-item-header">
          <span class="history-receipt-no">${item.receiptNo || 'Receipt'}</span>
          <span class="history-date">${item.receiptDate || ''}</span>
        </div>
        <div class="history-donor">${item.donorName || 'Anonymous'}</div>
        <div class="history-item-bottom">
          <span class="history-amount">₹${item.amount || '0'}</span>
          <div class="history-actions">
            <button class="btn btn-secondary btn-sm" onclick="loadReceiptFromHistory(${index})">Load</button>
            <button class="btn btn-danger btn-sm" onclick="deleteReceiptFromHistory(${index})">Delete</button>
          </div>
        </div>
      </div>
    `).join('');
  }

  window.loadReceiptFromHistory = function(index) {
    const list = getSavedReceipts();
    const item = list[index];
    if (!item) return;

    if (item.template) switchTemplate(item.template);
    receiptTypeInput.value = item.receiptType || 'DONATION RECEIPT';
    receiptNoInput.value = item.receiptNo || '';
    receiptDateInput.value = item.receiptDateRaw || item.receiptDate || '';
    if (formNoInput) formNoInput.value = item.formNo || '';
    if (donationForInput) donationForInput.value = item.donationFor || '';
    donorNameInput.value = item.donorName || '';
    if (donorPanInput) donorPanInput.value = item.donorPan || '';
    paymentModeInput.value = item.paymentMode || '';
    transactionIdInput.value = item.transactionId || '';
    if (bankNameInput) bankNameInput.value = item.bankName || '';
    amountInput.value = item.amount || '';
    amountInWordsInput.value = item.amountInWords || '';

    updatePreview();
    closeHistory();
    showToast(`Loaded ${item.receiptNo || 'Receipt'}`);
  };

  window.deleteReceiptFromHistory = function(index) {
    const list = getSavedReceipts();
    list.splice(index, 1);
    saveReceiptsList(list);
    showToast('Receipt deleted from history');
  };

  btnSaveToHistory.addEventListener('click', () => {
    const receiptData = {
      id: Date.now(),
      template: activeTemplate,
      receiptType: receiptTypeInput.value,
      receiptNo: receiptNoInput.value,
      receiptDate: formatDateDDMMYYYY(receiptDateInput.value, '-'),
      receiptDateRaw: receiptDateInput.value,
      formNo: formNoInput ? formNoInput.value : '',
      donationFor: donationForInput ? donationForInput.value : '',
      donorName: donorNameInput.value,
      donorPan: donorPanInput ? donorPanInput.value : '',
      paymentMode: paymentModeInput.value,
      transactionId: transactionIdInput.value,
      bankName: bankNameInput ? bankNameInput.value : '',
      amount: amountInput.value,
      amountInWords: amountInWordsInput.value,
      timestamp: new Date().toISOString()
    };

    const list = getSavedReceipts();
    list.unshift(receiptData);
    saveReceiptsList(list);
    showToast(`Receipt ${receiptData.receiptNo} saved!`);
  });

  btnClearAllHistory.addEventListener('click', () => {
    if (confirm('Are you sure you want to delete all saved receipts?')) {
      saveReceiptsList([]);
      showToast('All history cleared');
    }
  });

  function openHistory() {
    renderHistory();
    historyDrawer.classList.add('active');
    historyBackdrop.classList.add('active');
  }

  function closeHistory() {
    historyDrawer.classList.remove('active');
    historyBackdrop.classList.remove('active');
  }

  btnToggleHistory.addEventListener('click', openHistory);
  btnCloseHistory.addEventListener('click', closeHistory);
  historyBackdrop.addEventListener('click', closeHistory);

  // Toast Helper
  let toastTimeout;
  function showToast(message) {
    clearTimeout(toastTimeout);
    toast.textContent = message;
    toast.classList.add('show');
    toastTimeout = setTimeout(() => {
      toast.classList.remove('show');
    }, 2800);
  }

  // --- Mobile Quick Jump Button ---
  const btnMobileQuickJump = document.getElementById('btnMobileQuickJump');
  const jumpBtnText = document.getElementById('jumpBtnText');
  const previewPanel = document.querySelector('.preview-panel');
  const receiptForm = document.getElementById('receiptForm');

  if (btnMobileQuickJump) {
    let atPreview = false;

    btnMobileQuickJump.addEventListener('click', () => {
      if (!atPreview) {
        if (previewPanel) {
          previewPanel.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        if (receiptForm) {
          receiptForm.scrollIntoView({ behavior: 'smooth' });
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }
    });

    window.addEventListener('scroll', () => {
      if (window.innerWidth <= 1024 && previewPanel) {
        const previewRect = previewPanel.getBoundingClientRect();
        if (previewRect.top < window.innerHeight * 0.45) {
          atPreview = true;
          if (jumpBtnText) jumpBtnText.textContent = 'Edit Form ↑';
        } else {
          atPreview = false;
          if (jumpBtnText) jumpBtnText.textContent = 'View Preview ↓';
        }
      }
    }, { passive: true });
  }

  // Initialize
  switchTemplate('portrait');
  updatePreview();
  renderHistory();
  autoFitToScreen();
  setTimeout(autoFitToScreen, 150);
});
