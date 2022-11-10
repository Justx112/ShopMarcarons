Vue.component('products', {
    data(){
        return {
            catalogUrl: '',
            products: [],
            filtered: [],
        }
    },
    methods: {
        filter(value){
            let regexp = new RegExp(value, 'i');
            this.filtered = this.products.filter(el => regexp.test(el.product_name));
        },
        setCount(product, count){
            product.count = count
        },
        switchPage(){
            this.$emit('switch-page', "ProductPage");
        }
    },
    mounted(){
        this.$parent.getJson('/api/products')
            .then(data => {
                for(let el of data){
                    this.products.push(el);
                    this.filtered.push(el);
                }
            });
    },
    template: `
        <div class="products">
            <product ref="refref" v-for="item of filtered" :key="item.id_product" :product="item" @ProductPage="switchPage"></product>
        </div>
    `
});
Vue.component('product', {
    data(){
        return{
            count: 0,
        }
    },
    methods:
    {
        increase(product){
            this.count+=1;
            product.count = this.count;
        },
        lower(product){
            this.count = this.count == 0 ? 0 : this.count - 1;
            product.count = this.count;
        },
        reset(){
            this.count = 0;
        }
    },
    props: ['product'],
    template: `
    <div class="product_box">
            <div class="card">
                <img class="product_img" v-bind:src="product.image" @click="$emit('ProductPage'), $root.$refs.productPage.getCart(product)" alt="">
                <p class="description_card">{{product.product_name}}</p>
                <p class="cost">{{product.price}} P.</p>
                <div class="infoForBuy">
                <div class="counter_product">
                    <button @click=lower(product)>-</button>
                    <input v-model="count" type="numbers">
                    <button @click="increase(product)">+</button>
                    </div>
                <button v-if="count > 0" class="addToCard" @click="$root.$refs.cart.addProduct(product, count);reset()">Добавить в корзину</button>
                </div>
            </div>
        </div>
    `
});
