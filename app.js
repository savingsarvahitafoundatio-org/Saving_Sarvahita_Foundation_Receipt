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
    const paperStage = document.getElementById('paperStage');
    if (!targetElement) return;

    const originalTransform = targetElement.style.transform;
    const originalStageWidth = paperStage ? paperStage.style.width : '';
    const originalStageHeight = paperStage ? paperStage.style.height : '';

    targetElement.style.transform = 'none';
    if (paperStage) {
      paperStage.style.width = activeTemplate === 'portrait' ? '794px' : '1020px';
      paperStage.style.height = activeTemplate === 'portrait' ? '1080px' : '680px';
    }

    if (window.html2canvas) {
      window.html2canvas(targetElement, {
        scale: 2.5,
        useCORS: true,
        backgroundColor: '#ffffff'
      }).then(canvas => {
        targetElement.style.transform = originalTransform;
        if (paperStage) {
          paperStage.style.width = originalStageWidth;
          paperStage.style.height = originalStageHeight;
        }
        const link = document.createElement('a');
        const fileName = (receiptNoInput.value || 'receipt').replace(/[^a-zA-Z0-9_-]/g, '_');
        link.download = `Donation_Receipt_${fileName}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
        showToast('PNG downloaded successfully!');
      }).catch(err => {
        targetElement.style.transform = originalTransform;
        if (paperStage) {
          paperStage.style.width = originalStageWidth;
          paperStage.style.height = originalStageHeight;
        }
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
    const paperStage = document.getElementById('paperStage');
    if (!targetElement) return;

    targetElement.style.transform = `scale(${currentZoom})`;
    targetElement.style.transformOrigin = 'top left';

    const unscaledWidth = activeTemplate === 'portrait' ? 794 : 1020;
    const unscaledHeight = activeTemplate === 'portrait' ? 1080 : 680;

    if (paperStage) {
      paperStage.style.width = `${Math.round(unscaledWidth * currentZoom)}px`;
      paperStage.style.height = `${Math.round(unscaledHeight * currentZoom)}px`;
    }

    if (zoomLevelDisplay) {
      zoomLevelDisplay.textContent = `${Math.round(currentZoom * 100)}%`;
    }
  }

  function autoFitToScreen() {
    if (!paperViewport) return;

    // Get true available viewport width on mobile/tablet vs desktop
    const windowWidth = Math.min(
      window.innerWidth || document.documentElement.clientWidth,
      document.documentElement.clientWidth || window.innerWidth
    );

    let availableWidth;
    if (windowWidth > 1024) {
      availableWidth = paperViewport.clientWidth - 48;
    } else {
      // On mobile and tablet, available width is full screen width minus small padding
      const padding = windowWidth <= 520 ? 16 : 28;
      availableWidth = windowWidth - padding;
    }

    const targetWidth = activeTemplate === 'portrait' ? 794 : 1020;
    if (availableWidth > 0 && availableWidth < targetWidth) {
      const fitZoom = (availableWidth / targetWidth);
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

  // ============================================================================
  // BULK EXCEL / CSV & SINGLE RECEIPT MODE CONTROLLER
  // ============================================================================
  const tabModeSingle = document.getElementById('tabModeSingle');
  const tabModeBulk = document.getElementById('tabModeBulk');
  const bulkUploadSection = document.getElementById('bulkUploadSection');

  let activeMode = 'single';

  if (tabModeSingle && tabModeBulk) {
    tabModeSingle.addEventListener('click', () => {
      activeMode = 'single';
      tabModeSingle.classList.add('active');
      tabModeBulk.classList.remove('active');
      if (receiptForm) receiptForm.style.display = 'block';
      if (bulkUploadSection) bulkUploadSection.style.display = 'none';
    });

    tabModeBulk.addEventListener('click', () => {
      activeMode = 'bulk';
      tabModeBulk.classList.add('active');
      tabModeSingle.classList.remove('active');
      if (receiptForm) receiptForm.style.display = 'none';
      if (bulkUploadSection) bulkUploadSection.style.display = 'flex';
      if (bulkDataQueue.length > 0) {
        loadBatchRowToPreview(currentBatchIndex);
      }
    });
  }

  // Bulk Elements
  const btnDownloadSampleExcel = document.getElementById('btnDownloadSampleExcel');
  const bulkDropzone = document.getElementById('bulkDropzone');
  const bulkFileInput = document.getElementById('bulkFileInput');
  const btnSelectFile = document.getElementById('btnSelectFile');

  const bulkQueueContainer = document.getElementById('bulkQueueContainer');
  const bulkFileName = document.getElementById('bulkFileName');
  const bulkRowCount = document.getElementById('bulkRowCount');
  const btnClearBulkData = document.getElementById('btnClearBulkData');

  const btnBulkPrev = document.getElementById('btnBulkPrev');
  const btnBulkNext = document.getElementById('btnBulkNext');
  const bulkCurrentRowIndicator = document.getElementById('bulkCurrentRowIndicator');

  const bulkProgressContainer = document.getElementById('bulkProgressContainer');
  const bulkProgressFill = document.getElementById('bulkProgressFill');
  const bulkProgressStatus = document.getElementById('bulkProgressStatus');

  const btnBulkDownloadPdfsZip = document.getElementById('btnBulkDownloadPdfsZip');
  const btnBulkDownloadAllZip = document.getElementById('btnBulkDownloadAllZip');
  const bulkTableBody = document.getElementById('bulkTableBody');
  const bulkPrintContainer = document.getElementById('bulkPrintContainer');

  let bulkDataQueue = [];
  let currentBatchIndex = 0;

  // 1. Download Sample Excel Template
  if (btnDownloadSampleExcel) {
    btnDownloadSampleExcel.addEventListener('click', () => {
      if (typeof XLSX === 'undefined') {
        showToast('Excel library not loaded. Please verify internet connection.');
        return;
      }

      const sampleRows = [
        {
          'Receipt No': '6001',
          'Date': formatDateDDMMYYYY(receiptDateInput.value, '-') || '06-09-2026',
          'Donor Name': 'RAMESH KUMAR SHARMA',
          'Amount': 2500,
          'Donation For': 'EDUCATION / HEALTH PROGRAM / ANIMAL WELFARE AND HUNGER SUPPORT',
          'Donor PAN': 'ABCDE1234F',
          'Payment Mode': 'ONLINE TRANSFER / UPI',
          'Transaction ID': 'TXN8934710293',
          'Bank Name': 'State Bank of India',
          'Form No': '10BD'
        },
        {
          'Receipt No': '6002',
          'Date': formatDateDDMMYYYY(receiptDateInput.value, '-') || '06-09-2026',
          'Donor Name': 'ANITA PATEL',
          'Amount': 5000,
          'Donation For': 'CHILD EDUCATION & SCHOLARSHIP SUPPORT',
          'Donor PAN': 'XYZPK9876Q',
          'Payment Mode': 'UPI',
          'Transaction ID': 'UPI9284719284',
          'Bank Name': 'HDFC Bank',
          'Form No': '10BD'
        },
        {
          'Receipt No': '6003',
          'Date': formatDateDDMMYYYY(receiptDateInput.value, '-') || '06-09-2026',
          'Donor Name': 'DEEPAK GUPTA',
          'Amount': 11000,
          'Donation For': 'ANIMAL WELFARE & RESCUE PROGRAM',
          'Donor PAN': '',
          'Payment Mode': 'BANK TRANSFER',
          'Transaction ID': 'IMPS83726190',
          'Bank Name': 'ICICI Bank',
          'Form No': '10BD'
        }
      ];

      const worksheet = XLSX.utils.json_to_sheet(sampleRows);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Donation_Receipts');

      worksheet['!cols'] = [
        { wch: 14 },
        { wch: 14 },
        { wch: 28 },
        { wch: 12 },
        { wch: 45 },
        { wch: 16 },
        { wch: 24 },
        { wch: 22 },
        { wch: 22 },
        { wch: 12 }
      ];

      XLSX.writeFile(workbook, 'SSF_Donation_Receipts_Template.xlsx');
      showToast('Sample Excel template downloaded!');
    });
  }

  // 2. File Selection & Drop Handlers
  if (btnSelectFile && bulkFileInput) {
    btnSelectFile.addEventListener('click', () => bulkFileInput.click());
  }

  if (bulkDropzone && bulkFileInput) {
    bulkDropzone.addEventListener('click', (e) => {
      if (e.target !== btnSelectFile) bulkFileInput.click();
    });

    bulkDropzone.addEventListener('dragover', (e) => {
      e.preventDefault();
      bulkDropzone.classList.add('dragover');
    });

    bulkDropzone.addEventListener('dragleave', () => {
      bulkDropzone.classList.remove('dragover');
    });

    bulkDropzone.addEventListener('drop', (e) => {
      e.preventDefault();
      bulkDropzone.classList.remove('dragover');
      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        processSpreadsheetFile(e.dataTransfer.files[0]);
      }
    });

    bulkFileInput.addEventListener('change', (e) => {
      if (e.target.files && e.target.files.length > 0) {
        processSpreadsheetFile(e.target.files[0]);
      }
    });
  }

  function normalizeKey(k) {
    return String(k || '').toLowerCase().replace(/[^a-z0-9]/g, '');
  }

  function parseFlexibleDate(val) {
    if (!val) return '';
    if (val instanceof Date && !isNaN(val)) {
      const y = val.getFullYear();
      const m = String(val.getMonth() + 1).padStart(2, '0');
      const d = String(val.getDate()).padStart(2, '0');
      return `${y}-${m}-${d}`;
    }
    const str = String(val).trim();
    if (/^\d{4}-\d{2}-\d{2}$/.test(str)) return str;
    const parts = str.split(/[-/.]/);
    if (parts.length === 3) {
      if (parts[0].length === 4) {
        return `${parts[0]}-${parts[1].padStart(2, '0')}-${parts[2].padStart(2, '0')}`;
      } else if (parts[2].length === 4) {
        return `${parts[2]}-${parts[1].padStart(2, '0')}-${parts[0].padStart(2, '0')}`;
      }
    }
    return str;
  }

  function processSpreadsheetFile(file) {
    if (!file) return;
    if (typeof XLSX === 'undefined') {
      showToast('Spreadsheet processor not loaded. Check internet connection.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = e.target.result;
        const workbook = XLSX.read(data, { type: 'binary', cellDates: true });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const rawJson = XLSX.utils.sheet_to_json(sheet, { defval: '' });

        if (!rawJson || rawJson.length === 0) {
          showToast('The selected file is empty or could not be parsed.');
          return;
        }

        bulkDataQueue = rawJson.map((row, idx) => {
          const item = {
            receiptNo: '',
            receiptDate: '',
            donorName: '',
            amount: '',
            amountInWords: '',
            donationFor: '',
            donorPan: '',
            paymentMode: '',
            transactionId: '',
            bankName: '',
            formNo: ''
          };

          for (const key of Object.keys(row)) {
            const nKey = normalizeKey(key);
            const val = row[key];

            if (nKey === 'receiptno' || nKey === 'receiptnumber' || nKey === 'receipt' || nKey === 'no' || nKey === 'srno') {
              item.receiptNo = String(val).trim();
            } else if (nKey === 'date' || nKey === 'receiptdate' || nKey === 'dated') {
              item.receiptDate = parseFlexibleDate(val);
            } else if (nKey === 'donorname' || nKey === 'donor' || nKey === 'name' || nKey === 'receivedfrom' || nKey === 'receivedfromdonor') {
              item.donorName = String(val).trim();
            } else if (nKey === 'amount' || nKey === 'amt' || nKey === 'rs' || nKey === 'inr' || nKey === 'total') {
              item.amount = String(val).trim();
            } else if (nKey === 'donationfor' || nKey === 'cause' || nKey === 'purpose' || nKey === 'for') {
              item.donationFor = String(val).trim();
            } else if (nKey === 'donorpan' || nKey === 'pan' || nKey === 'panno') {
              item.donorPan = String(val).trim();
            } else if (nKey === 'paymentmode' || nKey === 'mode' || nKey === 'instrument') {
              item.paymentMode = String(val).trim();
            } else if (nKey === 'transactionid' || nKey === 'txnid' || nKey === 'refno' || nKey === 'chequeno') {
              item.transactionId = String(val).trim();
            } else if (nKey === 'bankname' || nKey === 'bank' || nKey === 'drawnon') {
              item.bankName = String(val).trim();
            } else if (nKey === 'formno' || nKey === 'form') {
              item.formNo = String(val).trim();
            } else if (nKey === 'amountinwords' || nKey === 'words') {
              item.amountInWords = String(val).trim();
            }
          }

          if (!item.receiptNo) item.receiptNo = String(6000 + idx + 1);
          if (!item.receiptDate) item.receiptDate = receiptDateInput.value;
          if (item.amount && !item.amountInWords) {
            const num = parseFloat(item.amount);
            if (!isNaN(num)) item.amountInWords = numberToIndianWords(num).toUpperCase();
          }

          return item;
        });

        currentBatchIndex = 0;
        if (bulkFileName) bulkFileName.textContent = file.name;
        if (bulkRowCount) bulkRowCount.textContent = `${bulkDataQueue.length} Receipts`;
        if (bulkQueueContainer) bulkQueueContainer.style.display = 'flex';

        renderBulkTable();
        loadBatchRowToPreview(0);
        showToast(`Loaded ${bulkDataQueue.length} receipts from ${file.name}`);
      } catch (err) {
        console.error('Spreadsheet parse error:', err);
        showToast('Error reading spreadsheet file.');
      }
    };
    reader.readAsBinaryString(file);
  }

  // 3. Render Bulk Queue Table & Row Switcher
  function renderBulkTable() {
    if (!bulkTableBody) return;
    bulkTableBody.innerHTML = bulkDataQueue.map((row, idx) => `
      <tr class="${idx === currentBatchIndex ? 'active-batch-row' : ''}" onclick="selectBatchRow(${idx})">
        <td>${idx + 1}</td>
        <td><strong>${row.receiptNo || '-'}</strong></td>
        <td>${row.donorName || 'Anonymous'}</td>
        <td>₹${row.amount || '0'}</td>
        <td>
          <div class="batch-actions-cell">
            <button type="button" class="batch-view-pill" onclick="event.stopPropagation(); selectBatchRow(${idx})">
              ${idx === currentBatchIndex ? 'Viewing' : 'View'}
            </button>
            <button type="button" class="batch-pdf-pill" onclick="event.stopPropagation(); downloadSingleRowPdf(${idx})" title="Download this separate PDF file">
              PDF
            </button>
          </div>
        </td>
      </tr>
    `).join('');

    if (bulkCurrentRowIndicator) {
      bulkCurrentRowIndicator.textContent = `${currentBatchIndex + 1} of ${bulkDataQueue.length}`;
    }
  }

  window.selectBatchRow = function(idx) {
    if (idx < 0 || idx >= bulkDataQueue.length) return;
    currentBatchIndex = idx;
    loadBatchRowToPreview(idx);
    renderBulkTable();
  };

  function loadBatchRowToPreview(idx) {
    const row = bulkDataQueue[idx];
    if (!row) return;

    if (row.receiptNo !== undefined && receiptNoInput) receiptNoInput.value = row.receiptNo;
    if (row.receiptDate && receiptDateInput) receiptDateInput.value = row.receiptDate;
    if (row.formNo !== undefined && formNoInput) formNoInput.value = row.formNo;

    if (row.donationFor && donationForInput) {
      let matched = false;
      for (let opt of donationForInput.options) {
        if (opt.value.trim().toUpperCase() === row.donationFor.trim().toUpperCase()) {
          donationForInput.value = opt.value;
          matched = true;
          break;
        }
      }
      if (!matched) {
        donationForInput.value = 'CUSTOM';
        if (donationForCustomInput) {
          donationForCustomInput.style.display = 'block';
          donationForCustomInput.value = row.donationFor;
        }
      } else {
        if (donationForCustomInput) donationForCustomInput.style.display = 'none';
      }
    }

    if (row.donorName !== undefined && donorNameInput) donorNameInput.value = row.donorName;
    if (row.donorPan !== undefined && donorPanInput) donorPanInput.value = row.donorPan;
    if (row.paymentMode !== undefined && paymentModeInput) paymentModeInput.value = row.paymentMode;
    if (row.transactionId !== undefined && transactionIdInput) transactionIdInput.value = row.transactionId;
    if (row.bankName !== undefined && bankNameInput) bankNameInput.value = row.bankName;

    if (row.amount !== undefined && amountInput) {
      amountInput.value = row.amount;
      const num = parseFloat(row.amount);
      if (!isNaN(num)) {
        if (amountInWordsInput) amountInWordsInput.value = row.amountInWords || numberToIndianWords(num).toUpperCase();
      } else {
        if (amountInWordsInput) amountInWordsInput.value = row.amountInWords || '';
      }
    }

    updatePreview();
  }

  if (btnBulkPrev) {
    btnBulkPrev.addEventListener('click', () => {
      if (currentBatchIndex > 0) {
        selectBatchRow(currentBatchIndex - 1);
      }
    });
  }

  if (btnBulkNext) {
    btnBulkNext.addEventListener('click', () => {
      if (currentBatchIndex < bulkDataQueue.length - 1) {
        selectBatchRow(currentBatchIndex + 1);
      }
    });
  }

  if (btnClearBulkData) {
    btnClearBulkData.addEventListener('click', () => {
      bulkDataQueue = [];
      currentBatchIndex = 0;
      if (bulkFileInput) bulkFileInput.value = '';
      if (bulkQueueContainer) bulkQueueContainer.style.display = 'none';
      showToast('Bulk batch cleared.');
    });
  }

  // Helper: Create a high-quality jsPDF Document from canvas
  async function generatePdfDocument(targetElement) {
    const canvas = await html2canvas(targetElement, {
      scale: 2.2,
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff'
    });

    const { jsPDF } = window.jspdf;
    const isPortrait = activeTemplate === 'portrait';
    const pdf = new jsPDF({
      orientation: isPortrait ? 'portrait' : 'landscape',
      unit: 'mm',
      format: 'a4',
      compress: true
    });

    const imgData = canvas.toDataURL('image/jpeg', 0.96);
    const pageWidth = isPortrait ? 210 : 297;
    const pageHeight = isPortrait ? 297 : 210;
    pdf.addImage(imgData, 'JPEG', 0, 0, pageWidth, pageHeight, undefined, 'FAST');
    return pdf;
  }

  // Individual Row PDF Download
  window.downloadSingleRowPdf = async function(idx) {
    if (idx < 0 || idx >= bulkDataQueue.length) return;
    const row = bulkDataQueue[idx];
    showToast(`Generating separate PDF for Receipt ${row.receiptNo || idx + 1}...`);

    const targetElement = activeTemplate === 'portrait' ? certificate80GCard : receiptCard;
    const originalTransform = targetElement.style.transform;
    const paperStage = document.getElementById('paperStage');
    const originalStageWidth = paperStage ? paperStage.style.width : '';
    const originalStageHeight = paperStage ? paperStage.style.height : '';

    targetElement.style.transform = 'none';
    if (paperStage) {
      paperStage.style.width = activeTemplate === 'portrait' ? '794px' : '1020px';
      paperStage.style.height = activeTemplate === 'portrait' ? '1080px' : '680px';
    }

    try {
      loadBatchRowToPreview(idx);
      await new Promise(r => setTimeout(r, 60));

      const pdf = await generatePdfDocument(targetElement);
      const rNo = (row.receiptNo || `${idx + 1}`).replace(/[^a-zA-Z0-9_-]/g, '_');
      const dName = (row.donorName || 'Donor').slice(0, 20).replace(/[^a-zA-Z0-9_-]/g, '_');
      pdf.save(`Donation_Receipt_${rNo}_${dName}.pdf`);
      showToast(`Downloaded Receipt ${rNo} PDF!`);
    } catch (err) {
      console.error('Single PDF error:', err);
      showToast('Error generating PDF.');
    } finally {
      targetElement.style.transform = originalTransform;
      if (paperStage) {
        paperStage.style.width = originalStageWidth;
        paperStage.style.height = originalStageHeight;
      }
      loadBatchRowToPreview(currentBatchIndex);
    }
  };

  // 4. Download All Separate PDFs as a ZIP Archive
  if (btnBulkDownloadPdfsZip) {
    btnBulkDownloadPdfsZip.addEventListener('click', async () => {
      if (!bulkDataQueue || bulkDataQueue.length === 0) {
        showToast('Please upload an Excel/CSV file first.');
        return;
      }

      if (typeof JSZip === 'undefined' || typeof window.jspdf === 'undefined') {
        showToast('Required PDF bundling libraries not ready.');
        return;
      }

      if (bulkProgressContainer) bulkProgressContainer.style.display = 'flex';
      if (bulkProgressFill) bulkProgressFill.style.width = '0%';
      if (bulkProgressStatus) bulkProgressStatus.textContent = `Starting separate PDFs generation (0 / ${bulkDataQueue.length})...`;

      const zip = new JSZip();
      const targetElement = activeTemplate === 'portrait' ? certificate80GCard : receiptCard;
      const originalTransform = targetElement.style.transform;
      const paperStage = document.getElementById('paperStage');
      const originalStageWidth = paperStage ? paperStage.style.width : '';
      const originalStageHeight = paperStage ? paperStage.style.height : '';

      targetElement.style.transform = 'none';
      if (paperStage) {
        paperStage.style.width = activeTemplate === 'portrait' ? '794px' : '1020px';
        paperStage.style.height = activeTemplate === 'portrait' ? '1080px' : '680px';
      }

      try {
        for (let i = 0; i < bulkDataQueue.length; i++) {
          const row = bulkDataQueue[i];
          loadBatchRowToPreview(i);

          await new Promise(res => setTimeout(res, 80));

          if (bulkProgressFill) {
            bulkProgressFill.style.width = `${Math.round(((i) / bulkDataQueue.length) * 100)}%`;
          }
          if (bulkProgressStatus) {
            bulkProgressStatus.textContent = `Generating separate PDF ${i + 1} of ${bulkDataQueue.length}...`;
          }

          const pdf = await generatePdfDocument(targetElement);
          const pdfBuffer = pdf.output('arraybuffer');

          const rNo = (row.receiptNo || `${i + 1}`).replace(/[^a-zA-Z0-9_-]/g, '_');
          const dName = (row.donorName || 'Donor').slice(0, 20).replace(/[^a-zA-Z0-9_-]/g, '_');
          zip.file(`Donation_Receipt_${rNo}_${dName}.pdf`, pdfBuffer);
        }

        if (bulkProgressFill) bulkProgressFill.style.width = '100%';
        if (bulkProgressStatus) bulkProgressStatus.textContent = 'Packaging ZIP with all separate PDFs...';

        const zipBlob = await zip.generateAsync({ type: 'blob' });
        const downloadLink = document.createElement('a');
        downloadLink.href = URL.createObjectURL(zipBlob);
        downloadLink.download = `SSF_Separate_PDF_Receipts_${Date.now()}.zip`;
        downloadLink.click();

        showToast(`Downloaded all ${bulkDataQueue.length} separate PDFs in ZIP!`);
        setTimeout(() => {
          if (bulkProgressContainer) bulkProgressContainer.style.display = 'none';
        }, 2500);
      } catch (err) {
        console.error('Bulk separate PDFs ZIP error:', err);
        showToast('Error generating separate PDFs. Please try with fewer rows.');
        if (bulkProgressContainer) bulkProgressContainer.style.display = 'none';
      } finally {
        targetElement.style.transform = originalTransform;
        if (paperStage) {
          paperStage.style.width = originalStageWidth;
          paperStage.style.height = originalStageHeight;
        }
        loadBatchRowToPreview(currentBatchIndex);
      }
    });
  }

  // 5. Download All Receipts as ZIP Archive
  if (btnBulkDownloadAllZip) {
    btnBulkDownloadAllZip.addEventListener('click', async () => {
      if (!bulkDataQueue || bulkDataQueue.length === 0) {
        showToast('Please upload an Excel/CSV file first.');
        return;
      }

      if (typeof JSZip === 'undefined' || typeof html2canvas === 'undefined') {
        showToast('Required bundling libraries not ready.');
        return;
      }

      if (bulkProgressContainer) bulkProgressContainer.style.display = 'flex';
      if (bulkProgressFill) bulkProgressFill.style.width = '0%';
      if (bulkProgressStatus) bulkProgressStatus.textContent = `Starting ZIP bundle (0 / ${bulkDataQueue.length})...`;

      const zip = new JSZip();
      const targetElement = activeTemplate === 'portrait' ? certificate80GCard : receiptCard;
      const originalTransform = targetElement.style.transform;
      const paperStage = document.getElementById('paperStage');
      const originalStageWidth = paperStage ? paperStage.style.width : '';
      const originalStageHeight = paperStage ? paperStage.style.height : '';

      targetElement.style.transform = 'none';
      if (paperStage) {
        paperStage.style.width = activeTemplate === 'portrait' ? '794px' : '1020px';
        paperStage.style.height = activeTemplate === 'portrait' ? '1080px' : '680px';
      }

      try {
        for (let i = 0; i < bulkDataQueue.length; i++) {
          const row = bulkDataQueue[i];
          loadBatchRowToPreview(i);

          await new Promise(res => setTimeout(res, 90));

          if (bulkProgressFill) {
            bulkProgressFill.style.width = `${Math.round(((i) / bulkDataQueue.length) * 100)}%`;
          }
          if (bulkProgressStatus) {
            bulkProgressStatus.textContent = `Capturing receipt image ${i + 1} of ${bulkDataQueue.length}...`;
          }

          const canvas = await html2canvas(targetElement, {
            scale: 2,
            useCORS: true,
            logging: false,
            backgroundColor: '#ffffff'
          });

          const dataUrl = canvas.toDataURL('image/png');
          const base64 = dataUrl.split(',')[1];
          const rNo = (row.receiptNo || `${i + 1}`).replace(/[^a-zA-Z0-9_-]/g, '_');
          const dName = (row.donorName || 'Donor').slice(0, 20).replace(/[^a-zA-Z0-9_-]/g, '_');
          zip.file(`Donation_Receipt_${rNo}_${dName}.png`, base64, { base64: true });
        }

        if (bulkProgressFill) bulkProgressFill.style.width = '100%';
        if (bulkProgressStatus) bulkProgressStatus.textContent = 'Packaging ZIP archive...';

        const zipBlob = await zip.generateAsync({ type: 'blob' });
        const downloadLink = document.createElement('a');
        downloadLink.href = URL.createObjectURL(zipBlob);
        downloadLink.download = `SSF_Donation_Receipts_Batch_${Date.now()}.zip`;
        downloadLink.click();

        showToast(`Successfully downloaded all ${bulkDataQueue.length} receipts in ZIP!`);
        setTimeout(() => {
          if (bulkProgressContainer) bulkProgressContainer.style.display = 'none';
        }, 2500);
      } catch (err) {
        console.error('Bulk ZIP generation error:', err);
        showToast('Error creating ZIP bundle. Please try with fewer rows.');
        if (bulkProgressContainer) bulkProgressContainer.style.display = 'none';
      } finally {
        targetElement.style.transform = originalTransform;
        if (paperStage) {
          paperStage.style.width = originalStageWidth;
          paperStage.style.height = originalStageHeight;
        }
        loadBatchRowToPreview(currentBatchIndex);
      }
    });
  }

  // Initialize
  switchTemplate('portrait');
  updatePreview();
  autoFitToScreen();
  setTimeout(autoFitToScreen, 150);
});
