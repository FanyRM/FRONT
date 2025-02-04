import { Injectable } from '@angular/core';
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { Empleado } from '../interfaces/empleado';
import { TDocumentDefinitions } from 'pdfmake/interfaces';
import { Producto } from '../interfaces/producto';
import { Sucursal } from '../interfaces/sucursal';

(<any>pdfMake).addVirtualFileSystem(pdfFonts);


@Injectable({
  providedIn: 'root'
})
export class PdfService {


  constructor() {}

  generateEmpleadoPDF(empleados: Empleado[]) {
    const fecha = new Date().toLocaleDateString();

    // Excluir el primer empleado
    const empleadosFiltrados = empleados.slice(1);

    // Crear la tabla sin el primer empleado
    const empleadosTabla = empleadosFiltrados.map(emp => [
      emp.id?.toString() || '',
      emp.Emp_Nom || '',
      emp.Ape_Pat || '',
      emp.Ape_Mat || '',
      emp.Edad?.toString() || '',
      emp.Emp_Telefono || '',
      emp.Emp_Email || '',
      emp.Estado ? 'Activo' : 'Inactivo'
    ]);

    const documentDefinition: TDocumentDefinitions = {
      pageSize: 'A4',
      pageOrientation: 'landscape',

      content: [
        { text: 'Reporte de Empleados', style: 'header' },
        { text: 'Sr. Macondo', style:'subtitle' },
        { text: `Fecha: ${fecha}`, alignment: 'right' },
        { text: `Total de empleados: ${empleadosFiltrados.length}`, margin: [0, 10, 0, 10] }, // Ajustar el conteo
        {
          table: {
            headerRows: 1,
            widths: ['*', '*', '*', '*', '*', '*', '*', '*'],
            body: [
              ['ID', 'Nombre', 'Apellido Paterno', 'Apellido Materno', 'Edad', 'Teléfono', 'Email', 'Estado'],
              ...empleadosTabla
            ]
          },
          layout: 'lightHorizontalLines',
          alignment: 'center'
        }
      ],
      styles: {
        header: {
          fontSize: 20,
          bold: true,
          alignment: 'center',
          color: '#471f13',
          margin: [0, 0, 0, 10]
        },
        subtitle:{
          fontSize: 16,
          bold: true,
          alignment: 'center',
          color: '#087d6b'
        }
      },
      defaultStyle: {
        fontSize: 10
      }
    };

    pdfMake.createPdf(documentDefinition).open();
  }

  generateProductoPDF(productos: Producto[]) {
    const fecha = new Date().toLocaleDateString();

    // NO filtrar el primer producto
    const productosTabla = productos.map(prod => [
      prod.id?.toString() || '',
      prod.Nom_Prod || '',
      prod.Tipo_Prod || '',
      prod.Exist_Prod?.toString() || '0',
      `$${prod.Prec_Prod?.toFixed(2)}` || '',
      `${prod.Desc_Prod}%` || '',
      prod.IDSucursal || '',
      prod.IDDistribuidor || ''
    ]);

    const documentDefinition: TDocumentDefinitions = {
      pageSize: 'A4',
      pageOrientation: 'landscape',
      content: [
        { text: 'Reporte de Productos', style: 'header' },
        { text: 'Sr. Macondo', style: 'subtitle' },
        { text: `Fecha: ${fecha}`, alignment: 'right' },
        { text: `Total de productos: ${productos.length}`, margin: [0, 10, 0, 10] }, // Contar todos los productos
        {
          table: {
            headerRows: 1,
            widths: ['*', '*', '*', '*', '*', '*', '*', '*'],
            body: [
              ['ID', 'Nombre', 'Tipo', 'Existencias', 'Precio', 'Descuento', 'ID Sucursal', 'ID Distribuidor'],
              ...productosTabla
            ]
          },
          layout: 'lightHorizontalLines',
          alignment: 'center'
        }
      ],
      styles: {
        header: {
          fontSize: 20,
          bold: true,
          alignment: 'center',
          color: '#471f13',
          margin: [0, 0, 0, 10]
        },
        subtitle: {
          fontSize: 16,
          bold: true,
          alignment: 'center',
          color: '#087d6b'
        }
      },
      defaultStyle: {
        fontSize: 10
      }
    };

    pdfMake.createPdf(documentDefinition).open();
  }
  generateSucursalPDF(sucursales: Sucursal[]) {
    const fecha = new Date().toLocaleDateString();

    // NO filtrar la primera sucursal
    const sucursalesTabla = sucursales.map(suc => [
      suc.id?.toString() || '',
      suc.Nom_Suc || '',
      suc.Loc_Suc || '',
      suc.Des_Suc || '',
      suc.Latitud?.toString() || '',
      suc.Longitud?.toString() || ''
    ]);

    const documentDefinition: TDocumentDefinitions = {
      pageSize: 'A4',
      pageOrientation: 'landscape',
      content: [
        { text: 'Reporte de Sucursales', style: 'header' },
        { text: 'Sr. Macondo', style: 'subtitle' },
        { text: `Fecha: ${fecha}`, alignment: 'right' },
        { text: `Total de sucursales: ${sucursales.length}`, margin: [0, 10, 0, 10] }, // Contar todas las sucursales
        {
          table: {
            headerRows: 1,
            widths: ['*', '*', '*', '*', '*', '*'],
            body: [
              ['ID', 'Nombre', 'Ubicación', 'Descripción', 'Latitud', 'Longitud'],
              ...sucursalesTabla
            ]
          },
          layout: 'lightHorizontalLines',
          alignment: 'center'
        }
      ],
      styles: {
        header: {
          fontSize: 20,
          bold: true,
          alignment: 'center',
          color: '#471f13',
          margin: [0, 0, 0, 10]
        },
        subtitle: {
          fontSize: 16,
          bold: true,
          alignment: 'center',
          color: '#087d6b'
        }
      },
      defaultStyle: {
        fontSize: 10
      }
    };

    pdfMake.createPdf(documentDefinition).open();
  }



}
