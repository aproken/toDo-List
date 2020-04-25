'use strict';

const inputText = document.getElementById('myText'),
      myBtn = document.getElementById('myBtn'),
      text = document.getElementById('text');

const showText = function() {
  text.textContent = localStorage.getItem('memory');
} 

myBtn.addEventListener('click', function() {
  localStorage.setItem('memory', inputText.value);

  showText();
});

localStorage.removeItem('Text');

showText();