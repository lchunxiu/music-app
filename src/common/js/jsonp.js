import jsonp from 'jsonp'

export default async function(url,params,options){
    /* 组装参数 */
    url += url.indexOf('?')>0?'&':'?';
    url += constructParams(params);
    console.log(url)
    /* 异步调用 */
    return new Promise((resolve,reject)=>{
        jsonp(url,options,(err,data)=>{
            if(err)reject(err);
            resolve(data);
        })
    })
}

/* 将对象的参数解析为字符串 */
function constructParams(params){
    let keys = Object.keys(params),
        res = '';
    keys.forEach(ele => {
        res += `${encodeURIComponent(ele)}=${encodeURIComponent(params[ele])}&`;
    });

    return res.substring(0, res.length-1);
}