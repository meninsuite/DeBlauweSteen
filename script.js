var products = [
  { name: 'Bier', price: 1 },
  { name: 'Fris', price: 1 },
  { name: 'Fles wijn', price: 8 },
  { name: 'Kratje bier', price: 24 }
];

var productControls = document.getElementById('productControls');
var totaalBedragOutput = document.getElementById('totaalBedrag');

products.forEach(function(product) {
  var productControl = document.createElement('div');
  productControl.className = 'product-control';

  var label = document.createElement('label');
  label.setAttribute('for', 'aantal' + product.name.replace(/\s/g, ''));
  label.textContent = product.name + ':';
  productControl.appendChild(label);

  var buttonsDiv = document.createElement('div');
  buttonsDiv.className = 'product-buttons';
  productControl.appendChild(buttonsDiv);

  var decrementBtn = createButton('-', function() {
    decrementAmount(product.name);
  });
  buttonsDiv.appendChild(decrementBtn);

  var input = document.createElement('input');
  input.type = 'number';
  input.id = 'aantal' + product.name.replace(/\s/g, '');
  input.min = '0';
  input.value = '0';
  input.addEventListener('input', updateTotaalBedrag);
  productControl.appendChild(input);

  var incrementBtn = createButton('+1', function() {
    incrementAmount(product.name, 1);
  });
  buttonsDiv.appendChild(incrementBtn);

  var increaseBy5Btn = createButton('+5', function() {
    incrementAmount(product.name, 5);
  });
  buttonsDiv.appendChild(increaseBy5Btn);

  var increaseBy10Btn = createButton('+10', function() {
    incrementAmount(product.name, 10);
  });
  buttonsDiv.appendChild(increaseBy10Btn);

  productControls.appendChild(productControl);
});

function createButton(label, onClick) {
  var button = document.createElement('button');
  button.type = 'button';
  button.textContent = label;
  button.addEventListener('click', onClick);
  return button;
}

function decrementAmount(productName) {
  var input = document.getElementById('aantal' + productName.replace(/\s/g, ''));
  var currentValue = parseInt(input.value);
  if (currentValue > 0) {
    input.value = currentValue - 1;
    updateTotaalBedrag();
  }
}

function incrementAmount(productName, amount) {
  var input = document.getElementById('aantal' + productName.replace(/\s/g, ''));
  var currentValue = parseInt(input.value);
  input.value = currentValue + amount;
  updateTotaalBedrag();
}

function updateTotaalBedrag() {
  var totaalBedrag = products.reduce(function(total, product) {
    var input = document.getElementById('aantal' + product.name.replace(/\s/g, ''));
    var amount = parseInt(input.value) || 0;
    return total + amount * product.price;
  }, 0);

  totaalBedragOutput.textContent = totaalBedrag;
}

document.getElementById('afrekenForm').addEventListener('submit', function(event) {
  event.preventDefault(); // Voorkom het verzenden van het formulier

  // Bereken het totaalbedrag
  var totaalBedrag = products.reduce(function(total, product) {
    var input = document.getElementById('aantal' + product.name.replace(/\s/g, ''));
    var amount = parseInt(input.value) || 0;
    return total + amount * product.price;
  }, 0);

  // Maak de URL met het totaalbedrag
  var afrekenURL = 'https://bunq.me/BlauweSteenPilsEnzo/' + totaalBedrag;

  // Navigeer naar de afrekenURL
  window.location.href = afrekenURL;
});
