
const search = () => {

    const input = document.querySelector('.search-block > input');
    const searchBtn = document.querySelector('.search-block > button');
    
   
   

    const renderGoods = (goods) => {
        const goodsContainer = document.querySelector('.long-goods-list');
        goodsContainer.innerHTML = '';
        goods.forEach(good => {

            const goodBlock = document.createElement('div');

            const { description, id, img, label, name, price} = good;

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
    
    
    
    const getData = (value) => {
        fetch('https://wildberries-3f483-default-rtdb.firebaseio.com/db.json')
            // .then(response => {return response.json()})
            .then(res => res.json())
            .then((data) => {
                // const array = data.filter(item => {
                //     return item[category] === value;
                // })

                const array =  data.filter(good => {
                    return good.name.toLowerCase().includes(value.toLowerCase());
                });
                
                localStorage.setItem('goods', JSON.stringify(array));
                
                if(window.location.pathname !== '/goods.html') {
                    window.location.href ='/goods.html';
                    
                }else {
                    renderGoods(array);
                }
                
            })  
        

    }

    searchBtn.addEventListener('click', () => {
        // console.log(input.value);
        getData(input.value);
    })

}
  
search();




 


