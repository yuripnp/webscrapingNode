const axios = require('axios');
const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');
const { resolve } = require('path');



const base_url = [
    {key: 'roma_news', value: 'https://www.romanews.com.br/'},
    {key: 'g1_pa', value: 'https://g1.globo.com/pa/para/'},
    {key: 'g1_esport', value: 'https://ge.globo.com/pa/'},
    {key: 'diario_online', value: 'https://dol.com.br/?d=1'},
]


const main = () => {

    /*
    [laço para iterar as urls e junto copm suas regras de extração]
    */


    for (let i = 0; i < base_url.length; i++) {

        if(base_url[i].key === "roma_news") { // Roma News

            const browserHeaders = {
                'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.107 Safari/537.36'
            }
            /*
            [Função para escrever o arquivo html]
            */
            const writeToFile = (data, filename) => {
                const promiseCallback = (resolve, reject) => {
                    fs.writeFile(filename, data, (error) => {
                        if (error) {
                            reject(error)
                            return;
                        }
                        resolve(true)
                    })
                }

                return new Promise(promiseCallback)
            };
            /*
            [Função para pegar a url]
            */
            const getPage = (arquivo) => {

                const options = {
                    headers: browserHeaders
                };
                console.log(base_url[i])
                return axios.get(base_url[i]).then((response) => response.data)
            };
            /*
            [função para salvar o arquivo]
            */
            const getCachePage = (arquivo) => {
                const filename = `sites/${arquivo}.html`;
                const promiseCallback = async (resolve, reject) => {
                        const html = await getPage(arquivo)
                        writeToFile(html, filename)
                        resolve(html)
                        return;
                }
                return new Promise(promiseCallback)
            };
            /*
            [salvar os arquivos em formato JSON]
            */
            const saveData = (data, path) => {

                const promiseCallback = async (resolve, reject) => {
                    const dataStore = JSON.stringify({ RomaData: data }, null, 2)
                    const created = await writeToFile(dataStore, path);

                    resolve(true)
                }

                return new Promise(promiseCallback)

            };
            /*
            [Pegar os itens do html]
            */
            const getPageItems = (html) => {

                const $ = cheerio.load(html)
                const promiseCallback = (resolve, reject) => {


                    const arrayNoticias = []
                    $('div.swiper-slide').each((i, e) => {

                        const link = $(e).find('div.swiper-slide > a').attr('href')
                        const titulo = $(e).find('div.swiper-slide > a.vitrineArea > div.titulos > h3').text()
                        const img = $(e).find('div.swiper-slide > a.vitrineArea > img').attr('src')

                        arrayNoticias.push({ link, titulo, img });
                    });




                    resolve(arrayNoticias)
                }




                return new Promise(promiseCallback)

            };


            let arquivo = 'romanews'
            getCachePage(arquivo).then(getPageItems).then((data) => saveData(data, './roma.json')).then(console.log).catch(console.error);
        } // fim do if do romanews

        if(base_url[i].key === "g1_pa") { // globo PA
            const browserHeaders = {
                "user- agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36(KHTML, like Gecko) Chrome / 92.0.4515.131 Safari / 537.36"
            }
            /*
            [Função para escrever o arquivo html] class
            */
            const writeToFile = (data, filename) => {
                const promiseCallback = (resolve, reject) => {
                    fs.writeFile(filename, data, (error) => {
                        if (error) {
                            reject(error)
                            return;
                        }
                        resolve(true)
                    })
                }

                return new Promise(promiseCallback)
            };
            /*
            [Função para pegar a url] class
            */
            const getPage = (arquivo) => {

                const options = {
                    headers: browserHeaders
                };
                console.log(base_url[i].value)
                return axios.get(base_url[i].value).then((response) => response.data)
            };
            /*
            [função para salvar o arquivo] class
            */
            const getCachePage = (arquivo) => {
                const filename = `sites/${arquivo}.html`;
                const promiseCallback = async (resolve, reject) => {
                    const html = await getPage(arquivo)
                    writeToFile(html, filename)
                    resolve(html)
                    return;
                }
                return new Promise(promiseCallback)
            };
            /*
            [salvar os arquivos em formato JSON] class
            */
            const saveData = (data, path) => {

                const promiseCallback = async (resolve, reject) => {
                    const dataStore = JSON.stringify({ G1Data: data }, null, 2)
                    const created = await writeToFile(dataStore, path);

                    resolve(true)
                }

                return new Promise(promiseCallback)

            };
            /*
            [Pegar os itens do html]
            */
            const getPageItems = (html) => {

                const $ = cheerio.load(html)
                const promiseCallback = (resolve, reject) => {


                    const arrayNoticias = []
                    const selector = '#\38 94ca688-17f3-439a-8b49-9c697fa1a785 > div > div.feed-post-body-title.gui-color-primary.gui-color-hover > div > a';
                    
                    $('div.feed-post-body').each((i, e) => {
                        const link = $(e).find('div.feed-post-body-title > div > a ').attr('href')
                        const titulo = $(e).find('div.feed-post-body-title > div > a').text()
                        const img = $(e).find('div.feed-media-wrapper > a.feed-post-figure-link > div.bstn-fd-item-cover > picture.bstn-fd-item-cover-picture > img').attr('src')
                        
                        arrayNoticias.push({link, titulo, img});
                    });




                    resolve(arrayNoticias)
                }




                return new Promise(promiseCallback)

            };

            let arquivo = 'globo';
            getCachePage(arquivo).then(getPageItems).then((data)=> saveData(data, 'g1.json')).then(console.log).catch(console.log)
            

        } // fim do if do g1 PA

        if(base_url[i].key === "g1_esport") { // globo esporte
            const browserHeaders = {
                "user- agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36(KHTML, like Gecko) Chrome / 92.0.4515.131 Safari / 537.36"
            }
            /*
            [Função para escrever o arquivo html] class
            */
            const writeToFile = (data, filename) => {
                const promiseCallback = (resolve, reject) => {
                    fs.writeFile(filename, data, (error) => {
                        if (error) {
                            reject(error)
                            return;
                        }
                        resolve(true)
                    })
                }

                return new Promise(promiseCallback)
            };
            /*
            [Função para pegar a url] class
            */
            const getPage = (arquivo) => {

                const options = {
                    headers: browserHeaders
                };
                console.log(base_url[i])
                return axios.get(base_url[i]).then((response) => response.data)
            };
            /*
            [função para salvar o arquivo] class
            */
            const getCachePage = (arquivo) => {
                const filename = `sites/${arquivo}.html`;
                const promiseCallback = async (resolve, reject) => {
                    const html = await getPage(arquivo)
                    writeToFile(html, filename)
                    resolve(html)
                    return;
                }
                return new Promise(promiseCallback)
            };
            /*
            [salvar os arquivos em formato JSON] class
            */
            const saveData = (data, path) => {

                const promiseCallback = async (resolve, reject) => {
                    const dataStore = JSON.stringify({ GeData: data }, null, 2)
                    const created = await writeToFile(dataStore, path);

                    resolve(true)
                }

                return new Promise(promiseCallback)

            };
            /*
            [Pegar os itens do html]
            */
            const getPageItems = (html) => {

                const $ = cheerio.load(html)
                const promiseCallback = (resolve, reject) => {


                    const arrayNoticias = []
                    $('div.feed-post-body').each((i, e) => {
                        const link = $(e).find('div.feed-post-body-title > div > a ').attr('href')
                        const titulo = $(e).find('div.feed-post-body-title > div > a').text()
                        const img = $(e).find('div.feed-media-wrapper > a.feed-post-figure-link > div.bstn-fd-item-cover > picture.bstn-fd-item-cover-picture > img').attr('src')

                        arrayNoticias.push({ link, titulo, img });
                    });

                    resolve(arrayNoticias)
                }




                return new Promise(promiseCallback)

            };
            
            let arquivo = 'globoEsporte'
            getCachePage(arquivo).then(getPageItems).then((data) => saveData(data, 'ge.json')).then(console.log).catch(console.log)

        } // fim do if do globo esporte

        if(base_url[i].key === "diario_online") {  // diario online
            const browserHeaders = {
                'user-agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.131 Safari/537.36'           
             }
            /*
            [Função para escrever o arquivo html]
            */
            const writeToFile = (data, filename) => {
                const promiseCallback = (resolve, reject) => {
                    fs.writeFile(filename, data, (error) => {
                        if (error) {
                            reject(error)
                            return;
                        }
                        resolve(true)
                    })
                }

                return new Promise(promiseCallback)
            };
            /*
            [Função para pegar a url]
            */
            const getPage = (arquivo) => {

                const options = {
                    headers: browserHeaders
                };
                console.log(base_url[i])
                return axios.get(base_url[i]).then((response) => response.data)
            };
            /*
            [função para salvar o arquivo]
            */
            const getCachePage = (arquivo) => {
                const filename = `sites/${arquivo}.html`;
                const promiseCallback = async (resolve, reject) => {
                    const html = await getPage(arquivo)
                    writeToFile(html, filename)
                    resolve(html)
                    return;
                }
                return new Promise(promiseCallback)
            };
            /*
            [salvar os arquivos em formato JSON]
            */
            const saveData = (data, path) => {

                const promiseCallback = async (resolve, reject) => {
                    const dataStore = JSON.stringify({ DolData: data }, null, 2)
                    const created = await writeToFile(dataStore, path);

                    resolve(true)
                }

                return new Promise(promiseCallback)

            };
            /*
            [Pegar os itens do html]
            */
            const getPageItems = (html) => {

                const $ = cheerio.load(html)
                const promiseCallback = (resolve, reject) => {


                    const arrayNoticias = []
                    $('body').each((i, e) => {

                        //const titulo = $(e).find('div.swiper-slide > a > div.dol-title-slide > h2').text()
                        //const img = $(e).find('div.swiper-slide > a > div.mw-wrapper > img').attr('data-src')

                        arrayNoticias.push({link});
                    });
                    let caminho ='body > section:nth-child(21) > div > div > div:nth-child(1) > div.col-md-12.mw-pad-0.mw-m-b-0 > div > div.swiper-wrapper > div:nth-child(1) > a'




                    resolve(arrayNoticias)
                }




                return new Promise(promiseCallback)

            };


            let arquivo = 'diarioOnline'
            getCachePage(arquivo).then(getPageItems).then((data) => saveData(data, './dol.json')).then(console.log).catch(console.error);
        }
        






    } // laço com iterações das urls
} // metodo principal main que chama todas as urls

main();



