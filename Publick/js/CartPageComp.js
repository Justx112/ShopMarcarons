Vue.component('cartpage', {
    data() {
        return {
            cartItems: [],
        }
    },
    methods: {
        getCart(cart){
            this.cartItems = cart;
        },
    },
    template: `
        <div class="cartPage">
        <cartPagebox ref="refref" v-for="item of cartItems" :key="item.id_product" :product="item"></cartPagebox>
        </div>
        `
});

Vue.component('cartPagebox', {
    data() {
        return {
            count: 0,
        }
    },
    props: ['product'],
    methods:{
    getSum(){
            return this.product.price * this.product.count;
    }},
    template: `
            <div class="cartCard">
                <img class="product_img_cart" v-bind:src="product.image" alt="">
                <p class="description_card_cart">{{product.product_name}}</p>
                <p class="cost_cart">{{product.price}} Pуб.</p>
                <p class="cart_count">x{{product.count}}</p>
                <p class="equal">=</p>
                <p class="SumCost">{{getSum()}}</p>
                <button class="addToCard" @click="$root.$refs.cart.deleteItem(product)">Удалить</button>
            </div>
    `
});
