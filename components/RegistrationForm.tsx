'use client';

import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import {
	Box,
	Button,
	Input,
	VStack,
	Heading,
	Text,
	NativeSelect,
	Stack,
	Field,
	IconButton,
	Grid,
	Alert,
	Clipboard,
	HStack,
} from '@chakra-ui/react';
import { Copy, Check } from 'lucide-react';
// In Chakra v3, Field is the container for form controls
// Checkbox might be complex, let's use a simple checkbox for now or try to import Checkbox

// I'll use a standard input type="checkbox" styled or try to use Chakra's Checkbox if available.
// Let's assume standard Checkbox is NOT available directly without snippets in v3.
// I'll use a wrapper Box with input type checkbox for now to avoid errors, or just NativeSelect for "Transport Required" (Yes/No).
// Actually, a Yes/No NativeSelect is safer than a Checkbox if I don't have the component.

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
	updateField,
	setVisitorType,
	toggleTransport,
	selectTotalAmount,
	VisitorType,
	PickupLocation,
} from '@/store/formSlice';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useGetCountQuery, usePostMutation } from '@/store/services/commonApi';

// Define form data type matching Redux state
interface FormInputs {
	name: string;
	cadre: string;
	phone: string;
	email: string;
	facebook: string;
	visitorType: VisitorType;
	noOfKids: number;
	noOfDrivers: number;
	isTransportRequired: string; // Changed to string for Select (Yes/No)
	transportSeats: number;
	pickupLocation: PickupLocation;
	tranxId: string;
	amountPaid: number;
}

// Generate reference from last 3 digits of phone and 3-digit data count
function generateReference(phone: string, dataCount: number | undefined): string {
	const raw = String(phone || '');
	const lastThree = raw.slice(-3).padStart(3, '0');
	const dataPart = String(dataCount ?? 0).padStart(3, '0');
	return `${lastThree}-${dataPart}`;
}

