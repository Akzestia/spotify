

import axios from "axios";

const defaultScrollLength = 0;


document.addEventListener('keydown', (e) =>{
    if(e.key === ' '){
        const scrollLength = Math.min(defaultScrollLength, e.deltaY);
        window.scrollBy(0, scrollLength);
    }
})

document.addEventListener('keydown', (e) =>{
    try{

        if(e.key === 'Enter'){
            const input_search = document.getElementById('search-btn-x')
            document.activeElement.blur()
            input_search.click();
            console.log('click')
            // const update_btn = document.getElementById('x-x');
            // console.log('click')
            // update_btn.click();
        } 
        
        if(e.key === ' ' && document.activeElement !== document.getElementById("search-input")){
            window.scrollBy(0, 0);
            // const div = document.querySelector('.sn-div-main');
            // div.classList.add('no-scroll');
            const togglebtn = document.querySelectorAll('.xxx-i')[0]
            document.activeElement.blur();
            document.querySelector('.xxx-i').classList.add('active');
            togglebtn.click();
            
        }
    }
    catch(error){
        console.log(error)
    }
})//

document.addEventListener('keyup', (e) =>{
    try{
        if(e.key === ' ' && document.activeElement !== document.getElementById("search-input")){
            document.querySelector('.xxx-i').classList.remove('active');
        }
    }
    catch{}
   
})

let last_volume = 0;
let istrue = false;

