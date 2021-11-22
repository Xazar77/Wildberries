
// получение данных с сервера
const getGoods = () => {
    const links = document.querySelectorAll('.navigation-link');
    const more = document.querySelector('.more');



    const renderGoods = (goods) => {
        const goodsContainer = document.querySelector('.long-goods-list');
        goodsContainer.innerHTML = '';
        goods.forEach(good => {
            const goodBlock = document.createElement('div');
            const {description, id, img, label, name, price} = good;
            goodBlock.classList.add('col-lg-3');
            goodBlock.classList.add('col-sm-6');
            goodBlock.innerHTML = `
                <div class="goods-card">
                    <span class="label ${label ? null : 'd-none'}">${label}</span>
                    <img src="${img}" alt="${name}">
                    <h3 class="goods-title">${name}</h3>
                    <p class="goods-description">${description}</p>
                    <button class="button goods-card-btn add-to-cart" data-id="${id}">
                        <span class="button-price">$${price}</span>
                    </button>
                </div>
                `
                goodsContainer.append(goodBlock);
                // console.log(good);
        })
    }
    
    
    
    const getData = (value, category) => {
        fetch('https://wildberries-3f483-default-rtdb.firebaseio.com/db.json')
            // .then(response => {return response.json()})
            .then(res => res.json())
            .then((data) => {
                // const array = data.filter(item => {
                //     return item[category] === value;
                // })
               
                const array = category ? data.filter(item => item[category] === value) : data;
               
                localStorage.setItem('goods', JSON.stringify(array));
                
                if(window.location.pathname !== '/goods.html') {
                    window.location.href ='/goods.html';
                    
                }else {
                    renderGoods(array);
                }
                
            })  
        

    }
     
    links.forEach(link =>{
        
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const linkValue = link.textContent;
            const category  = link.dataset.field;
            // console.log(category);
            getData(linkValue, category)
        })
    })

    if(localStorage.getItem('goods') && window.location.pathname === '/goods.html') {
        renderGoods(JSON.parse(localStorage.getItem('goods')));

    }
    if(more) {
        more.addEventListener('click', (e) => {
            e.preventDefault();
            
            getData();
        })
    }
    




};

getGoods();