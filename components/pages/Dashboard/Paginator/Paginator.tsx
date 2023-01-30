import { Button, ButtonProps, Flex, Icon, Text } from '@chakra-ui/react';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';

import { FC } from 'react';
import useTranslation from 'next-translate/useTranslation';
import { usePicasso } from 'hooks';

interface IPaginatorProps extends ButtonProps {
	previous: () => void;
	next: () => void;
	actualPage: number;
	maxPage: number;
}

const PaginatorButton: FC<IPaginatorProps> = ({ children, ...props }) => (
	<Button
		boxSize={{ md: '5', xl: '7' }}
		border="1px solid"
		bg="white"
		{...props}
		color="#121212"
	>
		{children}
	</Button>
);

export const Paginator: FC<IPaginatorProps> = ({
	actualPage,
	maxPage,
	previous,
	next,
}) => {
	const { t: translate } = useTranslation('dashboard');
	const theme = usePicasso();
	return (
		<Flex justifyContent="space-between" align="center" gap="2">
			<PaginatorButton
				disabled={actualPage === 1}
				onClick={previous}
				previous={previous}
				next={next}
				actualPage={actualPage}
				maxPage={maxPage}
			>
				<Icon as={AiOutlineLeft} />
			</PaginatorButton>
			<Text
				w="max-content"
				h="max-content"
				fontWeight="medium"
				color={theme.text.primary}
				fontSize={{ md: 'md', lg: 'lg' }}
			>
				{`${actualPage} ${translate('of')} ${maxPage}`}
			</Text>
			<PaginatorButton
				disabled={actualPage === maxPage}
				onClick={next}
				previous={previous}
				next={next}
				actualPage={actualPage}
				maxPage={maxPage}
			>
				<Icon as={AiOutlineRight} />
			</PaginatorButton>
		</Flex>
	);
};
