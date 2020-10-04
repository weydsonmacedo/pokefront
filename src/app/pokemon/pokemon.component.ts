import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { PokemonService } from 'app/service/pokemon.service';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', visibility: 'hidden' })),
      state('expanded', style({ height: '*', visibility: 'visible' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class PokemonComponent implements OnInit {
  dataSource = new MatTableDataSource<any[]>();
  dados = new MatTableDataSource();
  displayedColumns: string[] = [];
  columnNames;
  pageEvent: PageEvent;
  pageIndex:number;
  pageSize:number;
  length:number;

  expandedElement: any;
    isExpansionDetailRow = (i: number, row: Object) => row.hasOwnProperty('detailRow');

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  pokemons: any;



  constructor(private service: PokemonService) { }

  ngOnInit(): void {
    this.columns();
    this.pesquisar();
  }


 
  columns() {
    this.columnNames = [
      { id: 'Id', value: 'id' },
      { id: 'Name', value: 'name' },
      { id: 'Detalhar', value: 'url' },
    ];
    this.displayedColumns = this.columnNames.map(x => x.id);
  }

  pesquisar() {
    this.service.getPokemonList().subscribe(
      items => {
        this.pokemons = items;
        this.dados = new MatTableDataSource(this.mapData(this.pokemons.results));
        this.dados.sort = this.sort;
        this.dados.paginator = this.paginator;
      }, erro => {
        console.log(erro)
      }
    )
  }


getOffSet(link: string) {
  return parseInt(link.match(/offset=(.*)&/)[1]);
}

getId(link: string) {
  return parseInt(link.match(/pokemon(.*)/)[1].replace('/',''));
}

  mapData(data: Array<any>) {
   return data.map(x => 
      x = {
        id: this.getId(x.url),
        name: x.name,
        url: x.url
      }
    )
  }
}


