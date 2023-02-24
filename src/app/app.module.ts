import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { SearchComponent } from './components/search/search.component';
import { ArtistComponent } from './components/artist/artist.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';

// Routes definition
import { ROUTES } from './app.routes';
import { NoImagePipe } from './pipes/no-image.pipe';
import { CardsComponent } from './components/shared/cards/cards.component';
import { LoadingComponent } from './components/shared/loading/loading.component';

//services
// import { SpotifyService } from './services/spotify.service';

//Pipes
import { DomseguroPipe } from './pipes/domseguro.pipe';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        SearchComponent,
        ArtistComponent,
        NavbarComponent,
        NoImagePipe,
        CardsComponent,
        LoadingComponent,
        DomseguroPipe
    ],
    imports: [
        BrowserModule,
        RouterModule.forRoot(ROUTES, { useHash: true }),
        HttpClientModule
    ],
    providers: [
        // SpotifyService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
