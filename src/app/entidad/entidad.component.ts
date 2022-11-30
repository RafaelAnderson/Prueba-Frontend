import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Entidad } from '../models/entidad';
import { EntidadService } from '../service/entidad.service';
import { MatDialog } from '@angular/material/dialog';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-entidad',
  templateUrl: './entidad.component.html',
  styleUrls: ['./entidad.component.css']
})

export class EntidadComponent implements OnInit {

  displayedColumns: string[] = ["id", "direccion", "nombre_comercial",
    "nro_documento", "razon_social", "telefono", "acciones"];

  dataSource!: MatTableDataSource<Entidad>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private serviceEntidad: EntidadService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {

    this.serviceEntidad.getMessageChange().subscribe((data) => {
      this.snackBar.open(data, 'Ok', { duration: 3000 });
    });

    this.cargarData()
  }

  cargarData() {
    this.serviceEntidad.findAll().subscribe(data => {
      //console.log(data);
      this.crearTabla(data);
    })
  }

  crearTabla(data: Entidad[]) {
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.paginator.hidePageSize = false;
  }

  editar(row: Entidad) {
  }

  consultar(row: Entidad) {
  }

  eliminar(row: Entidad) {
    this.serviceEntidad.deleteEntidad(row.id).pipe(
      switchMap(result => {
        () => this.serviceEntidad.findAll().subscribe(data => {
          this.serviceEntidad.setMessageChange("Data actualizada")
          this.crearTabla(data)
        })
        return result
      })
    )
  }
}
