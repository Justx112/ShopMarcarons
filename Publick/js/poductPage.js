Vue.component('productpage', {
    data() {
        return {
            product: {},
            count: 0,
        }
    },
    methods: {
        getCart(item) {
            this.product = item;
        },
    },
    template: `
        <div class="productpage">
            <img class="product_imgs" v-bind:src="product.image"></img>
            <div class="productInfo">
                <h1>{{product.product_name}}</h1>
                <p>{{product.price}} руб.</p>
                <p>{{product.discription}}</p>
                <div class="SetCount">
                <button @click="$root.$refs.cart.addProduct(product, 3)">3шт.</button>
                <button @click="$root.$refs.cart.addProduct(product, 6)">6шт.</button>
                <button @click="$root.$refs.cart.addProduct(product, 9)">9шт.</button>
                <input v-model="count" type="numbers">
                </div>
                <button class="addToCard" @click="$root.$refs.cart.addProduct(product, count)">В корзину</button>
            </div>
        </div>
        `
});

