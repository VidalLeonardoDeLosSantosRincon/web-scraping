import fetch from 'node-fetch';

export const getContries = async function(){
    const url = `https://en.wikipedia.org/wiki/ISO_3166-1_alpha-3`;
    const data = await fetch(url);
    const res = await data.text();
    return res;
}


