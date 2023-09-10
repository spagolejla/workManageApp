import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Invoice } from '../models/invoice.model';


@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
  URL: string = `${environment.apiUrl}/invoice`;
  constructor(private httpClient: HttpClient) { }

  getInvoices(): Observable<Array<Invoice>> {
   return this.httpClient.get<Array<Invoice>>(this.URL);
  }

  getInvoicesByUser(userId: string): Observable<Array<Invoice>> {
    const options = userId ?
      { params: new HttpParams().set('userId', userId) } : {};
    return this.httpClient.get<Array<Invoice>>(`${this.URL}/getByUser`, options)
  }

  createInvoice(invoice: Invoice): Observable<Invoice> {
    return this.httpClient.post(this.URL, invoice, { observe: 'response' })
      .pipe(map((response: any) => {
        return response.body;
      }));
  }

  updateInvoice(invoice: Invoice): Observable<Invoice> {
    return this.httpClient.put(this.URL, invoice)
      .pipe(map((response: any) => { return response; }));
  }

  deleteInvoice(id: string): Observable<boolean> {
    return this.httpClient.delete(this.URL + '/' +id)
      .pipe(map(() => { return true; }));
  }

}
