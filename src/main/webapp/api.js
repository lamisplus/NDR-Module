export const  token = (new URLSearchParams(window.location.search)).get("jwt")
export const url = '/api/v1/'
//  export const url =  'http://localhost:8282/api/v1/';
//  export const  token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJndWVzdEBsYW1pc3BsdXMub3JnIiwiYXV0aCI6IlN1cGVyIEFkbWluIiwibmFtZSI6Ikd1ZXN0IEd1ZXN0IiwiZXhwIjoxNjc1NzAwMzEwfQ.i2Z6hMVAAUdUjPkUD3AUJ3_mNHkaS5qX3wN91-AONXutEcrLc_9EFts8cD7giugWRiSH7NvOKxtLjGdhm50YeA'