const axios = require('axios')
const getUrl = data => `https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarDia(dataCotacao=@dataCotacao)?@dataCotacao=%27${data}%27&$top=100&$skip=0&$format=json&$select=cotacaoCompra,cotacaoVenda,dataHoraCotacao`

const getCotacaoAPI = async url => await axios.get(url)
const extractCotacao = res => res.data.value[0].cotacaoVenda

const getToday = () => {
    const today = new Date()
    return (today.getMonth() + 1) + '-' + today.getDate() + '-' + today.getFullYear()

}
const getCotacao = ({ getToday, getUrl, getCotacaoAPI, extractCotacao }) => async () => {
    try {
        const today = getToday()
        console.log(today, 'today')
        const url = getUrl(today)
        console.log(url, 'url')
        const res = await getCotacaoAPI(url) //'02-03-2022'
        console.log(res, 'res')
        const cotacao = extractCotacao(res)
        console.log(cotacao)
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

