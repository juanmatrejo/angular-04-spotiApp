import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from '../../services/spotify.service';

@Component({
    selector: 'app-artist',
    templateUrl: './artist.component.html',
    styles: [
    ]
})
export class ArtistComponent implements OnInit {

    id: string = '';
    artist: any = {};
    topTracks: any ={};
    loading: boolean = true;
    loading2: boolean = true;

    constructor(private _activatedRoute: ActivatedRoute,
        private _spotifyService: SpotifyService) {

        _activatedRoute.params.subscribe(params => {
            this.id = params['id'];
            this.getArtist();
            this.getTopTracks();
        });
    }

    ngOnInit(): void {
    }

    getArtist() {
        return this._spotifyService.getArtist(this.id).subscribe(data => {
            this.artist = data;
            this.loading = false;
        });
    }

    getTopTracks() {
        return this._spotifyService.getTopTracks(this.id).subscribe((data: any) => {
            this.topTracks = data;
            this.loading2 = false;
        });
    }
}
