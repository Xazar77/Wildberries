
const search = () => {

    const input = document.querySelector('.search-block > input');
    const searchBtn = document.querySelector('.search-block > button');
    
    // input.addEventListener('input', (e) => {
    //     e.preventDefault();
    //     console.log(input.value)

    // })
    searchBtn.addEventListener('click', () => {
        console.log(input.value);
    })

}
  
search();