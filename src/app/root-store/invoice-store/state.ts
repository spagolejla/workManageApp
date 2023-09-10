import { Invoice } from "src/app/invoices/models/invoice.model";

export interface State {
    isLoading: boolean;
    invoices: Array<Invoice>;
    selectedInvoice?: Invoice;
    searchActive: boolean;
    searchValue: string;
    employeeInvoices: Array<Invoice>;
};

export const initialState: State = {
    isLoading: false,
    invoices: [],
    selectedInvoice: undefined,
    searchActive: false,
    searchValue: "",
    employeeInvoices: []
};