let fs=require("fs");
let path=require("path");
let x=process.argv.slice(2);
let des=path.join(x[0],'garv');
if(!fs.existsSync(des))
{
    fs.mkdirSync(des);    
}
let types={
    media:["mp4","mkv","png","jpg"],
    archives:['zip','7z','rar','tar','gz','ar','iso','xz'],
    documents:['docx','doc','pdf','xlsx','xls','odt','odf','ods','odf','txt','ps'],
    app:['exe','dmg','pkg',"deb"]
}
organize(x[0],des);

function organize(src, d)
{
    let childName=fs.readdirSync(src);
    for(let i=0;i<childName.length;i++)
    {
        let ad=path.join(src,childName[i]);
        if(fs.lstatSync(ad).isFile()==true)
        {
            let getc=getExt(ad);
            let de=path.join(d,getc);
            if(!fs.existsSync(de) && getc!="others")
            {
                fs.mkdirSync(de);    
            }
            if(fs.existsSync(de))
            {
                let rt=path.join(de,childName[i]);
                fs.copyFileSync(ad,rt);
                fs.unlinkSync(ad);
            }
        }
    }
}
function getExt(ad)
{
    let ext="";
    let j=ad.length-1;
    while(ad[j]!=".")
    {
        ext+=ad[j];
        j--;
    }
    ext=reverse(ext);
    for(let type in types)
    {
        let typeArray=types[type];
        for(let i=0;i<typeArray.length;i++)
        {
            if(ext==typeArray[i])
            {
                return type;
            }
        }
    }
    return "others";
        
}
function reverse(s){
    return s.split("").reverse().join("");
}