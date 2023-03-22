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

    }

    searchArtist(searchValue: any) {

        this.loading = true;

        this._spotifyService.searchArtist(searchValue)
            .subscribe((data: any) => {
                this.artists = data;
                this.loading = false;
            });
    }

    ngOnInit(): void {
    }
}
