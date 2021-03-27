
let token='';
let expire=0;

const myUrl ="http://localhost:3000/";
const clientId = '07ef9630d645424b9f0169aa8d9e6242';

let Spotify={
    getAccessToken() {
        if(token !== '') return token;
        else {
            console.log('get new token');
            const url= `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${myUrl}`;
            window.location=url;
            
            const urlBack = window.location.href;
         
            token = urlBack.match(/access_token=([^&]*)/)[1];
            expire = urlBack.match(/expires_in=([^&]*)/)[1];

            window.setTimeout(() => token = '', Number(expire) * 1000);
            window.history.pushState('Access Token', null, '/');
            return token;
        }
    },

    async search(term) {
        let res=[];
        const resp = await fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`,{
            headers: {Authorization: `Bearer ${this.getAccessToken()}`}
          })
        .then(response=>{
            if(response.ok) {
                return response.json();
            }
            throw new Error('Request failed!');
        }, networkError => {
            console.log(networkError.message);
            })
        .then(jsonResponse=> {
            let items = jsonResponse.tracks.items;
            
            for (let track of items) {
                res.push({
                    id:track.id,
                    name:track.name,
                    artist:track.artists[0].name,
                    album:track.album.name,
                    uri:track.uri
                });
                
            }
            console.log('done');
        });
        return res;
        
    }
};

export default Spotify;