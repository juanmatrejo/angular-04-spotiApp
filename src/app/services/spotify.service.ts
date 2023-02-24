import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
// @Injectable()
export class SpotifyService {

    constructor(private _httpClient: HttpClient) {
        console.log('_spotifyService ready!!');
    }

    getService(query: string) {

        const serviceBase: string = `https://api.spotify.com/v1/${query}`;
        const headers: HttpHeaders = new HttpHeaders({
            'Authorization': 'Bearer BQBhfTT_OyPcqpgUVypgaLgDQjWe7m_XAlS7plSOriq2TH4VJ4ygoByQ4fupSvnWnHHMaLxSJX2Jx28LlSYhQigfTnWyvrUDA4Tm0iVpYUUpHR0Ke3Ir'
        });

        return this._httpClient.get(serviceBase, { headers });
    }

    getNewReleases() {

        // const tokenParams:any  = {
        //     grant_type: 'client_credentials',
        //     client_id: 'd6b55734aa3f4b49af89ae8023b6c69e',
        //     client_secret: '4659ca881ead4eed81c45197f071db34'
        // };

        // let token: string;
        // this._httpClient.post('https://accounts.spotify.com/api/token', tokenParams)
        //     .subscribe((data: any) => {
        //         token = `${data.token_type} ${data.access_token}`;
        //         console.log(token);
        //     });

        return this.getService('browse/new-releases?limit=40')
            .pipe(map((data: any) => {
                return data['albums'].items;
            }));
    }

    searchArtist(searchValue: string) {

        console.log('service searching...');
        console.log(searchValue);

        let query: string = `search?q=${searchValue}&type=artist&limit=20`;

        return this.getService(query)
            .pipe(map((data: any) => data['artists'].items));
    }

    getArtist(id: string) {

        console.log(id);

        let query: string = `artists/${id}`;

        return this.getService(query);
        // .pipe((data: any) => data['artists'].items);
    }

    getTopTracks(id: string) {

        console.log('top serv');
        console.log(id);

        let query: string = `artists/${id}/top-tracks?market=MX`;

        return this.getService(query)
            .pipe((data: any) => {
                console.log(data);
                return data;
            });
    }
}
