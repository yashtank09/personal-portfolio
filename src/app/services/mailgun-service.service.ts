import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_KEY, EMAILAPI } from '../configurations';

@Injectable({
  providedIn: 'root'
})
export class MailgunServiceService {

  constructor(private http: HttpClient) { }

  sendEmail(from: string, to: string, subject: string, body: string) {
    const formData = new FormData();
    formData.append('from', from);
    formData.append('to', to);
    formData.append('subject', subject);
    formData.append('text', body);  // Use 'html' for HTML content

    const headers = new HttpHeaders({
      Authorization: `Basic ${btoa(`api:${API_KEY}`)}`  // Base64 encode API key
    });
    return this.http.post(EMAILAPI, formData, { headers });
  }

}
