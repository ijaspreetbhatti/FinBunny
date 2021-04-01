import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { GridApi, GridReadyEvent, RowDataUpdatedEvent } from 'ag-grid-community';
import { fade, roll, slideIn } from 'src/animations/animations';
import { AdminService } from 'src/services/admin.service';
import { DatabaseService } from 'src/services/database.service';
import * as moment from 'moment';

interface Income {
  name: string
  type: string
  date: string
  amount: number
}

interface Expense {
  name: string
  type: string
  date: string
  amount: number
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  animations: [fade, roll, slideIn]
})
export class DashboardComponent implements OnInit {

  incomeRowData: Income[] = [];
  expenseRowData: Expense[] = [];
  incomeColumnDefs = [
    {
      headerName: 'Name', field: 'name',
    },
    {
      headerName: 'Type', field: 'type', valueFormatter: (params: any) => {
        return this.incomeTypes.find(type => type.value === params.value)?.viewValue;
      }
    },
    {
      headerName: 'Date', field: 'date', valueFormatter: (params: any) => {
        return moment(params.value).format('DD MMM YY');
      },
    },
    {
      headerName: 'Amount', field: 'amount',
    },
  ];

  expenseColumnDefs = [
    {
      headerName: 'Name', field: 'name',
    },
    {
      headerName: 'Type', field: 'type', valueFormatter: (params: any) => {
        return this.expenseTypes.find(type => type.value === params.value)?.viewValue;
      }
    },
    {
      headerName: 'Date', field: 'date', valueFormatter: (params: any) => {
        return moment(params.value).format('DD MMM YY');
      },
    },
    {
      headerName: 'Amount', field: 'amount',
    },
  ];

  incomeTypes = [
    {
      viewValue: '',
      value: null
    }
  ]
  expenseTypes = [
    {
      viewValue: '',
      value: null
    }
  ]

  isIncomeFormShown = false;
  isExpenseFormShown = false;

  isLoadingIncomes = false;
  isLoadingExpenses = false;

  defaultColDef = { filter: true, flex: true, sort: true, resizable: true }
  gridApiIncome!: GridApi;
  gridApiExpense!: GridApi;
  formBuilder = new FormBuilder();
  incomeFormGroup = this.formBuilder.group({
    name: ['', Validators.required],
    type: ['', Validators.required],
    date: ['', Validators.required],
    amount: ['', Validators.required],
  });
  expenseFormGroup = this.formBuilder.group({
    name: ['', Validators.required],
    type: ['', Validators.required],
    date: ['', Validators.required],
    amount: ['', Validators.required],
  });

  details = {
    totalIncome: 0,
    totalExpenses: 0
  }

  constructor(
    private _databaseService: DatabaseService,
    private _adminService: AdminService
  ) { }

  ngOnInit(): void {
    this.getAllMetadata();
    this.getIncomes();
    this.getExpenses();
  }

  getAllMetadata() {
    this._databaseService.getMetadata().subscribe((res: any) => {
      this.incomeTypes = res.incomeTypes;
      this.expenseTypes = res.expenseTypes;
    })

  }

  getIncomes(): void {
    this.isLoadingIncomes = true;
    this._databaseService.getAllIncomes().subscribe((res: any) => {
      const data: Income[] = res;
      this.incomeRowData = data;
      this.details.totalIncome = data.map(d => d.amount).reduce((a, b) => a + b);
      this.isLoadingIncomes = false;
    });
  };

  getExpenses(): void {
    this.isLoadingExpenses = true;
    this._databaseService.getAllExpenses().subscribe((res: any) => {
      const data: Expense[] = res;
      this.expenseRowData = data;
      this.details.totalExpenses = data.map(d => d.amount).reduce((a, b) => a + b);
      this.isLoadingExpenses = false;
    });
  };

  addIncome(): void {
    if (this.incomeFormGroup.valid) {
      this.isLoadingIncomes = true;
      const income: Income = this.incomeFormGroup.value;
      income.date = moment(income.date).toISOString();
      this._databaseService.addIncome(income).subscribe((data: any) => {
        this._adminService.sendNotification('Successfully added Income!', '');
        this.gridApiIncome.applyTransaction({ add: [this.incomeFormGroup.value] });
        this.details.totalIncome = this.details.totalIncome + income.amount;
        this.isIncomeFormShown = false;
        this.incomeFormGroup.reset()
        this.isLoadingIncomes = false;
      });
    } else {
      this._adminService.sendNotification('Fill Details');
    }
  };

  addExpense(): void {
    if (this.expenseFormGroup.valid) {
      this.isLoadingExpenses = true;
      const expense: Expense = this.expenseFormGroup.value;
      expense.date = moment(expense.date).toISOString();
      this._databaseService.addExpense(expense).subscribe((data: any) => {
        this._adminService.sendNotification('Successfully added Expense!', '');
        this.gridApiExpense.applyTransaction({ add: [(this.expenseFormGroup.value)] });
        this.details.totalExpenses = this.details.totalExpenses + expense.amount;
        this.isExpenseFormShown = false;
        this.expenseFormGroup.reset()
        this.isLoadingExpenses = false;
      });
    } else {
      this._adminService.sendNotification('Fill Details');
    }
  };

  incomeGridReady(event: GridReadyEvent): void {
    this.gridApiIncome = event.api;
  }

  expenseGridReady(event: GridReadyEvent): void {
    this.gridApiExpense = event.api;
  }
}
