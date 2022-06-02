import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';

import { ChiaveComponent } from './chiave/chiave.component';
import { NominativoComponent } from './nominativo/nominativo.component';
import { kvaasService } from './teatro.service';

@NgModule({
  imports: [BrowserModule, FormsModule, HttpClientModule],
  declarations: [AppComponent, ChiaveComponent, NominativoComponent],
  bootstrap: [AppComponent],
  providers: [kvaasService],
})
export class AppModule {}
