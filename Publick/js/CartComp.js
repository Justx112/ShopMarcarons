Vue.component('cart', {
    data() {
        return {
            cartItems: [],
            showCart: false,
        }
    },
    methods: {
        addProduct(product, count) {
            count = Number(count)
            let find = this.cartItems.find(el => el.id_product === product.id_product);
            if (find) {
                this.$parent.putJson(`/api/cart/${find.id_product}`, product);
                find.count += count;
            }
            else {
                let prod = Object.assign({ count: count }, product);
                this.$parent.postJson('/api/cart', prod)
                    .then(data => {
                        if (data.result === 1) {
                            this.cartItems.push(prod);
                        }
                    });
            }
        },
        remove(item) {
            this.$parent.getJson(`${API}/deleteFromBasket.json`)
                .then(data => {
                    if (data.result === 1) {
                        if (item.quantity > 1) {
                            item.quantity--;
                        } else {
                            this.cartItems.splice(this.cartItems.indexOf(item), 1)
                        }
                    }
                })
        },
        deleteItem(item) {
            this.$parent.deleteJson(`/api/cart/${item.id_product}`, item)
                .then(this.cartItems.splice(this.cartItems.indexOf(item), 1));

        },
        getSumm()
        {
            let sum = 0;
            this.cartItems.forEach(element => {
                sum += element.price * element.count
            });
            return sum
        },
        getCount()
        {
            let count = 0;
            this.cartItems.forEach(element => {
                count += element.count
            });
            return count
        },
    },
    mounted() {
        this.$parent.getJson('/api/cart')
            .then(data => {
                for (let el of data.contents) {
                    this.cartItems.push(el);
                }
            });
    },
    template: `
        <div>
            <img @click="showCart = !showCart" src="images/eva_shopping-cart-outline.svg" alt="basket">
            <div class="cart-block" v-show="showCart">
                <p v-if="!cartItems.length">Корзина пуста</p>
                <cart-item class="cart-item" 
                v-for="item of cartItems" 
                :key="item.id_product"
                :cart-item="item">
                </cart-item>
                <hr>
                <div class="summ">
                    <div class="summRightPart">
                        <h1>Итого:</h1>
                    </div>
                    <div class="summLeftPart">
                        <h1>{{getSumm()}} руб.</h1>
                        <p>за {{getCount()}} шт.</p>
                    </div>
                    </div>
                    <button class="order" @click="$emit('switch-page', 'CartPage'), $root.$refs.cartPage.getCart(cartItems)">Заказать</button>
            </div>
        </div>`
});

Vue.component('cart-item', {
    props: ['cartItem'],
    template: `
                <div class="cart-item">
                <div class="cart">
                    <img class="imageCart" :src="cartItem.image" alt="Some image">
                    <p>{{cartItem.product_name}}</p>
                    <h1>{{cartItem.price}}<br>руб</h1>
                    <p>x{{cartItem.count}}</p>
            </div>
            </div>
    `
});
