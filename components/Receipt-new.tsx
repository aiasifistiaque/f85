'use client';

import {
	Box,
	VStack,
	Heading,
	Text,
	Button,
	HStack,
	Flex,
	Spinner,
} from '@chakra-ui/react';
import { useRef } from 'react';
import { Printer, Tent, Download } from 'lucide-react';
import { useGetByIdQuery } from '@/store/services/commonApi';

const pickupLocationMap: Record<string, string> = {
	'officers-club': 'অফিসার্স ক্লাব',
	mohakhali: 'মহাখালী',
	uttara: 'উত্তরা',
	shukrabad: 'শুক্রাবাদ',
	shamoly: 'শ্যামলী',
	mirpur: 'মিরপুর',
};

export default function Receipt({ code }: { code: string }) {
	const receiptRef = useRef<HTMLDivElement>(null);

	const { data, isFetching, isError } = useGetByIdQuery({ path: 'regs/g/code', id: code });

	const handlePrint = () => {
		window.print();
	};

	const handleDownloadPDF = async () => {
		if (typeof window === 'undefined') return;

		try {
			const html2canvas = (await import('html2canvas')).default;
			const jsPDF = (await import('jspdf')).default;

			const element = receiptRef.current;
			if (!element) {
				console.error('Receipt element not found');
				return;
			}

			const canvas = await html2canvas(element, {
				scale: 3,
				useCORS: true,
				logging: false,
				backgroundColor: '#ffffff',
				allowTaint: true,
				foreignObjectRendering: false,
				removeContainer: true,
				onclone: clonedDoc => {
					const allElements = clonedDoc.querySelectorAll('*');
					allElements.forEach((el: any) => {
						if (el.style) {
							el.style.boxShadow = 'none';
							el.style.textShadow = 'none';
						}
					});
				},
			});

			const imgData = canvas.toDataURL('image/png');
			const pdf = new jsPDF({
				orientation: 'portrait',
				unit: 'px',
				format: [canvas.width / 3, canvas.height / 3],
			});

			pdf.addImage(imgData, 'PNG', 0, 0, canvas.width / 3, canvas.height / 3);
			pdf.save(`ticket-${code}.pdf`);
		} catch (error) {
			console.error('PDF download error:', error);
			alert('PDF ডাউনলোড করতে সমস্যা হয়েছে। অনুগ্রহ করে প্রিন্ট অপশন ব্যবহার করুন।');
		}
	};

	if (isFetching) {
		return (
			<Box
				textAlign='center'
				py={20}>
				<VStack gap={4}>
					<Spinner
						size='xl'
						color='teal.600'
					/>
					<Text
						fontSize='lg'
						color='#222'>
						রসিদ লোড হচ্ছে...
					</Text>
				</VStack>
			</Box>
		);
	}

	if (isError || !data) {
		return (
			<Box
				textAlign='center'
				py={10}>
				<Text
					fontSize='lg'
					color='red.600'>
					রেজিস্ট্রেশন তথ্য পাওয়া যায়নি। অনুগ্রহ করে আপনার কোড এবং মোবাইল নম্বর যাচাই করুন।
				</Text>
			</Box>
		);
	}

	return (
		<Box
			maxW='800px'
			mx='auto'
			p={{ base: 4, md: 6 }}
			bg='white'>
			<Box
				ref={receiptRef}
				id='printable-receipt'
				maxW='600px'
				mx='auto'
				bg='linear-gradient(135deg, #0f766e 0%, #14b8a6 100%)'
				borderRadius='20px'
				overflow='hidden'
				position='relative'>
				{/* Decorative Pattern */}
				<Box
					position='absolute'
					top='0'
					right='0'
					width='200px'
					height='200px'
					opacity='0.1'
					style={{
						background: 'radial-gradient(circle, white 2px, transparent 2px)',
						backgroundSize: '20px 20px',
					}}
				/>

				{/* Header Section */}
				<Box
					bg='white'
					p={6}
					textAlign='center'
					borderBottom='3px dashed'
					borderColor='teal.500'>
					<Flex
						justify='center'
						mb={3}>
						<Box
							bg='#d1fae5'
							p={3}
							borderRadius='full'>
							<Tent
								size={40}
								color='#0f766e'
							/>
						</Box>
					</Flex>
					<Heading
						size='xl'
						color='#134e4a'
						fontWeight='black'
						mb={1}>
						বাংলাদেশ সিভিল সার্ভিস '৮৫ ফোরাম
					</Heading>
					<Heading
						size='lg'
						color='#0f766e'
						fontWeight='bold'
						mb={3}>
						বার্ষিক সম্মিলন ২০২৬
					</Heading>
					<Box
						bg='#d1fae5'
						px={4}
						py={2}
						borderRadius='full'
						display='inline-block'>
						<Text
							fontSize='lg'
							color='#0f766e'
							fontWeight='bold'>
							রেজিস্ট্রেশন কোড: {code}
						</Text>
					</Box>
				</Box>

				{/* Info Section */}
				<Box
					bg='white'
					p={6}>
					{/* Event Details */}
					<Box
						bg='#d1fae5'
						p={4}
						borderRadius='12px'
						mb={4}>
						<HStack
							justify='space-between'
							mb={2}>
							<Text
								fontSize='sm'
								color='#0f766e'
								fontWeight='semibold'>
								📍 স্থান
							</Text>
							<Text
								fontSize='sm'
								color='#134e4a'
								fontWeight='bold'
								textAlign='right'>
								অফিসার্স ক্লাব ঢাকা, ২৬ বেইলি রোড, ঢাকা ১০০০
							</Text>
						</HStack>
						<HStack justify='space-between'>
							<Text
								fontSize='sm'
								color='#0f766e'
								fontWeight='semibold'>
								📅 তারিখ
							</Text>
							<Text
								fontSize='sm'
								color='#134e4a'
								fontWeight='bold'>
								২৮ জুলাই ২০২৬, মঙ্গলবার
							</Text>
						</HStack>
					</Box>

					{/* Participant Info - 2x2 Grid */}
					<Box
						display='grid'
						gridTemplateColumns='1fr 1fr'
						gap={3}
						mb={4}>
						<Box
							bg='#f3f4f6'
							p={3}
							borderRadius='8px'>
							<Text
								fontSize='xs'
								color='#6b7280'
								mb={1}>
								নাম
							</Text>
							<Text
								fontSize='sm'
								color='#111827'
								fontWeight='bold'>
								{data?.name}
							</Text>
						</Box>
						<Box
							bg='#f3f4f6'
							p={3}
							borderRadius='8px'>
							<Text
								fontSize='xs'
								color='#6b7280'
								mb={1}>
								ক্যাডার
							</Text>
							<Text
								fontSize='sm'
								color='#111827'
								fontWeight='bold'>
								{data?.cadre}
							</Text>
						</Box>
						<Box
							bg='#f3f4f6'
							p={3}
							borderRadius='8px'>
							<Text
								fontSize='xs'
								color='#6b7280'
								mb={1}>
								মোবাইল
							</Text>
							<Text
								fontSize='sm'
								color='#111827'
								fontWeight='bold'>
								{data?.phone}
							</Text>
						</Box>
						<Box
							bg='#f3f4f6'
							p={3}
							borderRadius='8px'>
							<Text
								fontSize='xs'
								color='#6b7280'
								mb={1}>
								সদস্য ধরণ
							</Text>
							<Text
								fontSize='sm'
								color='#111827'
								fontWeight='bold'>
								{data?.visitorType === 'individual' ? 'একক' : 'দম্পতি'}
							</Text>
						</Box>
					</Box>

					{/* Additional Details */}
					<HStack
						gap={2}
						mb={4}
						flexWrap='wrap'>
						<Box
							bg='#f3f4f6'
							px={3}
							py={2}
							borderRadius='full'
							fontSize='xs'
							color='#374151'>
							সন্তান: {data?.noOfKids}
						</Box>
						<Box
							bg='#f3f4f6'
							px={3}
							py={2}
							borderRadius='full'
							fontSize='xs'
							color='#374151'>
							চালক/বডিগার্ড: {data?.noOfDrivers}
						</Box>
						{data?.isTransportRequired && (
							<Box
								bg='#d1fae5'
								px={3}
								py={2}
								borderRadius='full'
								fontSize='xs'
								color='#0f766e'
								fontWeight='semibold'>
								🚌 পরিবহন: {data.transportSeats} সিট ({pickupLocationMap[data.pickupLocation]})
							</Box>
						)}
					</HStack>

					{/* Payment Info */}
					<Box
						bg='#0f766e'
						p={4}
						borderRadius='12px'
						color='white'>
						<HStack justify='space-between'>
							<VStack
								align='start'
								gap={0}>
								<Text
									fontSize='xs'
									opacity='0.9'>
									পরিশোধিত পরিমাণ
								</Text>
								<Text
									fontSize='2xl'
									fontWeight='black'>
									৳ {data?.amountPaid}
								</Text>
							</VStack>
							<VStack
								align='end'
								gap={0}>
								<Text
									fontSize='xs'
									opacity='0.9'>
									bKash TrxID
								</Text>
								<Text
									fontSize='sm'
									fontWeight='bold'>
									{data?.tranxId}
								</Text>
							</VStack>
						</HStack>
					</Box>
				</Box>

				{/* Footer */}
				<Box
					bg='#134e4a'
					p={4}
					textAlign='center'>
					<Text
						fontSize='xs'
						color='white'
						opacity='0.8'
						mb={1}>
						রেজিস্ট্রেশন সম্পন্ন: {new Date().toLocaleDateString('bn-BD')}
					</Text>
					<Text
						fontSize='xs'
						color='white'
						fontWeight='semibold'>
						অনুগ্রহ করে এই টিকেটটি ভেন্যুতে প্রদর্শন করুন
					</Text>
				</Box>
			</Box>

			{/* Actions */}
			<HStack
				mt={6}
				justify='center'
				gap={4}
				className='no-print'>
				<Button
					colorPalette='teal'
					variant='outline'
					onClick={handlePrint}>
					<Printer /> প্রিন্ট করুন
				</Button>
				<Button
					colorPalette='teal'
					onClick={handleDownloadPDF}>
					<Download /> ডাউনলোড করুন
				</Button>
			</HStack>

			<style
				jsx
				global>{`
				@media print {
					.no-print {
						display: none !important;
					}
					body {
						background: white;
					}
				}
			`}</style>
		</Box>
	);
}
