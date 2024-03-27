import { Component } from '@angular/core';
import { MailgunServiceService } from '../services/mailgun-service.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { contact } from '../common';

@Component({
  selector: 'yt-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  
  contactMeForm: FormGroup;
  contactDetails = contact;
  contactNumber: string = contact.NUMBER;
  constructor(private mailService: MailgunServiceService, private formBuilder: FormBuilder) {
    this.contactMeForm = this.formBuilder.group({
      contactName: new FormControl(''),
      contactSubject: new FormControl(''),
      contactEmail: new FormControl(''),
      contactMessage: new FormControl('')
    });
  }

  getContactFormValue(formField: string): string{
    return this.contactMeForm.get(formField)?.value;
  }

  confirmation() {
    
  }

  sendEmail() {
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
  }
}
