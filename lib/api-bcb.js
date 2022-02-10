const axios = require('axios')
const getUrl = data => `https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarDia(dataCotacao=@dataCotacao)?@dataCotacao=%27${data}%27&$top=100&$skip=0&$format=json&$select=cotacaoCompra,cotacaoVenda,dataHoraCotacao`

const getCotacaoAPI = url => axios.get(url)
const extractCotacao = res => res.data.value[0].cotacaoVenda

const getToday = () => {
    const todayBR = new Date().toLocaleDateString('pt-BR')
    //TodayBR -> 09/02/2022
    const today = todayBR.split('/')
    //today -> [ '09', '02', '2022' ]
    // Para poder organizar em mês (02) - dia (09) - ano (2022)
    return today[1] + '-' + today[0] + '-' + today[2]

}
const getCotacao = ({ getToday, getUrl, getCotacaoAPI, extractCotacao }) => async () => {
    try {
        const today = getToday()
        console.log(today)
        const url = getUrl(today)
        const res = await getCotacaoAPI(url) //'02-03-2022'
        const cotacao = extractCotacao(res)
        return cotacao
    } catch (err) {
        console.log(err)
        return ''
    }
}

module.exports = {
    getCotacaoAPI,
    getCotacao: getCotacao({ getToday, getUrl, getCotacaoAPI, extractCotacao }),
    extractCotacao,
    getUrl,
    getToday,
    pure: {
        getCotacao
    }
}

