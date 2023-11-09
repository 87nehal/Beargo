<template>
  <div>
    <div class="flex items-center flex-shrink-0 p-4 pb-0">
      <div class="flex w-12 items-top">
        <img :src="props.user?.profileImage" alt="" class="inline-block w-10 h-10 rounded-full">
      </div>
      <div class="w-full p-2">
        <textarea v-model="text" 
        class="w-full h-10 text-lg text-gray-900 placeholder:text-gray-400 bg-transparent border-0 dark:text-white focus:ring-0"
      :placeholder="props.placeholder"
        />
      </div>
    </div>
    <!--File Selector-->
    <div class="p-4 pl-16">
      <img :src="inputImageUrl" v-if="inputImageUrl" alt=""
      class="rounded-2xl border" :class="borderColor"/>
      <input type="file" ref="imageInput"  hidden
          accept="image/png, image/jpg, image/gif, image/jpeg"
          @change="handelImageChange"
      />
    </div>
    <!--Stock Select-->
    <SidebarRightPreviewCardsItems class="pl-16 space-y-4" v-show="showStockSelect">
        <UIInput v-model="searchQuery" placeholder="Search stocks" class="flex-grow" />
        <div class="w-full p-2 border rounded-md overflow-auto max-h-20 dark:bg-slate-300">
          <div v-for="stock in filteredStocks" :key="stock" @click="selectStock(stock)">
            {{ stock }}
          </div>
        </div>
      <div class="flex justify-between">
        <div>
          <h2 class="font-bold text-gray-800 text-md dark:text-white">
            {{ selectedStock }}
          </h2>
          <p :class="['text-xs','font-semibold', selectedStockPrice.price > selectedStockPrice.prevClose ? 'text-green-500' : 'text-red-500']">
            ${{ selectedStockPrice.price }}
          </p>
        </div>
        <UIInput v-model="predictionPriceString" :placeholder="selectedStockPrice.price.toString()"/>
      </div>
    </SidebarRightPreviewCardsItems>
    <div class="flex p-2 pl-14 justify-between items-center">
      <div class="flex">
        <div @click="handleImageClick" class="p-2 text-prime-0 rounded-full hover:bg-blue-50 dark:hover:bg-dim-800">
          <svg viewBox="0 0 24 24" class="w-5 h-5" fill="currentColor">
                  <g>
                      <path
                          d="M19.75 2H4.25C3.01 2 2 3.01 2 4.25v15.5C2 20.99 3.01 22 4.25 22h15.5c1.24 0 2.25-1.01 2.25-2.25V4.25C22 3.01 20.99 2 19.75 2zM4.25 3.5h15.5c.413 0 .75.337.75.75v9.676l-3.858-3.858c-.14-.14-.33-.22-.53-.22h-.003c-.2 0-.393.08-.532.224l-4.317 4.384-1.813-1.806c-.14-.14-.33-.22-.53-.22-.193-.03-.395.08-.535.227L3.5 17.642V4.25c0-.413.337-.75.75-.75zm-.744 16.28l5.418-5.534 6.282 6.254H4.25c-.402 0-.727-.322-.744-.72zm16.244.72h-2.42l-5.007-4.987 3.792-3.85 4.385 4.384v3.703c0 .413-.337.75-.75.75z">
                      </path>
                      <circle cx="8.868" cy="8.309" r="1.542"></circle>
                  </g>
          </svg>
        </div>
        <div @click="handleStockClick" class="p-2 text-prime-0 rounded-full hover:bg-blue-50 dark:hover:bg-dim-800">
          <svg viewBox="0 0 24 24" class="w-5 h-5" fill="currentColor">
                  <g>
                      <path
                          d="M20.222 9.16h-1.334c.015-.09.028-.182.028-.277V6.57c0-.98-.797-1.777-1.778-1.777H3.5V3.358c0-.414-.336-.75-.75-.75s-.75.336-.75.75V20.83c0 .415.336.75.75.75s.75-.335.75-.75v-1.434h10.556c.98 0 1.778-.797 1.778-1.777v-2.313c0-.095-.014-.187-.028-.278h4.417c.98 0 1.778-.798 1.778-1.778v-2.31c0-.983-.797-1.78-1.778-1.78zM17.14 6.293c.152 0 .277.124.277.277v2.31c0 .154-.125.28-.278.28H3.5V6.29h13.64zm-2.807 9.014v2.312c0 .153-.125.277-.278.277H3.5v-2.868h10.556c.153 0 .277.126.277.28zM20.5 13.25c0 .153-.125.277-.278.277H3.5V10.66h16.722c.153 0 .278.124.278.277v2.313z">
                      </path>
                  </g>
          </svg>
        </div>
      </div>
      <div class="mx-10">
        <UIButton size="lg" :disabled="isDisabled" 
        @onClick="handelPostSubmit">
          Post
        </UIButton>
      </div>
    </div>
  </div>
