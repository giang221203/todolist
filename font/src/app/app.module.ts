import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Component } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TaskComponent } from './component/task/task.component';
import { StatusComponent } from './component/status/status.component';
import { TableModule } from 'primeng/table';
import { HttpClientModule } from '@angular/common/http';
import { SidebarComponent } from './component/sidebar/sidebar.component';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { StyleClassModule } from 'primeng/styleclass';
import { MegaMenuModule } from 'primeng/megamenu';
import { PaginatorModule } from 'primeng/paginator';
import { CommonModule, DatePipe } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { DropdownModule } from 'primeng/dropdown';
import { DialogModule } from 'primeng/dialog';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ToastModule } from 'primeng/toast';
import { SubtaskComponent } from './component/subtask/subtask.component';
import { RouterLinkActive } from '@angular/router';
import { CalendarModule } from 'primeng/calendar';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
@NgModule({
  declarations: [
    AppComponent,
    TaskComponent,
    StatusComponent,
    SidebarComponent,
    SubtaskComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TableModule,
    HttpClientModule,
    InputTextModule,
    FormsModule,
    StyleClassModule,
    MegaMenuModule,
    PaginatorModule,
    CommonModule,
    BrowserAnimationsModule,
    ButtonModule,
    IconFieldModule,
    InputIconModule,
    DropdownModule,
    DialogModule,
    InputTextareaModule,
    ToastModule,
    RouterLinkActive,
    CalendarModule,
    InputTextModule,
    ConfirmDialogModule,
  ],
  providers: [DatePipe, ConfirmationService, MessageService],
  bootstrap: [AppComponent],
})
export class AppModule {}
