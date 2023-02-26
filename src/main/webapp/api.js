export const  token = (new URLSearchParams(window.location.search)).get("jwt")
export const url = '/api/v1/'
// export const url =  'http://localhost:8383/api/v1/';
// export const  token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJndWVzdEBsYW1pc3BsdXMub3JnIiwiYXV0aCI6IlN1cGVyIEFkbWluIiwibmFtZSI6Ikd1ZXN0IEd1ZXN0IiwiZXhwIjoxNjc3NDEyNDIzfQ.z44b4olkOMFFYhIsk18ib_o9DLBpcxGpvpKfs5OFys0cAlcPA0vU76_M-Co3D7mKJWTTG_UuaNkaBhQ0lrlT2g'