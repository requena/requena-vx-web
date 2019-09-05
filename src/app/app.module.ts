import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormControlDirective, FormsModule } from '@angular/forms';
import { NgPipesModule } from 'ngx-pipes';
import { CommonModule } from '@angular/common';

import { MatCardModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { MatAutocompleteModule, MatOptionModule, MatButtonModule } from '@angular/material';
import { CalculadoraComponent } from './pages/calculadora/calculadora.component';
import { DecimalPipe } from '@angular/common';
@NgModule({
  declarations: [
    AppComponent,
    CalculadoraComponent,
    FormControlDirective
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    NgPipesModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatOptionModule,
    MatButtonModule,
    CommonModule
  ],
  providers: [DecimalPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
