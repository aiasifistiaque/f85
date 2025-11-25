import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type VisitorType = 'individual' | 'couple';
export type PickupLocation =
	| 'officers-club'
	| 'mohakhali'
	| 'uttara'
	| 'shukrabad'
	| 'shamoly'
	| 'mirpur'
	| '';

interface FormState {
	name: string;
	cadre: string;
	phone: string;
	email: string;
	facebook: string;
	visitorType: VisitorType;
	noOfKids: number;
	noOfDrivers: number;
	isTransportRequired: boolean;
	transportSeats: number;
	pickupLocation: PickupLocation;
	tranxId: string;
	amountPaid: number; // User input for verification? Or just display? Usually user inputs what they paid.
}

const initialState: FormState = {
	name: '',
	cadre: '',
	phone: '',
	email: '',
	facebook: '',
	visitorType: 'individual',
	noOfKids: 0,
	noOfDrivers: 0,
	isTransportRequired: false,
	transportSeats: 0,
	pickupLocation: '',
	tranxId: '',
	amountPaid: 0,
};

export const formSlice = createSlice({
	name: 'form',
	initialState,
	reducers: {
		updateField: (state, action: PayloadAction<{ field: keyof FormState; value: any }>) => {
			// @ts-ignore - dynamic assignment
			state[action.payload.field] = action.payload.value;
		},
		setVisitorType: (state, action: PayloadAction<VisitorType>) => {
			state.visitorType = action.payload;
		},
		toggleTransport: state => {
			state.isTransportRequired = !state.isTransportRequired;
			if (!state.isTransportRequired) {
				state.transportSeats = 0;
				state.pickupLocation = '';
			} else {
				state.transportSeats = 1; // Default to 1 if checked
			}
		},
		resetForm: () => initialState,
	},
});

export const { updateField, setVisitorType, toggleTransport, resetForm } = formSlice.actions;

// Selectors for pricing
export const selectTotalAmount = (state: { form: FormState }) => {
	const { visitorType, noOfKids, noOfDrivers, transportSeats } = state.form;

	const basePrice = visitorType === 'couple' ? 2000 : 1200;
	const kidsPrice = noOfKids * 600;
	const driverPrice = noOfDrivers * 500;
	const transportPrice = transportSeats * 200; // Assuming 200 per seat

	const subtotal = basePrice + kidsPrice + driverPrice + transportPrice;
	const transactionCharge = subtotal * 0.015;

	return Math.ceil(subtotal + transactionCharge);
};

export default formSlice.reducer;
