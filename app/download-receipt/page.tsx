'use client';

import {
	Box,
	Container,
	VStack,
	Heading,
	Text,
	Flex,
	Input,
	Button,
	Field,
	Alert,
	Image,
} from '@chakra-ui/react';
import { Tent } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { usePostMutation } from '@/store/services/commonApi';
import NextLink from 'next/link';

export default function DownloadReceiptPage() {
	const [mobileNumber, setMobileNumber] = useState('');
	const [errorMessage, setErrorMessage] = useState('');
	const router = useRouter();

	const [trigger, result] = usePostMutation();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setErrorMessage('');

		try {
			const response = await trigger({
				path: 'receipt-by-phone',
				body: {
					phone: mobileNumber,
				},
			}).unwrap();

			// If successful, navigate to receipt page
			if (response?.code) {
				router.push(`/receipt/${response.code}`);
			}
		} catch (error: any) {
			console.error('Receipt lookup error:', error);
			const message =
				error?.data?.message ||
				error?.message ||
				'রেজিস্ট্রেশন খুঁজে পাওয়া যায়নি। অনুগ্রহ করে আপনার মোবাইল নম্বর যাচাই করুন।';
			setErrorMessage(message);
		}
	};

	return (
		<Box
			minH='100vh'
			bg='#f4f4ed'
			py={10}
			color='gray.900'>
			<Container maxW='container.md'>
				<VStack
					gap={6}
					mb={8}
					textAlign='center'>
					{/* Logo Placeholder */}
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

					<VStack
						gap={1}
						mt={2}>
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
							রসিদ ডাউনলোড করুন
						</Heading>
					</VStack>
				</VStack>

				<Box
					maxW='xl'
					mx='auto'
					mt={8}
					p={{ base: 4, md: 8 }}
					borderWidth={1}
					borderRadius='lg'
					boxShadow='lg'
					bg='white'
					borderColor='gray.200'>
					<form onSubmit={handleSubmit}>
						<VStack
							gap={6}
							align='stretch'>
							<Field.Root required>
								<Field.Label
									fontWeight='semibold'
									color='gray.900'
									fontSize='md'>
									মোবাইল নম্বর
								</Field.Label>
								<Input
									placeholder='মোবাইল নম্বর লিখুন'
									value={mobileNumber}
									onChange={e => setMobileNumber(e.target.value)}
									borderColor='gray.400'
									borderRadius='none'
									color='gray.900'
									size='lg'
									height='52px'
									_placeholder={{ color: 'gray.500' }}
									_focus={{ borderColor: 'gray.800', ring: '1px', ringColor: 'gray.800' }}
									required
								/>
							</Field.Root>

							{errorMessage && (
								<Alert.Root
									status='error'
									mt={2}>
									<Alert.Indicator />
									<Alert.Title>খুঁজে পাওয়া যায়নি!</Alert.Title>
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
								রসিদ দেখুন
							</Button>
						</VStack>
					</form>
				</Box>
			</Container>
		</Box>
	);
}
