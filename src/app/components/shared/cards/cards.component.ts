import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-cards',
    templateUrl: './cards.component.html',
    styles: [
    ]
})
export class CardsComponent implements OnInit {

    @Input() items: any[] = [];

    constructor(private _router: Router) { }

    ngOnInit(): void {
    }

    viewArtist(item: any) {

        let id: string = '';

        if (item.type == 'artist') {
            id = item.id;
        }

        if (item.type == 'album') {
            id = item.artists[0].id;
        }

        this._router.navigate(['/artist', id]);
    }
}
