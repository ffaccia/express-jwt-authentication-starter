var request = require('request');

const do_request = () => {
    request({
        headers: {
            Authorization: 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MzAxNGIxMjQzOGMxNDM3OWU1YmUzNmEiLCJpYXQiOjE2NjExMTY5OTg5NDIsImV4cCI6MTY2MTExNzA4NTM0Mn0.lTOHU-NW-nH_b9KC_yz8pBlF91gMeIZbycKfEyMc2CnFjsfwMkEN4I2yCOGjlno_JQhu3PdHGoD-DYveOEXXX6iokFPE93NIpZbhK3MQrz_G899HuNpdxRAaqnzpRIErlZMtuw2roX5Ztch0s9Z3xkxz4EqmCyREN1EbSEDlVPQqUh5oFJ4s3bXBsTJy4P-tCMGRkJvv873PcCDAqa1jCJKR_PuoICoWhx7oIQx17c5nLU6gCSKM7ky86YeBlecpem4bbZaSpLhvnY9mZ0sBzkEXqhiGSh7GultfxYDKG8tP26mAs6NPfdWfpx3JxKEHzCsdwfJ3ebZyWFXygzA6jMelxcNmbiZ9PM5wgVRmZN-SvGOno5KwDGc8kBfvHIJLJAfYh9itfQlft0R7nasvVxZHCvrl-mYvMclccXxMr0NTLxNjAblTAiTlsMPg66GzPryQ_GQDzL9S7db-VrN3_-zjvsRrtl2tT8xtDY8MiQR2S7Nm0W5g2Updodq1r4lOw9KyzdwJy4eWnXsRCJmRJ8mSddAbqBIRUbUBg5hJJuiMpoRNcgUgL_WPYeCukTfihyzOeK5RXcu_SSgUPuYjq7cxIb9R9Dr44FypcOMhpy1GPn5bS-gWS7E_XiP9G4Sng4HeT94wEvlcVnjEw6PYY6emGHALabvocakl9j8-9Hc'  
        },
        uri: 'http://localhost:3000/users/protected',
        //body: formData,
        method: 'GET'
    }, function (err, res, body) {
        if (err)
            console.log("errore---:", err)
        else {
            /*const keys = Object.keys(res);
            keys.forEach((key, index, value) => {
                console.log(`conv ${key}: ${index} ${value}`);
            });
            */
            const obj = JSON.parse(JSON.stringify(res))
            console.log(obj)
        } 
    
    })        
}

exports.do_request = do_request

