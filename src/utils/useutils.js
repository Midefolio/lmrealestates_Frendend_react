import { useLayoutEffect } from "react";
import { useHistory } from "react-router-dom";

const useUtils = () => {

const history = useHistory();

const openModal = (modal) => {
  var Dom = document.getElementById(modal);
  if(Dom){
   Dom.style.display = 'block';
  }
}

const closeModal = (modal)=> {
 var Dom = document.getElementById(modal);
 if(Dom){
  Dom.style.display = 'none';
 }
}

const setPopUp =(MainHeader, Header, Text, actionBtnText, action, okey) => {
var notifications = document.getElementById('notifications');
var mainHeader = document.getElementById('notification_main_header');
var header = document.getElementById('notification_header');
var text = document.getElementById('notification_body');
var okay = document.getElementById('okay-btn');
var actionBtn = document.getElementById('notification_btn')
if(Header !== undefined){
 mainHeader.innerHTML = MainHeader;
 header.innerHTML = Header;
 text.innerHTML = Text;
 notifications.style.display = 'block';
 if(action !== null){
  actionBtn.addEventListener('click', action)
 }
 if(actionBtnText !== null){
  actionBtn.style.display = 'block';
  actionBtn.innerHTML = actionBtnText;
 }else {
  actionBtn.style.display = 'none';
 }
 if(okey === true){
  okay.style.display = 'none'
 }else if(okey === false) {
  okay.style.display = 'inline-block'
 }else {
  okay.style.display = 'inline-block';
  okay.innerHTML = okey;
 }
}
}

const closePopUp =()=> {
 var actionBtn = document.getElementById('notification_btn');
 var newBtn = actionBtn.cloneNode(true)
 actionBtn.parentNode.replaceChild(newBtn, actionBtn);
 closeModal('notifications')
}


let toastTimeout; // variable to hold the timeout
const setToast = (msg) => {
  const toast = document.getElementById('my-toast');
  const mg = document.getElementById('msg');
  const icon = document.getElementById('toast-icon');
  if (msg !== "") {
    mg.innerHTML = msg;
    toast.className = 'my-toast showtoast';
    // icon.className = iconType;
    clearTimeout(toastTimeout); // clear any existing timeout
    toastTimeout = setTimeout(() => {
      toast.className = 'my-toast hidetoast';
    }, 2000);
  }
}

useLayoutEffect(()=> {
 const myToast = document.getElementById('my-toast');
myToast.addEventListener('mouseover', function() {
  clearTimeout(toastTimeout); // clear the timeout when mouseover
  this.className = 'my-toast showtoast';
});

myToast.addEventListener('mouseout', function() {
  const toast = this;
  toastTimeout = setTimeout(() => {
    toast.className = 'my-toast hidetoast';
  }, 2000);
});
})



const focusHandler =(dom)=> {
 var input = document.getElementById(dom);
 if(input){
  input.focus();
 }
}

const clickHandler =(dom)=> {
 var input = document.getElementById(dom);
 if(input){
  input.click();
 }
}

const setInnerText =(dom, text, show)=> {
 var DOM = document.getElementById(dom);
 if(show === true){
  DOM.style.display = 'block'
  DOM.innerHTML = text
 }else{
  DOM.style.display = 'none'
  DOM.innerHTML = ""
 }
}

const isLoading =(param)=> {
 var loader = document.getElementById('my-loader')
 if(param === true){
  loader.classList.add('d-block');
 }else{
  loader.classList.remove('d-block');
 }
}



const isPending =(dom, action)=> {
 var btn = document.getElementById(dom);
 if(btn){
  if(action === true){
   btn.innerHTML = `<span><i class="fa fa-spinner fa-pulse white"></i></span>`;
   btn.style.pointerEvents = 'none';
  }else{
   btn.innerHTML = action;
   btn.style.pointerEvents = 'unset';
  }
 }
}
const isSending =(action)=> {
 var btn = document.getElementById('isSending');
 if(btn){
  if(action === true){
   btn.style.display = 'block';
  }else{
    btn.style.display = 'none';
  }
 }
}

const isNetworkError =(param, type, msg)=> {
 var loader = document.getElementById('network-err')
 var Type = document.getElementById('err-title')
 var Msg = document.getElementById('err-msg')
 if(param === true){
  loader.classList.add('d-block');
  Type.innerHTML = type;
  Msg.innerHTML = msg;
 }else{
  loader.classList.remove('d-block');
 }
}

const formatPhoneNumber = (phoneNumber) => {
 phoneNumber = phoneNumber?.replace(/\D/g, '');
 const formattedPhoneNumber = phoneNumber?.replace(/(\d{3})(\d{3})(\d{4})/, '$1 $2 $3');
 return formattedPhoneNumber;
};

const areNamesSimilar = (name1, name2) => {
 const name1Words = name1.toLowerCase().split(' ').sort();
 const name2Words = name2.toLowerCase().split(' ').sort();
 return name1Words.length === name2Words.length && name1Words.every((word, index) => word === name2Words[index]);
};


const checkNames = (name1, name2)=>  {
 const name1Arr = name1.toLowerCase().split(' ');
 const name2Arr = name2.toLowerCase().split(' ');
 let count = 0;

 for (let i = 0; i < name1Arr.length; i++) {
   if (name2Arr.includes(name1Arr[i])) {
     count++;
   }
 }
 return count >= 2;
}


const errorHandler =(status, data)=> {

 if(status === 'expired'){
  isLoading(false);
  history.push('/login')
  return;
 }

 if(status === 'unauthorised'){
  history.push('/login');
  let head = 'Opps! 😥'; let mainHeader = 'Account Not Authorised' ;  let text = `${data}`
  setPopUp(mainHeader, head, text, null, null, `<span class="btn-sm-1 bd-code-1 px13 white">Okay</span>`)
  isLoading(false);
  return;
 }

 if(status === 'not found') {
  setToast('Invalid email or password')
  isLoading(false);
  return;
 }

 if(status === 'exist'){
  isLoading(false);
  let head = 'Opps! 😥'; let mainHeader = 'Please, Re-Confirm your email' ;  let text = `${data}`
  setPopUp(mainHeader, head, text, null, null, `<span class="btn-sm-2 rad-unset bd-unset bg-color-code-1 px13 white">Okay</span>`)
  return;
 }

 if(status === 'mailerror'){
  isLoading(false);
  let head = 'Opps! 😥'; let mainHeader = 'Cannot Send Verification Mail' ;  let text = `${data}`
  setPopUp(mainHeader, head, text, null, null, `<span class="btn-sm-2 rad-unset bd-unset bg-color-code-1 px13 white">Okay</span>`)
  return;
 }

 if(status === 'logouterror'){
  isLoading(false);
  let head = 'Opps! 😥'; let mainHeader = 'Logout Error !' ;  let text = `${data}`
  setPopUp(mainHeader, head, text, null, null, `<span class="btn-sm-2 rad-unset bd-unset bg-color-code-1 px13 white">Okay</span>`)
  return;
 }

 if(status !== 'unauthorised' && status !== 'mailerror' && status !== 'unverifiedemail'  && status !== 'expired'  && status !== 'not found' && status !== 'successful' && status !== 'exist'){
  isLoading(false);
  let head = 'Opps! 😥'; let mainHeader = 'Something Went Wrong' ;  let text = `${data}`
  setPopUp(mainHeader, head, text, null, null, `<span class="btn-sm-2 rad-unset bd-unset bg-color-code-1 px13 white">Okay</span>`)
  return;
 }

}


function getBankName(code) {
 switch (code) {
   case "044":
     return "Access Bank Plc";
   case "058":
     return "Guaranty Trust Bank";
   case "050":
     return "Ecobank Nigeria";
   case "011":
     return "First Bank of Nigeria Limited";
   case "215":
     return "Unity Bank Plc";
   case "033":
     return "United Bank for Africa Plc";
   case "035":
     return "Wema Bank Plc";
   case "214":
     return "First City Monument Bank Limited";
   case "301":
     return "Jaiz Bank Plc";
   case "50211":
     return "Kuda Bank";
   case "082":
     return "Keystone Bank Limited";
   case "221":
     return "Stanbic IBTC Bank Plc";
   case "057":
     return "Zenith Bank Plc";
   case "032":
     return "Union Bank of Nigeria Plc";
   case "PALM":
     return "Palmpay";
   case "40126":
     return "Moniepoint Microfinance Bank";
   case "566":
     return "VFD Microfinance Bank";
   case "503008":
     return "Opay";
   case "451":
     return "Accion Microfinance Bank";
   case "023":
     return "Citibank Nigeria Limited";
   case "512":
     return "Covenant Microfinance Bank Ltd";
   case "526":
     return "Empire Trust Microfinance Bank";
   case "070":
     return "Fidelity Bank Plc";
   case "138":
     return "Finca Microfinance Bank Limited";
   case "608":
     return "Fina Trust Microfinance Bank";
   case "001":
     return "Globus Bank Limited";
   case "030":
     return "Heritage Bank Plc";
   case "562":
     return "Infinity Microfinance Bank";
   case "101":
     return "LOTUS BANK";
   case "281":
     return "Mint Finex MFB";
   case "503":
     return "Mutual Trust Microfinance Bank";
   case "526005":
     return "Parallex Bank Limited";
   case "551":
     return "Peace Microfinance Bank";
   case "304":
     return "Pearl Microfinance Bank Limited";
   case "101152":
     return "PremiumTrust Bank Limited";
   case "101011":
     return "Providus Bank Limited";
  }

  // enure you add more
}



function formatNumber(num) {
if(num){
  const numString = num.toString().split("");
  const numLength = numString.length;
  const formattedNum = [];
  for (let i = numLength - 1, j = 0; i >= 0; i--, j++) {
    if (j % 3 === 0 && j !== 0) {
      formattedNum.unshift(",");
    }
    if (j % 9 === 2 && j !== 2) {
      formattedNum.unshift(",");
    }
    formattedNum.unshift(numString[i]);
  }
  return formattedNum.join("")  + ".00";
}
}




function formatTransactionTime(transactionTime, currentTime) {
 const diffInMs = Math.abs(new Date(currentTime) - new Date(transactionTime));
 const diffInMins = Math.round(diffInMs / (1000 * 60));
 const transactionDate = new Date(transactionTime);
 if (diffInMins < 1) {
   return "just now";
 } else if (diffInMins < 1440 && transactionDate.getDate() === new Date(currentTime).getDate()) {
   const hours = transactionDate.getHours();
   const minutes = transactionDate.getMinutes().toString().padStart(2, "0");
   const time = convertTo12HourFormat(hours, minutes);
   return `Today, ${time}`;
 } else if (diffInMins < 2880) {
   const hours = transactionDate.getHours();
   const minutes = transactionDate.getMinutes().toString().padStart(2, "0");
   const time = convertTo12HourFormat(hours, minutes);
   return `Yesterday, ${time}`;
 } else {
   const month = transactionDate.toLocaleString('default', { month: 'long' });
   const day = transactionDate.getDate().toString().padStart(2, "0");
   const year = transactionDate.getFullYear().toString();
   const hours = transactionDate.getHours();
   const minutes = transactionDate.getMinutes().toString().padStart(2, "0");
   const time = convertTo12HourFormat(hours, minutes);
   return `${month} ${day}, ${year} at ${time}`;
 }
}

function convertTo12HourFormat(hours, minutes) {
 const period = hours >= 12 ? "PM" : "AM";
 const hour12 = hours % 12 || 12;
 return `${hour12}:${minutes} ${period}`;
}


const makeid = (length) => {
 var result           = '';
 var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
 var charactersLength = characters.length;
 for ( var i = 0; i < length; i++ ) {
   result += characters.charAt(Math.floor(Math.random() * 
   charactersLength));
  }
  return result;
}

const position = (id) => {
 let position
 if(id == 1){
  position = id + 'st' + " " +  'Receiver';
  return position;
 }
 if(id == 2){
  position = id + 'nd' + " " +  'Receiver';
  return position;
 }
 if(id == 3){
  position = id + 'rd' + " " +  'Receiver';
  return position;
 }
 position = id + 'th' + " " + 'Receiver';
 return position;
}

const seePassword =(x, y) => {
 var input  = document.getElementById(x);
 var icon = document.getElementById(y)
 if(input.type === 'password'){
  input.type = 'text'
  icon.className = 'fas fa-eye-slash px13 mg-10'
 }else {
  input.type = 'password'
  icon.className = 'fas fa-eye px13 px13 mg-10 faded'
 }
}

function calculateDelieveryPrice(number) {
 if (number >= 0 && number <= 24) {
   return 800;
 } else {
   const basePrice = 800;
   const extraIncrease = number - 24;
   const additionalAmount = extraIncrease * 20;
   return basePrice + additionalAmount;
 }
}

function deductPercentage(number) {
 const deduction = number * 0.16; // Calculate 16% of the number
 const remainder = number - deduction; // Deduct the calculated percentage from the number
 return remainder;
}

function agentAmount(number) {
  const deduction = number * 0.03; // Calculate 3% of the number
  return deduction;
 }

function addThreeHoursToTime(timeString) {
 const givenTime = new Date(timeString);
 const threeHoursAhead = new Date(givenTime.getTime() + 3 * 60 * 60 * 1000);
 
 // Extract the required components from the new time
 const year = threeHoursAhead.getFullYear();
 const month = ('0' + (threeHoursAhead.getMonth() + 1)).slice(-2);
 const day = ('0' + threeHoursAhead.getDate()).slice(-2);
 const hours = ('0' + threeHoursAhead.getHours()).slice(-2);
 const minutes = ('0' + threeHoursAhead.getMinutes()).slice(-2);
 const seconds = ('0' + threeHoursAhead.getSeconds()).slice(-2);
 
 // Return the formatted time
 return `${hours}:${minutes}`;
}


const copyTextToClipboard = (text) => {
  const textArea = document.createElement('textarea');
  textArea.value = text;

  // Make it non-editable
  textArea.setAttribute('readonly', '');

  // Set its style to be off-screen
  textArea.style.position = 'absolute';
  textArea.style.left = '-9999px';

  // Append the text area to the document
  document.body.appendChild(textArea);

  // Select the text in the text area
  textArea.select();

  try {
    // Execute the copy command
    document.execCommand('copy');
    setToast('copied successfully')
  } catch (err) {
    console.error('Unable to copy text:', err);
  } finally {
    // Remove the temporary text area
    document.body.removeChild(textArea);
  }
}


function formatNigerianPhoneNumber(phoneNumber) {
  // Remove any spaces or special characters from the input
  phoneNumber = phoneNumber.replace(/\s+/g, '');

  // Check if the phone number starts with '0'
  if (phoneNumber.startsWith('0')) {
    // Replace '0' with '+234' at the beginning of the number
    phoneNumber ='+234'+phoneNumber.substring(1);
  }

  return phoneNumber;
}

function convertToTwoDecimalPlaces(value) {
  if (typeof value === 'number') {
    return value.toFixed(2); // Convert to 2 decimal places
  } else {
    // Handle non-numeric input, such as strings or other types
    return null; // or handle the error as needed
  }
}

const LGAS =[
  {label:"Asa", value:"Asa"},
  {label:"Baruten", value:"Baruten"},
  {label:"Edu", value:"Edu"},
  {label:"Ekiti", value:"Ekiti"},
  {label:"Ifelodun", value:"Ifelodun"},
  {label:"Ilorin East", value:"Ilorin East"},
  {label:"Ilorin South", value:"Ilorin South"},
  {label:"Ilorin West", value:"Ilorin West"},
  {label:"Irepodun", value:"Irepodun"},
  {label:"Isin", value:"Isin"},
  {label:"Kaiama", value:"Kaiama"},
  {label:"Moro", value:"Moro"},
  {label:"Offa", value:"Offa"},
  {label:"Oke Ero", value:"Oke Ero"},
  {label:"Oyun", value:"Oyun"},
  {label:"Pategi", value:"Pategi"}
]

function isStrongPassword(password) {
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return password.length >= 8 && passwordRegex.test(password);
}

function preventSpaceInPassword(id) {
  // Get the password input element by its ID
  const passwordInput = document.getElementById(id); // Replace 'yourPasswordInputId' with the actual ID of your password input element

  // Add an event listener to the password input
  passwordInput.addEventListener('keydown', function(event) {
    // Check if the pressed key is the spacebar
    if (event.code === 'Space') {
      // Prevent the default action (typing a space) if the key is the spacebar
      event.preventDefault();
    }
  });
}

function calculateInspectionFee(propertyFee) {
  if (propertyFee >= 1 && propertyFee <= 100000) {
      return 2000;
  } else if (propertyFee > 100000 && propertyFee <= 250000) {
      return 2500;
  } else if (propertyFee > 250000 && propertyFee <= 500000) {
      return 3000;
  } else if (propertyFee > 500000 && propertyFee <= 1000000) {
      return 3500;
  } else if (propertyFee > 1000000 && propertyFee <= 5000000) {
      return 5000;
  } else if (propertyFee > 5000000 && propertyFee <= 10000000) {
      return 10000;
  } else if (propertyFee > 10000000 && propertyFee <= 100000000) {
      return 15000;
  } else if (propertyFee > 100000000 && propertyFee <= 1000000000) {
      return 25000;
  } else if (propertyFee > 1000000000 && propertyFee <= 10000000000) {
      return 50000;
  } else {
      // You can handle other cases or return a default value here
      return 0;
  }
}


const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

const daysOfWeek = [
    "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
];

function formatDateInWords(dateString) {
    const dateParts = dateString.split('-');
    const year = parseInt(dateParts[0], 10);
    const month = parseInt(dateParts[1], 10) - 1; // Adjust month to start from 0
    const day = parseInt(dateParts[2], 10);

    const formattedDay = getFormattedDay(day);
    const formattedMonth = months[month];
    const formattedDayOfWeek = getFormattedDayOfWeek(new Date(year, month, day).getDay());

    return `${formattedDay}, ${formattedDayOfWeek}, ${formattedMonth}, ${year}`;
}

function getFormattedDay(day) {
  const suffixes = ["th", "st", "nd", "rd"];
  const suffix = (day >= 11 && day <= 13) || day % 10 > 3 ? suffixes[0] : suffixes[day % 10];
  return day + suffix;
}

function getFormattedDayOfWeek(dayOfWeek) {
  return daysOfWeek[dayOfWeek];
}

function hasDatePassed(dateString) {
  // Parse the input date string
  const dateParts = dateString.split('-');
  const year = parseInt(dateParts[0], 10);
  const month = parseInt(dateParts[1], 10) - 1; // Adjust month to start from 0
  const day = parseInt(dateParts[2], 10);

  // Create Date objects for the input date and the current date
  const inputDate = new Date(year, month, day);
  const currentDate = new Date();

  // Compare the input date with the current date
  return inputDate < currentDate;
}

 return {
  closeModal,
  openModal,
  setPopUp,
  closePopUp,
  setToast,
  focusHandler,
  clickHandler,
  setInnerText,
  isLoading,
  isPending,
  formatPhoneNumber,
  areNamesSimilar,
  checkNames,
  errorHandler,
  getBankName,
  formatNumber,
  formatTransactionTime,
  isNetworkError,
  makeid,
  position,
  seePassword,
  calculateDelieveryPrice,
  deductPercentage,
  addThreeHoursToTime,
  agentAmount,
  copyTextToClipboard,
  formatNigerianPhoneNumber,
  convertToTwoDecimalPlaces,
  isSending,
  LGAS,
  isStrongPassword,
  preventSpaceInPassword,
  calculateInspectionFee,
  formatDateInWords,
  hasDatePassed

 };
}
 
export default useUtils;