</template>



<script setup>
const{borderColor} = userTailwindConfig()
const imageInput = ref()
const selectedFile = ref(null)
const inputImageUrl = ref(null)
const emits = defineEmits(['onSubmit'])
const text = ref('')
const { getStockData } = useExtra()
const predictionPrice = ref(0.0)

const props = defineProps({
  user:{
      type: Object,
      required: true
  },
  placeholder:{
    type:String,
    required:true
  }
})

const predictionPriceString = computed({
  get: () => predictionPrice.value.toString(),
  set: (newValue) => { predictionPrice.value = parseFloat(newValue) }
})

function handelPostSubmit (){
  let postText = text.value;
  if (selectedStock.value && predictionPrice.value) {
    postText += `
<stock>
<name>${selectedStock.value}</name>
<curr>${selectedStockPrice.value.price}</curr>
<pred>${predictionPrice.value}</pred>
</stock>`;
  }
  emits('onSubmit',{
      text: postText,
      mediaFiles: [selectedFile.value]
  })
}

function handleImageClick(){
  imageInput.value.click()
  showStockSelect.value = !showStockSelect.value
}

function handelImageChange(event){
  const file = event.target.files[0]

  selectedFile.value = file
  const reader = new FileReader()
  reader.onload = (event) =>{
      inputImageUrl.value = event.target.result
  }
  reader.readAsDataURL(file)
}
const isDisabled = computed(()=>text.value==='')

const allStocks = ['AAPL', 'GOOGL', 'MSFT', 'AMZN', 'TSLA', 'NFLX', 'NVDA', 'FB', 'INTC', 'PYPL', 'CMCSA', 'PEP', 'CSCO', 'ADBE', 'AMGN', 'AVGO', 'TXN', 'QCOM', 'GILD', 'SBUX', 'AMD', 'ADP', 'ATVI', 'BIIB', 'BKNG', 'BIDU', 'CELG', 'CERN', 'CHTR', 'CTAS', 'CTSH', 'CMG', 'COST', 'CSX', 'DISH', 'DLTR', 'EA', 'EBAY', 'EXPE', 'FAST', 'FISV', 'FOX', 'FOXA', 'GILD', 'HAS', 'HSIC', 'IDXX', 'ILMN', 'INCY', 'ISRG', 'JBHT', 'KLAC', 'LBTYA', 'LBTYK', 'LRCX', 'MAR', 'MCHP', 'MDLZ', 'MNST', 'MU', 'MXIM', 'MYL', 'NTAP', 'NTES', 'NVDA', 'ORLY', 'PAYX', 'PCAR', 'PDD', 'PEP', 'PYPL', 'QCOM', 'REGN', 'ROST', 'SBUX', 'SIRI', 'SNPS', 'SPLK', 'SWKS', 'TMUS', 'TSLA', 'TXN', 'ULTA', 'VRSK', 'VRSN', 'VRTX', 'WBA', 'WDAY', 'WDC', 'WLTW', 'XEL', 'XLNX', 'ZM'];
let searchQuery = ref('');
let selectedStock = ref("Stock");
let selectedStockPrice = ref({price:0});

let filteredStocks = computed(() => {
  if (searchQuery.value) {
    return allStocks.filter(stock => stock.includes(searchQuery.value.toUpperCase()));
  } else {
    return allStocks;
  }
});

async function selectStock(stock) {
  selectedStock.value = stock;
  selectedStockPrice.value = await fetchStockPrice(stock)
}

async function fetchStockPrice(symbol){
        try {
            const response = await getStockData({
                symbol: symbol
            })
            if (response.response && response.response['c'] && response.response['pc']) {
              const price = await response.response['c']
              const prevClose = response.response['pc']
              predictionPrice.value=price
              return {price: price ,prevClose: prevClose}
            } else {
                console.error(`Error fetching ${symbol}: ${JSON.stringify(response)}`)
            }
        } catch (error) {
            console.error(`Error fetching ${symbol}: ${error}`)
  }
}

const showStockSelect = ref(false)

function handleStockClick() {
  showStockSelect.value = !showStockSelect.value
}
</script>