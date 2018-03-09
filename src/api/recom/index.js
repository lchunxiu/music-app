import conmonParams from '../config'
import jsonp from 'common/js/jsonp'
let getRecom = ()=>{
    let url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg',
        params = Object.assign({},conmonParams);
    console.log('in')
    jsonp(url,params,{param:'jsonpCallback'}).then((data)=>{
        console.log(data)
    }).catch(err=>{
        console.log(err)
    })
}


export {
    getRecom
};