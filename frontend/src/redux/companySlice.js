import { createSlice } from "@reduxjs/toolkit";

const companySlice = createSlice({
  name: "company",
  initialState: {
    singleCompany: null,
    companies: [],
    searchCompanyByText: "",
  },
  reducers: {
    // Action to set a single company
    setSingleCompany: (state, action) => {
      state.singleCompany = action.payload;
    },

    // Action to set the list of companies
    setCompanies: (state, action) => {
      state.companies = action.payload;
    },

    // Action to set the search text for companies
    setSearchCompanyByText: (state, action) => {
      state.searchCompanyByText = action.payload;
    },

    // Action to delete a company from the companies array
    deleteCompany: (state, action) => {
      const companyId = action.payload;
      state.companies = state.companies.filter(
        (company) => company._id !== companyId
      );
    },
  },
});

export const {
  setSingleCompany,
  setCompanies,
  setSearchCompanyByText,
  deleteCompany, // Export the deleteCompany action
} = companySlice.actions;

export default companySlice.reducer;