export default function RegistrationForm() {
	const dispatch = useAppDispatch();
	const totalAmount = useAppSelector(selectTotalAmount);
	const router = useRouter();
	const [errorMessage, setErrorMessage] = useState<string>('');
	const [reference, setReference] = useState<string>('');

	const { data } = useGetCountQuery({ path: 'regs' });

	const [trigger, result] = usePostMutation();

	const {
		register,
		handleSubmit,
		watch,
		control,
		getValues,
		formState: { errors },
	} = useForm<FormInputs>({
		defaultValues: {
			visitorType: 'individual',
			noOfKids: 0,
			noOfDrivers: 0,
			isTransportRequired: 'no',
			transportSeats: 0,
			amountPaid: 0,
		},
	});

	// Watch fields to update Redux for pricing
	const watchedVisitorType = watch('visitorType');
	const watchedNoOfKids = watch('noOfKids');
	const watchedNoOfDrivers = watch('noOfDrivers');
	const watchedIsTransportRequired = watch('isTransportRequired');
	const watchedTransportSeats = watch('transportSeats');
	const watchedPhone = watch('phone');

	// Update reference when phone number or data changes
	useEffect(() => {
		if (watchedPhone && data !== undefined) {
			const ref = generateReference(watchedPhone, data + 1);
		}
	}, [watchedPhone, data]);
	// Sync with Redux for pricing calculation
	useEffect(() => {
		dispatch(setVisitorType(watchedVisitorType));
	}, [watchedVisitorType, dispatch]);

	useEffect(() => {
		const value = Number(watchedNoOfKids);
		dispatch(updateField({ field: 'noOfKids', value: isNaN(value) ? 0 : value }));
	}, [watchedNoOfKids, dispatch]);

	useEffect(() => {
		const value = Number(watchedNoOfDrivers);
		dispatch(updateField({ field: 'noOfDrivers', value: isNaN(value) ? 0 : value }));
	}, [watchedNoOfDrivers, dispatch]);

	useEffect(() => {
		const isRequired = watchedIsTransportRequired === 'yes';
		dispatch(updateField({ field: 'isTransportRequired', value: isRequired }));
		if (!isRequired) {
			dispatch(updateField({ field: 'transportSeats', value: 0 }));
		}
	}, [watchedIsTransportRequired, dispatch]);

	useEffect(() => {
		if (watchedIsTransportRequired === 'yes') {
			const value = Number(watchedTransportSeats);
			dispatch(updateField({ field: 'transportSeats', value: isNaN(value) ? 0 : value }));
		}
	}, [watchedTransportSeats, watchedIsTransportRequired, dispatch]);

	const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		e.stopPropagation();

		setErrorMessage('');

		// Get form data
		const dataa = getValues();

		// Dispatch all data to Redux
		Object.entries(dataa).forEach(([key, value]) => {
			if (key === 'isTransportRequired') {
				dispatch(updateField({ field: key, value: value === 'yes' }));
			} else {
				dispatch(updateField({ field: key as any, value }));
			}
		});

		const { isTransportRequired, ...restData } = dataa;

		try {
			const response = await trigger({
				path: 'regs',
				body: {
					ref: generateReference(watchedPhone, data + 1),

					...restData,
				},
			}).unwrap();

			// Navigate to receipt with the registration code
			if (response?.doc) {
				router.push(`/receipt/${response.doc?.code}`);
			}
		} catch (error: any) {
			console.error('Registration error:', error);
			const message =
				error?.data?.message ||
				error?.message ||
				'রেজিস্ট্রেশন সম্পন্ন করতে সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।';
			setErrorMessage(message);
		}
	};

	return (
		<Box
			maxW='2xl'
			mx='auto'
			mt={8}
			p={{ base: 4, md: 10 }}
			borderWidth={1}
			borderRadius='lg'
			boxShadow='lg'
			bg='white'
			borderColor='gray.200'>
			<form onSubmit={handleFormSubmit}>
				<VStack
					gap={6}
					align='stretch'>
					<Field.Root
						invalid={!!errors.name}
						required>
						<Field.Label
							fontWeight='semibold'
							color='gray.900'
							fontSize='md'>
							আপনার নাম
						</Field.Label>
						<Input
							placeholder='আপনার নাম লিখুন'
							borderColor='gray.400'
							borderRadius='none'
							color='gray.900'
							size='lg'
							height='52px'
							_placeholder={{ color: 'gray.500' }}
							_focus={{ borderColor: 'gray.800', ring: '1px', ringColor: 'gray.800' }}
							{...register('name', { required: 'নাম আবশ্যক' })}
						/>
						<Field.ErrorText>{errors.name?.message}</Field.ErrorText>
					</Field.Root>
					<Field.Root
						invalid={!!errors.cadre}
						required>
						<Field.Label
							fontWeight='semibold'
							color='gray.900'
							fontSize='md'>
							ক্যাডার
						</Field.Label>
						<Input
							placeholder='আপনার ক্যাডার লিখুন'
							borderColor='gray.400'
							borderRadius='none'
							color='gray.900'
							size='lg'
							height='52px'
							_placeholder={{ color: 'gray.500' }}
							_focus={{ borderColor: 'gray.800', ring: '1px', ringColor: 'gray.800' }}
							{...register('cadre', { required: 'ক্যাডার আবশ্যক' })}
						/>
						<Field.ErrorText>{errors.cadre?.message}</Field.ErrorText>
					</Field.Root>
					<Field.Root
						invalid={!!errors.phone}
						required>
						<Field.Label
							fontWeight='semibold'
							color='gray.900'
							fontSize='md'>
							মোবাইল নং
						</Field.Label>
						<Input
							placeholder='মোবাইল নম্বর লিখুন'
							borderColor='gray.400'
							borderRadius='none'
							color='gray.900'
							size='lg'
							height='52px'
							_placeholder={{ color: 'gray.500' }}
							_focus={{ borderColor: 'gray.800', ring: '1px', ringColor: 'gray.800' }}
							{...register('phone', { required: 'মোবাইল নম্বর আবশ্যক' })}
						/>
						<Field.ErrorText>{errors.phone?.message}</Field.ErrorText>
					</Field.Root>
					<Field.Root>
						<Field.Label
							fontWeight='semibold'
							color='gray.900'
							fontSize='md'>
							ইমেইল
						</Field.Label>
						<Input
							placeholder='ইমেইল (ঐচ্ছিক)'
							borderColor='gray.400'
							borderRadius='none'
							color='gray.900'
							size='lg'
							height='52px'
							_placeholder={{ color: 'gray.500' }}
							_focus={{ borderColor: 'gray.800', ring: '1px', ringColor: 'gray.800' }}
							{...register('email')}
						/>
					</Field.Root>
					{/* <Field.Root>
						<Field.Label
							fontWeight='semibold'
							color='gray.900'
							fontSize='md'>
							ফেসবুক আইডি
						</Field.Label>
						<Input
							placeholder='ফেসবুক লিংক (ঐচ্ছিক)'
							borderColor='gray.400'
							borderRadius='none'
							color='gray.900'
							size='lg'
							height='52px'
							_placeholder={{ color: 'gray.500' }}
							_focus={{ borderColor: 'gray.800', ring: '1px', ringColor: 'gray.800' }}
							{...register('facebook')}
						/>
					</Field.Root> */}
					<Field.Root required>
						<Field.Label
							fontWeight='semibold'
							color='gray.900'
							fontSize='md'>
							সদস্য ধরণ
						</Field.Label>
						<NativeSelect.Root size='lg'>
							<NativeSelect.Field
								borderColor='gray.400'
								borderRadius='none'
								color='gray.900'
								height='52px'
								_focus={{ borderColor: 'gray.800', ring: '1px', ringColor: 'gray.800' }}
								{...register('visitorType')}>
								<option value='individual'>একক</option>
								<option value='couple'>যুগল</option>
							</NativeSelect.Field>
							<NativeSelect.Indicator />
						</NativeSelect.Root>
					</Field.Root>
					<Grid
						gridTemplateColumns={{ base: '1fr', md: '1fr' }}
						gap={{ base: 2, md: 4 }}>
						{/* <Field.Root
							flex={1}
							w='full'>
							<Field.Label
								fontWeight='semibold'
								color='gray.900'
								fontSize='md'>
								সন্তান সংখ্যা
							</Field.Label>
							<Text
								fontSize='xs'
								color='gray.600'
								mb={1}>
								৬০০ টাকা/জন
							</Text>
							<Input
								w='full'
								type='number'
								min={0}
								borderColor='gray.400'
								borderRadius='none'
								color='gray.900'
								size='lg'
								height='52px'
								_focus={{ borderColor: 'gray.800', ring: '1px', ringColor: 'gray.800' }}
								{...register('noOfKids', {
									valueAsNumber: true,
									setValueAs: v => (v === '' ? 0 : parseInt(v) || 0),
								})}
							/>
						</Field.Root> */}

						<Field.Root
							flex={1}
							w='full'>
							<Field.Label
								fontWeight='semibold'
								color='gray.900'
								fontSize='md'>
								গাড়ি চালক/বডিগার্ড
							</Field.Label>

							<Input
								min={0}
								borderColor='gray.400'
								borderRadius='none'
								color='gray.900'
								size='lg'
								height='52px'
								_focus={{ borderColor: 'gray.800', ring: '1px', ringColor: 'gray.800' }}
								{...register('noOfDrivers')}
							/>
						</Field.Root>
					</Grid>

					{errorMessage && (
						<Alert.Root
							status='error'
							mt={4}>
							<Alert.Indicator />
							<Alert.Title>সমস্যা হয়েছে!</Alert.Title>
							<Alert.Description>{errorMessage}</Alert.Description>
						</Alert.Root>
					)}
					<Button
						type='submit'
						bg='gray.900'
						color='white'
						_hover={{ bg: 'gray.700' }}
						borderRadius='md'
						size='xl'
						height='56px'
						fontSize='lg'
						fontWeight='bold'
						loading={result.isLoading}
						width='full'
						mt={4}>
						জমা দিন
					</Button>
				</VStack>
			</form>
		</Box>
	);
}

const PhoneNumber = ({ number, ...props }: { number: string; mb?: number }) => {
	return (
		<Clipboard.Root value={number}>
			<Clipboard.Trigger asChild>
				<Button
					variant='outline'
					size='lg'
					width='full'
					borderRadius='none'
					height='56px'
					mb={props.mb !== undefined ? props.mb : 3}
					justifyContent='space-between'
					px={4}
					borderColor='gray.300'
					bg='white'>
					<Text
						fontSize='xl'
						fontWeight='bold'
						color='gray.900'
						letterSpacing='wide'>
						{number}
					</Text>
					<HStack gap={2}>
						<Clipboard.Indicator
							copied={
								<HStack gap={1}>
									<Check size={16} />
									<Text fontSize='sm'>কপি হয়েছে</Text>
								</HStack>
							}>
							<HStack gap={1}>
								<Copy size={16} />
								<Text fontSize='sm'>কপি করুন</Text>
							</HStack>
						</Clipboard.Indicator>
					</HStack>
				</Button>
			</Clipboard.Trigger>
		</Clipboard.Root>
	);
};
