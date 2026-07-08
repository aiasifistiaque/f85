'use client';

import {
	Box,
	VStack,
	Heading,
	Text,
	Table,
	Button,
	HStack,
	Separator,
	Flex,
	Image,
	Link,
	Spinner,
	Alert,
} from '@chakra-ui/react';
import { Printer, Tent, Download } from 'lucide-react';
import { useGetByIdQuery } from '@/store/services/commonApi';
import NextLink from 'next/link';

const pickupLocationMap: Record<string, string> = {
	'officers-club': 'অফিসার্স ক্লাব',
	mohakhali: 'মহাখালী',
	uttara: 'উত্তরা',
	shukrabad: 'শুক্রাবাদ',
	shamoly: 'শ্যামলী',
	mirpur: 'মিরপুর',
};

export default function Receipt({ code }: { code: string }) {
	const { data, isFetching, isError } = useGetByIdQuery({ path: 'regs/g/code', id: code });

	const receiptPdfUrl = `${process.env.NEXT_PUBLIC_BACKEND}/receipt-pdf/${code}`;

	const handlePrint = () => {
		window.print();
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
			bg='white'
			boxShadow='lg'
			borderRadius='md'>
			<Box id='printable-receipt'>
				{/* Header */}
				<VStack
					mb={4}
					gap={4}
					textAlign='center'>
					<NextLink href='/'>
						<Flex
							bg='black'
							p={0.5}
							borderRadius='md'
							boxShadow='xs'
							color='orange.700'
							justify='center'
							align='center'
							border='1px solid'
							borderColor='gray.200'>
							<Image
								borderRadius='md'
								src='/logo.jpeg'
								alt='OCD Logo'
								boxSize='100px'
								objectFit='contain'
							/>
						</Flex>
					</NextLink>

					<VStack gap={0}>
						<Heading
							size='2xl'
							color='teal.900'
							fontWeight='extrabold'
							fontFamily='serif'
							letterSpacing='tight'>
							বাংলাদেশ সিভিল সার্ভিস '৮৫ ফোরাম
						</Heading>
						<Heading
							size='xl'
							color='teal.700'
							fontFamily='serif'
							fontWeight='bold'>
							বার্ষিক পুনর্মিলনী ২০২৬
						</Heading>
						<Box pt={1}>
							<Link
								target='_blank'
								rel='noopener noreferrer'
								href="https://www.google.com/maps/search/?api=1&query=Officers'+Club+Dhaka,+26+Bailey+Road,+Dhaka+1000">
								<Text
									fontSize='xl'
									color='gray.800'
									fontWeight='semibold'>
									স্থান: অফিসার্স ক্লাব ঢাকা, ২৬ বেইলি রোড, ঢাকা ১০০০
								</Text>
							</Link>

							<Text
								fontSize='lg'
								color='#333'
								fontWeight='medium'>
								তারিখ: ২৮ জুলাই ২০২৬, মঙ্গলবার
							</Text>
							<Text
								fontSize='lg'
								color='#333'
								fontWeight='medium'>
								সময়: সন্ধ্যা ৭টা
							</Text>
						</Box>
					</VStack>

					<Text
						fontSize='lg'
						fontWeight='bold'
						color='#111'
						mt={2}>
						রেজিস্ট্রেশন রসিদ # {code}
					</Text>

					<Text color='gray.500'>তারিখ: {new Date().toLocaleDateString()}</Text>
				</VStack>
				<Separator mb={6} /> {/* Details */}
				<Table.Root
					variant='outline'
					border='1px solid'
					borderColor='gray.300'>
					<Table.Body>
						<Table.Row>
							<Table.Cell
								fontWeight='bold'
								color='#222'>
								নাম
							</Table.Cell>
							<Table.Cell color='#222'>{data?.name}</Table.Cell>
						</Table.Row>
						<Table.Row>
							<Table.Cell
								fontWeight='bold'
								color='#222'>
								ক্যাডার
							</Table.Cell>
							<Table.Cell color='#222'>{data?.cadre}</Table.Cell>
						</Table.Row>
						<Table.Row>
							<Table.Cell
								fontWeight='bold'
								color='#222'>
								মোবাইল নং
							</Table.Cell>
							<Table.Cell color='#222'>{data?.phone}</Table.Cell>
						</Table.Row>
						<Table.Row>
							<Table.Cell
								fontWeight='bold'
								color='#222'>
								ইমেইল
							</Table.Cell>
							<Table.Cell color='#222'>{data?.email || 'প্রযোজ্য নয়'}</Table.Cell>
						</Table.Row>
						<Table.Row>
							<Table.Cell
								fontWeight='bold'
								color='#222'>
								সদস্য ধরণ
							</Table.Cell>
							<Table.Cell
								color='#222'
								textTransform='capitalize'>
								{data?.visitorType === 'individual' ? 'একক' : 'দম্পতি'}
							</Table.Cell>
						</Table.Row>
						{/* <Table.Row>
							<Table.Cell
								fontWeight='bold'
								color='#222'>
								সন্তান সংখ্যা
							</Table.Cell>
							<Table.Cell color='#222'>{data?.noOfKids}</Table.Cell>
						</Table.Row> */}
						<Table.Row>
							<Table.Cell
								fontWeight='bold'
								color='#222'>
								গাড়ি চালক/বডিগার্ড
							</Table.Cell>
							<Table.Cell color='#222'>{data?.noOfDrivers}</Table.Cell>
						</Table.Row>
						{/* <Table.Row>
							<Table.Cell
								fontWeight='bold'
								color='#222'>
								পরিবহন
							</Table.Cell>
							<Table.Cell color='#222'>
								{data?.isTransportRequired
									? `হ্যাঁ (${data.transportSeats} সিট) - পিকআপ: ${data?.pickupLocation}`
									: 'না'}
							</Table.Cell>
						</Table.Row> */}
						{/* <Table.Row>
							<Table.Cell
								fontWeight='bold'
								color='#222'>
								ট্রানজ্যাকশন আইডি
							</Table.Cell>
							<Table.Cell color='#222'>{data?.tranxId}</Table.Cell>
						</Table.Row> */}
						{/* <Table.Row>
							<Table.Cell
								fontWeight='bold'
								color='#222'>
								ট্রানজ্যাকশন আইডি
							</Table.Cell>
							<Table.Cell color='#222'>{data?.tranxId}</Table.Cell>
						</Table.Row> */}
						{/* <Table.Row>
							<Table.Cell
								fontWeight='bold'
								fontSize='lg'
								color='#222'>
								জমার পরিমাণ
							</Table.Cell>
							<Table.Cell
								fontWeight='bold'
								fontSize='lg'
								color='crimson'>
								{data?.amountPaid} টাকা
							</Table.Cell>
						</Table.Row> */}
					</Table.Body>
				</Table.Root>
				<Box
					mt={4}
					textAlign='center'>
					<Text
						fontSize='sm'
						color='gray.500'>
						রেজিস্ট্রেশন করার জন্য ধন্যবাদ! অনুগ্রহ করে এই রসিদটি সংরক্ষণ করুন।
					</Text>
				</Box>
			</Box>

			{/* Instructions */}
			<Box
				mt={6}
				className='no-print'>
				<Alert.Root
					status='info'
					borderRadius='md'>
					<Alert.Indicator />
					<Alert.Title>গুরুত্বপূর্ণ নির্দেশনা</Alert.Title>
					<Alert.Description>
						রসিদটি ডাউনলোড করুন অথবা স্ক্রিনশট নিয়ে রাখুন — অনুষ্ঠানে প্রবেশের সময় এটি দেখাতে হবে।
						এছাড়া আপনার মোবাইল নম্বরে একটি এসএমএস পাঠানো হয়েছে, প্রয়োজনে সেটিও রেফারেন্স হিসেবে
						ব্যবহার করতে পারবেন।
					</Alert.Description>
				</Alert.Root>
			</Box>

			{/* Actions */}
			<HStack
				mt={6}
				justify='center'
				gap={4}
				className='no-print'>
				<Button
					asChild
					colorPalette='black'
					bg='gray.900'
					color='white'
					_hover={{ bg: 'gray.700' }}>
					<a
						href={receiptPdfUrl}
						download={`receipt-${code}.pdf`}>
						<Download /> রসিদ ডাউনলোড করুন
					</a>
				</Button>
				<Button
					colorPalette='black'
					variant='outline'
					border='1px solid'
					borderColor='gray.300'
					onClick={handlePrint}>
					<Printer /> রসিদ প্রিন্ট করুন
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
					#printable-receipt {
						box-shadow: none;
						border: none;
						padding: 0;
					}
				}
			`}</style>
		</Box>
	);
}
