import {
	Box,
	Container,
	VStack,
	Heading,
	Text,
	Flex,
	Link,
	Button,
	HStack,
	Image,
} from '@chakra-ui/react';
import { Tent } from 'lucide-react';
import NextLink from 'next/link';

export default function Home() {
	return (
		<Box
			minH='100vh'
			bg='#f4f4ed'
			py={10}
			color='gray.900'>
			<Container maxW='container.md'>
				<VStack
					gap={8}
					mb={8}
					textAlign='center'>
					{/* Logo Placeholder */}
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
							বার্ষিক সম্মিলন ২০২৬
						</Heading>
						<Box pt={2}>
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
								color='gray.600'
								fontWeight='medium'
								mt={1}>
								তারিখ: ২৮ জুলাই ২০২৬, মঙ্গলবার
							</Text>
						</Box>
					</VStack>

					<VStack
						gap={4}
						mt={8}
						w='full'
						maxW='md'>
						<NextLink
							href='/registration'
							passHref
							style={{ width: '100%' }}>
							<Button
								bg='teal.600'
								color='white'
								_hover={{ bg: 'teal.700' }}
								size='xl'
								height='60px'
								fontSize='xl'
								fontWeight='bold'
								width='full'>
								রেজিস্ট্রেশন করুন
							</Button>
						</NextLink>

						<NextLink
							href='/download-receipt'
							passHref
							style={{ width: '100%' }}>
							<Button
								bg='gray.700'
								color='white'
								_hover={{ bg: 'gray.800' }}
								size='xl'
								height='60px'
								fontSize='xl'
								fontWeight='bold'
								width='full'>
								রসিদ ডাউনলোড করুন
							</Button>
						</NextLink>
					</VStack>
				</VStack>
			</Container>
		</Box>
	);
}
