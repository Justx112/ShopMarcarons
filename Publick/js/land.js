Vue.component('land', {
    data() {
        return {
            catalogUrl: '',
            products: [],
        }
    },
    template: `
        <section>
            <div class="discription">
                <div class="text">
                    <h1>MACARONS</h1>
                    <p>Такие воздушные, с нежной и потрясающе вкусной начинкой макаруны.</p>
                    <button class="button">Заказать</button>
                </div>
                <div class="leftImage">
                    <img src="images/klipartz.com - 2022-04-18T162716 1.png" alt="">
                </div>
            </div>
        </section>
    `
});
