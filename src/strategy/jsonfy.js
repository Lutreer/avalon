var avalon = require('../seed/core')

module.exports = jsonfy

function jsonfy(obj, dirs) {
    var arr1 = []
//字符不用东西包起来就变成变量
    for (var i in obj) {
        var type = typeof obj[i]
        if (type === 'object') {
            if (i === 'props') {
                var arr2 = []
                for (var k in obj.props) {
                    var kv = obj.props[k]
                    if (typeof kv === 'string') {
                        kv = quote(kv)
                    }
                    arr2.push(fixKey(k) + ': ' + kv)
                }
                arr1.push(i + ': {' + arr2.join(',\n') + '}')

            }
        } else if (obj.hasOwnProperty(i)) {
            var v = obj[i]
            if (type === 'string') {
                v = quoted[i] ? quote(v) : v
            }
            arr1.push(fixKey(i) + ':' + v)
        }
    }
    var ret = '{' + arr1.join(',\n') + '}'
    if (dirs && dirs.length) {
        dirs.unshift(ret)
        ret = 'avalon.addDirs(' + dirs + ")"
    }
    return ret
}


var keyMap = avalon.oneObject("break,case,catch,continue,debugger,default,delete,do,else,false," +
        "finally,for,function,if,in,instanceof,new,null,return,switch,this," +
        "throw,true,try,typeof,var,void,while,with," + /* 关键字*/
        "abstract,boolean,byte,char,class,const,double,enum,export,extends," +
        "final,float,goto,implements,import,int,interface,long,native," +
        "package,private,protected,public,short,static,super,synchronized," +
        "throws,transient,volatile")

var quote = avalon.quote

var quoted = {
    nodeName: 1,
    template: 1,
    forExpr: 1,
    type: 1,
    nodeValue: 1,
    signature: 1,
    wid: 1
}

var rneedQuote = /[W\:-]/

function fixKey(k) {
    return (rneedQuote.test(k) || keyMap[k]) ? quote(k) : k
}

avalon.keyMap = keyMap



