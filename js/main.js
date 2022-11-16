let btnScroll = document.querySelector('.scroll-btn');

//Scroll smooth and default url
btnScroll.addEventListener('click', clickHandler)
function clickHandler(e){
    const href = this.getAttribute("href")
    const itemHTML = document.querySelector(href); 
    let moveTo = itemHTML.offsetTop; 
    window.scrollTo({ top: moveTo, behavior: "smooth" }) 
    e.preventDefault();
}


let inputJs = document.querySelector('.input-js > span');
let memory = inputJs.innerText;
inputJs.innerHTML = "¿Quieres ver?";

let btnJs = inputJs.parentElement;
let statusValue = 0;

btnJs.addEventListener('click', () =>{
    const boxBtnShow = document.querySelectorAll('.input-perc');
    boxBtnShow.forEach(btnSingle => {
        btnSingle.classList.toggle('input-active')
        inputJs.innerHTML = memory;
        statusValue  = 2;
    });
})


let showInfo =setInterval(()=>{
    if(statusValue  == 0){
        inputJs.innerHTML = "¿Quieres ver?";
        statusValue  = 1;
    }
    else if(statusValue  == 2){
        clearInterval(showInfo);
    }
    else{
        inputJs.innerHTML = '¡Tócame!';
        statusValue  = 0;
    }
}, 1500)


let btnCopy = document.querySelector('.box-copy');
let textToCopy = document.querySelector('.email-contact > span');

btnCopy.addEventListener('click', () => {

    btnCopy.classList.remove('copy-active');
    btnCopy.classList.add('copy-off');

    navigator.clipboard.writeText(textToCopy.innerText);
})

