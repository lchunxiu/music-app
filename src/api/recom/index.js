import conmonParams from '../config'
import jsonp from 'common/js/jsonp'
let getRecom = async ()=>{
    let url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg',
        params = Object.assign({},conmonParams);
    let result = await jsonp(url,params,{param:'jsonpCallback'});
    if(result.code === 0){
        return result.data;
    }
}


export {
    getRecom
};