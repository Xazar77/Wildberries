
// получение данных с сервера
const getGoods = () => {
    const links = document.querySelectorAll('.navigation-link');
     
    
    
    
    const getData = () => {
        fetch('https://wildberries-3f483-default-rtdb.firebaseio.com/db.json')
            // .then(response => {return response.json()})
            .then(res => res.json())
            .then((data) => {
            
            localStorage.setItem('goods', JSON.stringify(data));
            })
        

    }
     
    links.forEach(link =>{
        
        link.addEventListener('click', (e) => {
            e.preventDefault();
            getData()
        })
    })





};

getGoods();