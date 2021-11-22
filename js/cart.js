
const cart = () => {
        
    const cartBtn = document.querySelector('.button-cart'),
        cart = document.getElementById('modal-cart'),
        closeBtn = cart.querySelector('.modal-close'),
        goodsContainer = document.querySelector('.long-goods-list'),
        cartTable = document.querySelector('.cart-table__goods'),
        modalForm = document.querySelector('.modal-form'),
        sumTotal = document.querySelector('.card-table__total'),
        inputName = document.getElementById('name'),
        inputPhone = document.getElementById('phone');
        
        
    

    const deletCartItem = (id) =>{
        const cart = JSON.parse(localStorage.getItem('cart'));

        const newCart = cart.filter(good => {
            return good.id !== id;
        })
        localStorage.setItem('cart',JSON.stringify(newCart));
        renderCartGoods(JSON.parse(localStorage.getItem('cart')))
    } 

    const plusCartItem = (id) =>{
        const cart = JSON.parse(localStorage.getItem('cart'));

        const newCart =  cart.map(good => {
            if(good.id === id) {
                good.count++;
            }
            return good;
        })

        localStorage.setItem('cart',JSON.stringify(newCart));
        renderCartGoods(JSON.parse(localStorage.getItem('cart')))
    } 

    const minusCartItem = (id) =>{
        const cart = JSON.parse(localStorage.getItem('cart'));

        const newCart =  cart.map(good => {
            if(good.id === id) {
                if(good.count > 0){
                    good.count--;
                }
            }
            return good;
        })

        localStorage.setItem('cart',JSON.stringify(newCart));
        renderCartGoods(JSON.parse(localStorage.getItem('cart')))
    } 





    const addToCart = (id) => {
        const goods = JSON.parse(localStorage.getItem('goods'));
        const clickedGood = goods.find(good => good.id === id)
        const cart = localStorage.getItem('cart') ? 
                JSON.parse(localStorage.getItem('cart')) : [];

        
    
        if(cart.some(good => good.id === clickedGood.id)) {
            // console.log('++')
            cart.map(good => {
                if(good.id === clickedGood.id) {
                    good.count++;
                }
            })
        } else {
            
            clickedGood.count = 1;
            cart.push(clickedGood);
        }
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    const renderCartGoods = (goods) => {
        cartTable.innerHTML = '';
        let tottalPrice = 0;
        goods.forEach(good => {

            const {name, price, count} = good;
            const priceForProduct = +(price * count);
            
            sumTotal.innerHTML = tottalPrice +=priceForProduct;

            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${name}</td>
                <td>${price}$</td>
                <td><button class="cart-btn-minus"">-</button></td>
                <td>${count}</td>
                <td><button class=" cart-btn-plus"">+</button></td>
                <td>${priceForProduct}$</td>
                <td><button class="cart-btn-delete"">x</button></td>
          
             `
             cartTable.append(tr);

          tr.addEventListener('click', (e) => {
            

            if(e.target.classList.contains('cart-btn-minus')){

                minusCartItem(good.id);

            }else if (e.target.classList.contains('cart-btn-plus')) {

                plusCartItem(good.id);

            }else if (e.target.classList.contains('cart-btn-delete')){
                deletCartItem(good.id);
            }
          })
        })
    }

    const sendForm = (user) => {
        const cartArray = localStorage.getItem('cart') ? 
        JSON.parse(localStorage.getItem('cart')) : [];

        // const user = localStorage.setItem('sendUser', {name,phone})

        fetch('https://jsonplaceholder.typicode.com/posts', {
            method:'POST',
            body: JSON.stringify({
                cart: cartArray,
                user: user
                // name: '',
                // phone: ''
            })

        })
        .then(res => {
            if(res.ok)
            cart.style.display = '';
            
        })
        .catch(e => {
            console.log(e);
        })
        
    }
    modalForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const user = {
                name: inputName.value,
                phone: inputPhone.value
            }
            localStorage.setItem('user', JSON.stringify(user));
        
        
         sendForm(user); 
    })
                  
    

    if(localStorage.getItem('user')){
           
        localStorage.removeItem('cart');
    }


    cartBtn.addEventListener('click', ()=> {

        const cartArray = localStorage.getItem('cart') ? 
                JSON.parse(localStorage.getItem('cart')) : [];


        renderCartGoods(cartArray);
        cart.style.display = 'flex';
    });

    closeBtn.addEventListener('click', () => {
        // cart.style.display = 'none';
        cart.style.display = '';   // можно просто очищать стили
    })

//&& e.target.classlist.contains('overlay'))

    cart.addEventListener('click', (e) => {
        // console.log(e.target)
        if(!e.target.closest('.modal')) {                         
            cart.style.display = '';
        }
    })


    window.addEventListener('keydown', (e) => {
        if(e.key === 'Escape') {
            cart.style.display = '';
        }
    })


    if(goodsContainer) {
        goodsContainer.addEventListener('click', (e) => {

            if(e.target.closest('.add-to-cart')) {
                const buttonToCart = e.target.closest('.add-to-cart')
                const goodId = buttonToCart.dataset.id;
                addToCart(goodId)

               
            }
            
           
        })
    }







}
 cart();