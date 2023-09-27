

import axios from "axios";

document.addEventListener('keydown', (e) =>{
    try{

        if(e.key === 'Enter'){
            const input_search = document.getElementById('search-btn-x')
            input_search.click();
            console.log('click')
            // const update_btn = document.getElementById('x-x');
            // console.log('click')
            // update_btn.click();
        } 
        else{

        }
    }
    catch(error){
        console.log(error)
    }
})


