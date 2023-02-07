export const  token = (new URLSearchParams(window.location.search)).get("jwt")
export const url = '/api/v1/'
// export const url =  'http://localhost:8383/api/v1/';
// export const  token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJndWVzdEBsYW1pc3BsdXMub3JnIiwiYXV0aCI6IlN1cGVyIEFkbWluIiwibmFtZSI6Ikd1ZXN0IEd1ZXN0IiwiZXhwIjoxNjc1ODIwNzgyfQ.Tu_4R275qAPCqbB4j2D1fBt3vjfaSHI-k2HC1z6yt-YslEyxDSAX1dwd--rRGvse84w344hkw9NmjrZYVF9UQQ'