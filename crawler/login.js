// _token=xmYg0usrt0KE1NuO0nUUnh7qoXpETy5j9gYarlu9
// username=13533283769
// password=hongling369
// curl "https://www.otouzi.com/login/index" -H "User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:62.0) Gecko/20100101 Firefox/62.0" -H "Accept: application/json, text/javascript, */*; q=0.01" -H "Accept-Language: zh-CN,en-US;q=0.7,en;q=0.3" --compressed -H "Referer: https://www.otouzi.com/" -H "Content-Type: application/x-www-form-urlencoded; charset=UTF-8" -H "X-Requested-With: XMLHttpRequest" -H "Cookie: __jsluid=c4f74d9a81f3d87b9e2686c8c77fd4f8; open_account_show=yes; XSRF-TOKEN=eyJpdiI6Im1DUDRpVldYbStWaEFXenVnRWYrZVE9PSIsInZhbHVlIjoiaWZrU3o4TFAyWk5DbVlIbnFFOEtrR0tLSEs5UExlMHlFQVJpNXFrU2xXK3E1VWRrSlo1M2I4UlpNcXZVZDZXS3lBUFFFeDROdHhvT0hHSFwvRnpDQlRRPT0iLCJtYWMiOiI2Njc1ZjE3YjJiZTczODI4ODJiNmJiNzhjNTA4OTcyMjM3OGViZmNjNzdmMTlhY2E3NjkwMGExMGNlZWI3NTU4In0"%"3D; otz_session=eyJpdiI6ImRZRDdrSVZodWllaGY4NEZvYVwvUUlRPT0iLCJ2YWx1ZSI6ImtsQ2lUMjdBcjJ3MitaOXJLODdUU3dpa21aV2xVbGlUcTZcL1hURXl1UzQrRE5LMWJIa0VrNkR0Wlp3c0FtcDVoU0hWQTNEODJOdnREZXpYXC9DSDdnc1E9PSIsIm1hYyI6IjU1Njg4MzIzMWVmZWI1MjMzOWMzODM5MDVlMzg4Yzg1NzA3OGI2YzhmYmRmMjYxZTY3ZDVlMGVhNGYyOWIyYTYifQ"%"3D"%"3D" -H "DNT: 1" -H "Connection: keep-alive" --data "_token=xmYg0usrt0KE1NuO0nUUnh7qoXpETy5j9gYarlu9&username=13533283769&password=hongling369"
// _csrf_token = 'X9GCECQOnGs6r7OCO5r1dIaFSeLbCNGfd0oF23ov';
/* cookie.set('open_account_show', 'yes');
var rememberMe = $('[name=remember_me]').val();
var exDate = new Date();
if (rememberMe == 1) {
    expireDays = 86400 * 365;
    exDate.setDate(exDate.getDate() + expireDays);
    username = $('[name=username]').val();
    document.cookie = "username=" + decodeURI(username) + (expireDays == null ? "" : ";expires=" + exDate.toGMTString());
} else {
    expireDays = 1;
    exDate.setDate(exDate.getDate() - expireDays);
    username = '';
    document.cookie = "username=" + decodeURI(username) + (expireDays == null ? "" : ";expires=" + exDate.toGMTString());
}
window.location.reload(); */
const tough = require('tough-cookie');
const rp = require('request-promise');

// Easy creation of the cookie - see tough-cookie docs for details
let cookie = new tough.Cookie({
    key: "some_key",
    value: "some_value",
    domain: 'www.otouzi.com',
    httpOnly: true,
    maxAge: 31536000
});

// Put cookie in an jar which can be used across multiple requests
let cookiejar = rp.jar();
// cookiejar.setCookie(cookie, 'https://www.otouzi.com');
// ...all requests to https://api.mydomain.com will include the cookie

var options = {
  uri: 'https://www.otouzi.com/login/index',
  // jar: cookiejar, // Tells rp to include cookies in jar that match uri
  method: 'POST',
  body: {
    username: '13533283769',
    password: 'hongling369',
    _token:'xmYg0usrt0KE1NuO0nUUnh7qoXpETy5j9gYarlu9'
  },
  resolveWithFullResponse: true,
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:54.0)'
  },
};

rp(options)
  .then(function (res) {
    let newCookies =  undefined;
    if (res.headers['set-cookie'] instanceof Array){
      newCookies = res.headers['set-cookie'].map(tough.Cookie.parse);
    }
    else{
      newCookies = [tough.Cookie.parse(res.headers['set-cookie'])];
    }
      // Request succeeded...
  })
  .catch(function (err) {
      // Request failed...
  });
