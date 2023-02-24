import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styles: [
    ]
})
export class SearchComponent implements OnInit {

    artists: any[] = [];
    loading: boolean = false;

    constructor(private _spotifyService: SpotifyService) {
        console.log('search...');
    }

    searchArtist(searchValue: any) {

        this.loading = true;

        console.log('searching...');
        console.log(searchValue);

        this._spotifyService.searchArtist(searchValue)
            .subscribe((data: any) => {
                this.artists = data;
                this.loading = false;
                console.log(this.artists);
            });
    }

    ngOnInit(): void {
    }
}
