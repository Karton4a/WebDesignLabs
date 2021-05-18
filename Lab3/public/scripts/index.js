

let res = document.getElementById('resultLink')
let input = document.getElementById('shortLink')
document.getElementById('shortenButton').addEventListener('click',(ev)=>{
    if(input.value !== "") {
        axios.get('/getShort',{
            params: {
                link: input.value
            }
          })
        .then((response)=>{
            console.log(response.data)
            res.innerText = window.location.host+'/'+response.data;
        })
    }
})