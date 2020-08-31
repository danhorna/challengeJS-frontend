import axios from 'axios';

export async function comprobarLogin(){
    var data;

    var tokenls = localStorage.getItem("loginToken");
            if (tokenls != null){
                await axios.post('http://localhost:3000/api/users/check', {tokenls})
                    .then(res =>{
                        if (res.data.done){
                            console.log('qsyo')
                            data = res.data;
                        } else {
                            data = res.data
                        }
                    })
            }else {
                data = null
            }
    return await data;
}