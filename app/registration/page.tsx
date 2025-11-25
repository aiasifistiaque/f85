import RegistrationForm from '@/components/RegistrationForm';
import { Box, Container, VStack, Heading, Text, Flex, Link } from '@chakra-ui/react';
import { Tent } from 'lucide-react';
import NextLink from 'next/link';

export default function RegistrationPage() {
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
							bg='white'
							p={4}
							borderRadius='md'
							boxShadow='sm'
							color='orange.700'
							justify='center'
							align='center'
							border='1px solid'
							borderColor='gray.200'>
							<Tent size={48} />
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
							বার্ষিক সম্মিলন ২০২৫
						</Heading>
						<Box pt={2}>
							<Link
								target='_blank'
								rel='noopener noreferrer'
								href='https://www.google.com/maps/place/Bangladesh+Ansar+VDP+Academy,+Safipur,+Gazipur/@24.0256786,90.2595071,16z/data=!4m10!1m2!2m1!1sansar+academy+shafipur+gazipur!3m6!1s0x3755e7518075884f:0xa6622510886d9024!8m2!3d24.0256786!4d90.2685193!15sCh5hbnNhciBhY2FkZW15IHNoYWZpcHVyIGdhemlwdXKSARFnb3Zlcm5tZW50X29mZmljZeABAA!16s%2Fg%2F11h6xd6_yd?entry=ttu&g_ep=EgoyMDI1MTExNy4wIKXMDSoASAFQAw%3D%3D'>
								<Text
									fontSize='xl'
									color='gray.800'
									fontWeight='semibold'>
									স্থান: আনসার একাডেমি, সফিপুর, গাজীপুর
								</Text>
							</Link>

							<Text
								fontSize='lg'
								color='gray.600'
								fontWeight='medium'
								mt={1}>
								তারিখ: ২৭ ডিসেম্বর ২০২৫, শনিবার
							</Text>
						</Box>
					</VStack>
				</VStack>

				<RegistrationForm />
			</Container>
		</Box>
	);
}
