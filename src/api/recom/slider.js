import conmonParams from '../config'
import jsonp from 'common/js/jsonp'
export default ()=>{
    let url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg',
        params = Object.assign({},conmonParams);
    jsonp(url,params).then((data)=>{
        console.log(data)
    }).catch(err=>{

    })
}