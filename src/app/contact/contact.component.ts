import { Component } from '@angular/core';
import { MailgunServiceService } from '../services/mailgun-service.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { contact } from '../common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'yt-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {

  contactMeForm: FormGroup;
  contactDetails = contact;
  contactNumber: string = contact.NUMBER;
  formspreeSecretKey: string = "xpwanayn";

  constructor(private mailService: MailgunServiceService, private messageService: MessageService, private formBuilder: FormBuilder, private httpClient: HttpClient) {
    this.contactMeForm = this.formBuilder.group({
      contactName: new FormControl(''),
      contactSubject: new FormControl(''),
      contactEmail: new FormControl(''),
      contactMessage: new FormControl('')
    });
  }

  getContactFormValue(formField: string): string {
    return this.contactMeForm.get(formField)?.value;
  }

  confirmation() {

  }

  /*sendEmail() {
    const emailBody = {
      from: this.getContactFormValue('contactEmail'),
      to: contact.EMAIL,
      subject: this.getContactFormValue('contactSubject'),
      body: this.getContactFormValue('contactMessage')
    }
    this.mailService.sendEmail(emailBody.from, emailBody.to, emailBody.subject, emailBody.body).subscribe( response => {
        console.log('Email sent succesfully', response);
        this.contactMeForm.reset;
    }, error => {
      console.error('Error', error);
    });
  }*/

  sendEmail() {
    //Set the url with your secretKey from formspree.io
    let url = "https://formspree.io/f/" + this.formspreeSecretKey;

    //Set Headers
    const httpOptions = {
      headers: new HttpHeaders({
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded"
      })
    };

    let data = `name=${this.getContactFormValue('contactName')}&email=${this.getContactFormValue('contactEmail')}&subject=${this.getContactFormValue('contactSubject')}&message=${this.getContactFormValue('contactMessage')}`;
    let errorMessage: string = "";

    this.httpClient.post<any>(url, data, httpOptions).subscribe({
      next: data => {
        // console.log("email sent" + JSON.stringify(data));
        this.messageService.add({severity:'success', summary: 'Email Sent', detail: 'Your message sent successfully.'});
        this.contactMeForm.reset();
      },
      error: error => {
        errorMessage = error.message;
        console.log(errorMessage);
        this.messageService.add({severity:'error', summary: 'Error', detail: 'Something went wrong!'});
      }
    })
  }
}
