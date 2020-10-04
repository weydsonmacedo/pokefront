import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PokemonComponent } from './pokemon.component';
import {MatTableModule} from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { PokemonService } from 'app/service/pokemon.service';
import { MatPaginatorModule } from '@angular/material/paginator';



@NgModule({
  declarations: [PokemonComponent],
  imports: [
    CommonModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    
  ],
  providers: [
    PokemonService
  ]
})
export class PokemonModule { }
