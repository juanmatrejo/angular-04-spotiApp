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

    constructor(public _spotifyService: SpotifyService) {

        this._spotifyService.getNewReleases().subscribe({
            next: (data) => {
                this.newAlbums = data;
                this.loading = false;
            },
            error: (errorService) => {
                this.errorMessage = errorService.error.error.message;
                this.error = true;
            },
            complete: () => { }
        });
    }

    ngOnInit(): void {
    }
}
