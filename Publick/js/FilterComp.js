Vue.component('filter-el', {
    data() {
        return {
            userSearch: '',
            upHere: false,
        }
    },
    watch:
    {
        userSearch: function(newValue){
            if (newValue == "")
            {
                this.$root.$refs.products.filter(newValue)
            }
        }
    },
    template: `
            <form action="#" class="search-form" @mouseover="upHere = true" @mouseleave="upHere = false"  @submit.prevent="$parent.$refs.products.filter(userSearch)">
                <input v-if="upHere || userSearch" class="search-field" v-model="userSearch">
                <button class="btn-search" type="submit">
                    <img src="images/bytesize_search.svg" alt="search">
                </button>
            </form>
    `
});
