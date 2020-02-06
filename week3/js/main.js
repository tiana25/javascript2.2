if(document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded', ready)
}
else{
    ready()
}
var isClicked = false
var indexClicked = 0
function ready(){
    var addToCartButton = document.getElementsByClassName('primary')[0]
    addToCartButton.addEventListener('click', addToCartByClick)
    var inputRow = document.getElementById('txt')
    inputRow.addEventListener('keyup', function(event){
        if (event.keyCode === 13){
            addToCartByClick(event)
        }
    })

    var removeCartButtons = document.getElementsByClassName('delete')
        for(var i = 0; i<removeCartButtons.length; i++){
            var button = removeCartButtons[i];
            button.addEventListener('click', removeCartItem)
        }

        var addToCartButtons = document.getElementsByClassName('green')
            for(var i = 0; i<addToCartButtons.length; i++){
                var button = addToCartButtons[i];
                button.addEventListener('click', addToCart)
                button.addEventListener('mouseenter', changeDarkGreen)
                button.addEventListener('mouseleave', changeLightGreen)
        }
        var deleteFromCartButtons = document.getElementsByClassName('minus')
        for(var i = 0; i<deleteFromCartButtons.length; i++){
            var button = deleteFromCartButtons[i];
            button.addEventListener('click', deleteFromCart)
        }

        var buyButtons = document.getElementsByClassName('buy', 'button')
        for(var i = 0; i<buyButtons.length; i++){
            var button = buyButtons[i];
            button.addEventListener('click', buyItem)
        }

         var hiddenInputs = document.getElementsByClassName("hiddenNames")
         for(var i = 0; i<hiddenInputs.length; i++){
             var button = hiddenInputs[i];
             button.addEventListener('focusout', changeName)
         }
        
        var titlesCollection = document.getElementsByClassName('title')
        for(var i = 0; i < titlesCollection.length; i++) {
            var title = titlesCollection[i];
            title.addEventListener('click', addName)
        }
        
}
function addName(event){
    var title = event.target
    title.style.display = 'none'
    var input = title.parentElement.getElementsByClassName('hiddenNames')[0]
    input.type = 'text'
    input.setAttribute("value", title.innerText);
}
function changeName(event){
    var input = event.target
    var newName = input.value
    var title = input.parentElement.getElementsByClassName('title')[0]
    title.style.display = "initial"
    title.innerText = newName
    input.type = 'hidden'
    var hiddenInputs = input.parentElement.parentElement.parentElement.getElementsByClassName('hiddenNames')
    var index = Array.from(hiddenInputs).indexOf(input)
    document.getElementById(index).getElementsByClassName('buy','label')[0].innerText = newName
}
function buyItem(event){
    var button = event.target
    var index = Array.from(document.getElementsByClassName('last-buttons')).indexOf(button.parentElement.parentElement)

    button.parentElement.parentElement.getElementsByClassName('delete')[0].style.display = 'none';
    button.parentElement.parentElement.getElementsByClassName('buy','button')[0].style.display = 'none';
    var wrappings =  button.parentElement.parentElement.getElementsByClassName('wrap')
    for (var i = 0; i< wrappings.length; i++){
        wrappings[i].style.display = 'none';
    }
    var addAndDeleteButtons = button.parentElement.parentElement.parentElement.getElementsByClassName('group')[0]
    addAndDeleteButtons.getElementsByClassName('green')[0].style.display = 'none';
    addAndDeleteButtons.getElementsByClassName('minus')[0].style.display = 'none';
    button.parentElement.parentElement.parentElement.getElementsByClassName('title')[0].style.textDecoration = 'line-through'

    var boughtRightBlock = document.getElementsByClassName('stats-not-bought')
    
     var boughtItemsContent = document.getElementById(index)
     boughtItemsContent.style.textDecoration = 'line-through'
     boughtRightBlock[1].append(boughtItemsContent)
   
      var notBought = document.getElementsByClassName('last-buttons')[index]
      var newButtonNotBought = document.createElement('div')
      newButtonNotBought.classList.add('wrap')
      var newButtonContents = `
     <button class="buy button n">Не куплено</button>`
      newButtonNotBought.innerHTML = newButtonContents
      notBought.append(newButtonNotBought)
      document.getElementsByClassName('last-buttons')[index].getElementsByClassName('n')[0].addEventListener('click', getAllBack)
}

