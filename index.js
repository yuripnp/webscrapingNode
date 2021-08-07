const axios = require('axios');
const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');
const { resolve } = require('path');



const base_url = [
    'https://www.romanews.com.br/',
    'https://g1.globo.com/pa/para/',
    'https://ge.globo.com/pa/',
    'https://dol.com.br/?d=1'
]


const main = () => {

    /*
    [laço para iterar as urls e junto copm suas regras de extração]
    */


    for(let i = 0; i < base_url.length;i++) {



        if (base_url[i] === 'https://www.romanews.com.br/') {

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
            [ler o arquivo para saber se ele existe]
            */
            const readFromFile = (filename) => {

                const promiseCallback = (resolve, reject) => {
                    fs.readFile(filename, 'utf8', (error, contents) => {
                        if(error) {
                            resolve(null)
                            return;
                        }

                        resolve(contents)
                    })
                }

                return new Promise(promiseCallback)
            }

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

                    const cacheHTML = await readFromFile(filename)
                    // verificar para saber se o arquivo já existe
                    if(!cacheHTML) {
                        const html = await getPage(arquivo)
                        writeToFile(html, filename)
                        resolve(html)
                        return;


                    }

                    resolve(cacheHTML)

                    
                }
                


                return new Promise(promiseCallback)
            }

                const saveData = (data, path) => {

                    const promiseCallback = async (resolve, reject) => {
                        const dataStore = JSON.stringify({RomaData: data}, null,2)
                        const created = await writeToFile(dataStore, path);

                        resolve(true)
                    }

                    return new Promise(promiseCallback)

                }

            const getPageItems = (html) => {

                const $ = cheerio.load(html)
                const promiseCallback = (resolve, reject) => {


                    const arrayNoticias = []
                    $('div.swiper-slide').each( (i, e) => {

                        const link = $(e).find('div.swiper-slide > a').attr('href')
                        const titulo = $(e).find('div.swiper-slide > a.vitrineArea > div.titulos > h3').text()
                        const img = $(e).find('div.swiper-slide > a.vitrineArea > img').attr('src')

                        arrayNoticias.push({link,titulo,img});
                    });


                    

                    resolve(arrayNoticias)
                }
                
                


                return new Promise(promiseCallback)

            }




           
            let arquivo = 'romanews'
            getCachePage(arquivo).then(getPageItems).then((data) => saveData(data, './roma.json')).then(console.log).catch(console.error);
        } // if do romanews


        

        

    } // laço com iterações das urls
} // metodo principal main que chama todas as urls

main();



