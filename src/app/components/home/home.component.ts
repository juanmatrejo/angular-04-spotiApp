import { Component, OnInit } from '@angular/core';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styles: [
    ]
})
export class HomeComponent implements OnInit {

    newAlbums: any[] = [];
    loading: boolean = true;
    error: boolean = false;
    errorMessage: string = '';

    constructor(private _spotifyService: SpotifyService) {

        this._spotifyService.getNewReleases().subscribe((data: any) => {
            console.log('albums gotten!!');
            this.newAlbums = data;
            this.loading = false;
            console.log(this.newAlbums);
        }, (errorService) => {
            console.log(errorService.error.error.message);
            this.errorMessage = errorService.error.error.message;
            this.error = true;
        });
    }

    ngOnInit(): void {
    }
}