function getAllBack(event){
    var button = event.target;
    var index = Array.from(document.getElementsByClassName('last-buttons')).indexOf(button.parentElement.parentElement)
    
    var addAndDeleteButtons = button.parentElement.parentElement.parentElement.getElementsByClassName('group')[0]
    addAndDeleteButtons.getElementsByClassName('green')[0].style.display = 'initial'
    addAndDeleteButtons.getElementsByClassName('minus')[0].style.display = 'initial'
    button.parentElement.parentElement.parentElement.getElementsByClassName('title')[0].style.textDecoration = 'none'
    button.parentElement.parentElement.getElementsByClassName('delete')[0].style.display = 'initial';
    button.parentElement.parentElement.getElementsByClassName('buy','button')[0].style.display = 'initial';
    var wrappings =  button.parentElement.parentElement.getElementsByClassName('wrap')
    for (var i = 0; i< wrappings.length; i++){
        wrappings[i].style.display = 'initial';
    }
    var boughtRightBlock = document.getElementsByClassName('stats-not-bought')
    var boughtItemsContent = document.getElementById(index)
    boughtItemsContent.style.textDecoration = 'none'
     boughtRightBlock[0].append(boughtItemsContent)
    button.parentElement.parentElement.parentElement.getElementsByClassName('last-buttons')[0].getElementsByClassName('n')[0].remove()
}
function deleteFromCart(event){
    var button = event.target
    var element = button.parentElement.parentElement
    var price = parseInt(element.getElementsByClassName('count')[0].innerText)
    if(price>1){
       price--;
       element.getElementsByClassName('count')[0].innerText = price;
    }
    if(price==1) {
        element.getElementsByClassName('red')[0].style.backgroundColor = 'lightcoral'
    }
    var minusButtons = document.getElementsByClassName('minus')
    var index = Array.from(minusButtons).indexOf(button);
    document.getElementsByClassName('orange')[index].innerText = price
}
function addToCartByClick(event){
    //creating in left container new row with item
    var inputItem = document.getElementById('txt').value.trim()
    document.getElementById('txt').value = ""
    document.getElementById('txt').focus()
    var allItemNames = document.getElementsByClassName('title')
    for(var i = 0; i< allItemNames.length; i++){
        if((allItemNames[i].innerText == inputItem) || inputItem==null ||inputItem ==""){
            return
        }
    }
    var cartRow = document.createElement('div')
    cartRow.classList.add('item', 'select')
    var cartItems = document.getElementsByClassName('col left container')[0]
    var cartRowContents = `
    <div class="column items">
    <input type = "hidden" class="hiddenNames" onfocusout="changeName">
    <span class="title">${inputItem}</span></div>
    <div class="buttons group">
        <div class="wrap"><button class="mini red minus button " data-tooltip="Менше">-</button></div>
        <div class="wrap"><span class="count label">1</span></div>
        <div class="wrap"><button class="mini green plus button"  data-tooltip="Більше">+</button></div>
    </div>
    <div class="last-buttons">
       <div class="wrap"><button class="buy button" data-tooltip="Куплено">Куплено</button></div>
       <div class="wrap"><button class="delete red button" data-tooltip="Назад">x</button></div>
    </div>`
    cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow)

    //creating button handler
    cartRow.getElementsByClassName('green')[0].addEventListener('click', addToCart)
    cartRow.getElementsByClassName('green')[0].addEventListener('mouseenter', changeDarkGreen)
    cartRow.getElementsByClassName('green')[0].addEventListener('mouseleave', changeLightGreen)
    cartRow.getElementsByClassName('delete')[0].addEventListener('click', removeCartItem)
    cartRow.getElementsByClassName('minus')[0].addEventListener('click', deleteFromCart)
    cartRow.getElementsByClassName('buy', 'button')[0].addEventListener('click', buyItem)
       

    //creating in right container new item
    var newItemLabel = document.createElement('div')
    newItemLabel.classList.add('stats', 'label', 'box')
    var idIndex = document.getElementsByClassName('last-buttons').length
    newItemLabel.id = idIndex - 1
    var allLabels = document.getElementsByClassName('stats-not-bought')[0]
    var labelContent =`
    <div class="wrap"><span class="mini stats buy label">${inputItem}</span></div>
    <div class="wrap"><span class="orange count label">1</span></div>
    `
    newItemLabel.innerHTML = labelContent
    allLabels.append(newItemLabel)
}

function removeCartItem(event){
    var buttonClicked = event.target
    var removeButtons = document.getElementsByClassName('delete')
    var index = Array.from(removeButtons).indexOf(buttonClicked)
    buttonClicked.parentElement.parentElement.parentElement.remove()
    document.getElementsByClassName('box')[index].remove()
    
}
function changeDarkGreen(event){
    var button = event.target
    button.style.backgroundColor = "#008000"
}
function changeLightGreen(event){
    var button = event.target
    button.style.backgroundColor = "#21BA45"
}

function addToCart(event){
    var button = event.target
    var element = button.parentElement.parentElement
    var price = parseInt(element.getElementsByClassName('count')[0].innerText)
    price++;
    element.getElementsByClassName('count')[0].innerText = price;
    if(price>1){
       element.getElementsByClassName('red')[0].style.backgroundColor = "#DB2828"
    }
    var plusButtons = document.getElementsByClassName('green')
    var index = Array.from(plusButtons).indexOf(button);
    document.getElementsByClassName('orange')[index].innerText = price
}
