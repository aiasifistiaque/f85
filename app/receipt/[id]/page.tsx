import Receipt from '@/components/Receipt';
import { Box, Container } from '@chakra-ui/react';

export default async function ReceiptPage({ params }: { params: { id: string } }) {
	const { id } = await params;
	return (
		<Box
			minH='100vh'
			bg='#f4f4ed'
			py={10}>
			<Container maxW='container.lg'>
				<Receipt code={id} />
			</Container>
		</Box>
	);
}
