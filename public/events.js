//import axios from 'axios';
//import axios from '../node_modules/axios/index.js'; 


const enterProtected = async (e) => {
  e.preventDefault();
  console.log("entrato dentro protected")
  const headerOptions = {
    headers: { 
      Authorization: window.localStorage.getItem("key-passport-2022")  
  }  
  }
  try {
    //const {
    //  data: { info }
    //} = await axios.get(`http://localhost:3000/users/protected`, headerOptions)
    await axios.get(`http://localhost:3000/users/protected`, headerOptions)
      .then((data) => {
        console.log("ecco i dati: "+data.data.message)
        console.log("ecco gli header: "+data.data.Authorization)

        window.localStorage.setItem("passport-key", data.data.Authorization)
        //console.log("ecco gli res: "+data.data.res)
      })
      .catch((error) => console.log("ecco errore: "+error))
    //const { _id: taskID, completed, name } = task
    //taskIDDOM.textContent = taskID
    //taskNameDOM.value = name
    //tempName = name
    //console.log(data)


  } catch (error) {
    console.log(error)
  }
}


const submitForm = async (e) => {
  e.preventDefault();
  console.log("entrato dentro submit form")
  var host = 'http://localhost:3000'
  var url = '/users/login'

  let headers= {
    'Accept': 'application/json, text/plain, */*',
    'Host': `${host}${url}`,
    'User-Agent': 'axios/0.21.1',
    'Content-type': 'application/json'
  }
  let password = document.querySelector("input[type='password']").value
  let username = document.querySelector("input[name='username']").value
  let payload = { username: username, password: password };

  try {

    //const {
    //  data: { info }
    //} = await axios.get(`http://localhost:3000/users/protected`, headerOptions)
    //await axios.post(`${host}${url}`, payload, headers)
    await axios.post(`${headers['Host']}`, payload, headers)
      .then((response) => {
        console.log(response)
        console.log("eeeee")
        console.log(response.data)
        //const res = JSON.parse(response);
        if (response.data.success && response.data.token)
            window.localStorage.setItem('key-passport-2022', response.data.token)
      })
      .catch((error) => console.log("ecco errore: "+error))


    async function doPostRequest() {

      let res = await axios.post('http://httpbin.org/post', payload);
  
      let data = res.data;
      console.log(data);
    }
  
  //doPostRequest();
  } catch (error) {
    console.log(error)
  }
}

document.querySelector("a#protected").addEventListener("click", enterProtected);

document.querySelector("form#login_form").addEventListener("submit", submitForm);

  
