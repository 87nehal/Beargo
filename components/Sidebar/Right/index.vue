<template>
    <div class="flex flex-col">
      <!--Stocks Card-->
      <SidebarRightPreviewCards title="Live Stock Prices" buttonText="Edit" @edit-clicked="openModal">
        <SidebarRightPreviewCardsItems v-for="stock in stocks">
            <div @click="handleStockClick(stock.symbol)">
                <h2 class="font-bold text-gray-800 text-md dark:text-white">
                    {{ stock.symbol }}
                </h2>
                <p :class="['text-xs','font-semibold', stock.price > stock.prevClose ? 'text-green-500' : 'text-red-500']">
                    ${{ stock.price }}
                </p>
            </div>
        </SidebarRightPreviewCardsItems>
      </SidebarRightPreviewCards>
      <!--Trends Card-->
      <SidebarRightPreviewCards title="Trending" buttonText="Show more" @edit-clicked="openTrendingPage">
          <SidebarRightPreviewCardsItems v-for="trend in trends">
              <div>
                  <h2 class="font-bold text-gray-800 text-md dark:text-white">
                      {{ trend.title }}
                  </h2>
                  <p class="text-xs text-gray-400">
                      {{ trend.count }}
                  </p>
              </div>
          </SidebarRightPreviewCardsItems>
      </SidebarRightPreviewCards>
      <!--People Card-->
        <SidebarRightPreviewCards title="Who to follow"  buttonText="Show more" @edit-clicked="openLeaderboardPage">
            <UserItem v-for="user in topUsersByFollowers" :key="user.id" :user="user" />
        </SidebarRightPreviewCards>
      
    </div>
    <UIModal :isOpen="modalOpen" @on-close="closeModal">
    <div class="relative">
        <div class="flex flex-col items-center space-y-4">
            <div class="w-full flex justify-between space-x-4">
                <UIInput v-model="searchTerm" placeholder="Search stocks" class="flex-grow" />
                <UIButton @onClick="searchStocks">
                    <MagnifyingGlassIcon class="w-4 h-4"/>
                </UIButton>
            </div>
            <div class="w-full p-2 border rounded-md overflow-auto max-h-40">
                <div v-for="stock in filteredStocks" :key="stock" class="flex items-center space-x-2">
                    <input type="checkbox" :value="stock" v-model="selectedStocks" :disabled="selectedStocks.length >= 3 && !selectedStocks.includes(stock)" class="form-checkbox h-5 w-5 text-prime-0" />
                    <label :class="{'text-prime-0': selectedStocks.includes(stock), 'text-center': true}">{{ stock }}</label>
                </div>
            </div>
                <UIButton @onClick="saveStocks" liquid>Save</UIButton>
        </div>
    </div>
  </UIModal>
</template>
  
<script setup>
    import { ref, onMounted,watch } from 'vue'
    import { MagnifyingGlassIcon } from "@heroicons/vue/24/outline"
    const {getTopFollows} = useExtra()
    const topUsersByFollowers = ref([]);

    const trends = ref([
        {
            title:'#Chaman',
            count:'18.8k Up'
        },
        {
            title:'#Aman',
            count:'12.7k Up'
        },
        {
            title:'#Shourya',
            count:'1.2k Up'
        }
    ])
    
    const allStocks = ['AAPL', 'GOOGL', 'MSFT', 'AMZN', 'TSLA', 'NFLX', 'NVDA', 'FB', 'INTC', 'PYPL', 'CMCSA', 'PEP', 'CSCO', 'ADBE', 'AMGN', 'AVGO', 'TXN', 'QCOM', 'GILD', 'SBUX', 'AMD', 'ADP', 'ATVI', 'BIIB', 'BKNG', 'BIDU', 'CELG', 'CERN', 'CHTR', 'CTAS', 'CTSH', 'CMG', 'COST', 'CSX', 'DISH', 'DLTR', 'EA', 'EBAY', 'EXPE', 'FAST', 'FISV', 'FOX', 'FOXA', 'GILD', 'HAS', 'HSIC', 'IDXX', 'ILMN', 'INCY', 'ISRG', 'JBHT', 'KLAC', 'LBTYA', 'LBTYK', 'LRCX', 'MAR', 'MCHP', 'MDLZ', 'MNST', 'MU', 'MXIM', 'MYL', 'NTAP', 'NTES', 'NVDA', 'ORLY', 'PAYX', 'PCAR', 'PDD', 'PEP', 'PYPL', 'QCOM', 'REGN', 'ROST', 'SBUX', 'SIRI', 'SNPS', 'SPLK', 'SWKS', 'TMUS', 'TSLA', 'TXN', 'ULTA', 'VRSK', 'VRSN', 'VRTX', 'WBA', 'WDAY', 'WDC', 'WLTW', 'XEL', 'XLNX', 'ZM'];
    const selectedStocks = ref(JSON.parse(localStorage.getItem('selectedStocks')) || allStocks.slice(0, 3))
    const stocks = ref([])
    const modalOpen = ref(false)
    const {getStockData} = useExtra()
    const fetchStockPrices = async () => {
        for (const symbol of selectedStocks.value) {
        try {
            const response = await getStockData({
                symbol: symbol
            })
            if (response.response && response.response['c'] && response.response['pc']) {
                const price = response.response['c']
                const prevClose = response.response['pc']
                const stockIndex = stocks.value.findIndex(stock => stock.symbol === symbol)
                if (stockIndex !== -1) {
                    stocks.value[stockIndex].price = price
                    stocks.value[stockIndex].prevClose = prevClose
                } else {
                    stocks.value.push({ symbol, price, prevClose })
                }
            } else {
                console.error(`Error fetching ${symbol}: ${JSON.stringify(response)}`)
            }
        } catch (error) {
            console.error(`Error fetching ${symbol}: ${error}`)
        }
        }
    }

    watch(selectedStocks, (newVal) => {
        if (newVal.length > 3) {
        selectedStocks.value = newVal.slice(0, 3);
        }
    });
    
    onMounted(async () => {
        fetchStockPrices()
        setInterval(fetchStockPrices, 60000) // update every minute

        const followersData = await getTopFollows()
        topUsersByFollowers.value = await followersData.users.slice(0, 3);
    })
    
    const handleStockClick = (symbol) => {
        useRouter().push({
        path: '/search',
        query: {
            q: symbol
        }
        })
    }
    
    function openModal() {
        modalOpen.value = true
    }
    
    function closeModal() {
        modalOpen.value = false
    }
    
    function saveStocks() {
        localStorage.setItem('selectedStocks', JSON.stringify(selectedStocks.value))
        closeModal()
        stocks.value = []
        fetchStockPrices()
    }
    const searchTerm = ref('')
        const filteredStocks = computed(() => {
        if (searchTerm.value) {
            return allStocks.filter(stock => stock.includes(searchTerm.value.toUpperCase()))
        } else {
            return allStocks
        }
    })

    function searchStocks() {
        selectedStocks.value = filteredStocks.value
    }

    function openTrendingPage() {
        useRouter().push({
            path: '/trends',
        })
    }
    function openLeaderboardPage() {
        useRouter().push({
            path: '/leaderboard',
        })
    }
</script>