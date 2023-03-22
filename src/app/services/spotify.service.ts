import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class SpotifyService {

    spotifyToken: SpotifyToken | null;

    constructor(private _httpClient: HttpClient) {

        this.spotifyToken = null;
    }

    getToken() {

        //https://developer.spotify.com/documentation/general/guides/authorization/
        //https://developer.spotify.com/documentation/general/guides/authorization/code-flow/
        //https://developer.spotify.com/console/browse/

        const headers: HttpHeaders = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

        const body: HttpParams = new HttpParams()
            .set('grant_type', 'client_credentials')
            .set('client_id', 'd6b55734aa3f4b49af89ae8023b6c69e')
            .set('client_secret', '4659ca881ead4eed81c45197f071db34');

        this._httpClient.post('https://accounts.spotify.com/api/token', body.toString(), { headers: headers })
            .subscribe({
                next: ((data: any) => {

                    this.spotifyToken = new SpotifyToken(data.token_type, data.access_token);
                    localStorage.setItem('spotifyToken', JSON.stringify(this.spotifyToken));
                }),
                error: ((err) => {

                    localStorage.removeItem('spotifyToken');
                })
            });
    }

    getService(query: string) {

        var token: string | null = localStorage.getItem('spotifyToken');

        if (token == null) {

            token = '';
            this.getToken();
        }
        this.spotifyToken = JSON.parse(token);

        let serviceBase: string = `https://api.spotify.com/v1/${query}`;
        const headers: HttpHeaders = new HttpHeaders().set('Authorization', `${this.spotifyToken?.token_type} ${this.spotifyToken?.access_token}`);

        return this._httpClient.get(serviceBase, { headers });
    }

    getNewReleases() {

        return this.getService('browse/new-releases?limit=40')
            .pipe(map((data: any) => {
                return data['albums'].items;
            }));
    }

    searchArtist(searchValue: string) {

        let query: string = `search?q=${searchValue}&type=artist&limit=20`;

        return this.getService(query)
            .pipe(map((data: any) => data['artists'].items));
    }

    getArtist(id: string) {

        let query: string = `artists/${id}`;

        return this.getService(query);
    }

    getTopTracks(id: string) {

        let query: string = `artists/${id}/top-tracks?market=MX`;

        return this.getService(query)
            .pipe((data: any) => {
                return data;
            });
    }
}

export class SpotifyToken {

    token_type: string;
    access_token: string;

    constructor(type: string, token: string) {
        this.token_type = type;
        this.access_token = token;
    }
}
