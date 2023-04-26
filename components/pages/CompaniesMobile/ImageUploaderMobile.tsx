import {
	Button,
	Flex,
	ModalBody,
	ModalCloseButton,
	ModalFooter,
	ModalHeader,
	Text,
} from '@chakra-ui/react';
import { usePicasso } from 'hooks';
import { IBasicModal } from 'types';
import { BlackButton, DragDrop } from 'components';
import { useState } from 'react';
import { MobileModalLayout } from 'layouts';

interface IImageUploader extends IBasicModal {
	sendImage: React.Dispatch<React.SetStateAction<any>>;
}

export const ImageUploaderModalMobile: React.FC<IImageUploader> = ({
	isOpen,
	onClose,
	sendImage,
}) => {
	const theme = usePicasso();
	const [picture, setPicture] = useState('');

	const handleUploadFile = () => {
		sendImage(picture);
		onClose();
	};

	return (
		<MobileModalLayout isOpen={isOpen} onClose={onClose}>
			<Flex
				direction="column"
				w="full"
				bg={theme.bg.modal}
				borderRadius="inherit"
			>
				<ModalHeader display="flex">
					<Text color={theme.text.primary}>Drag and drop to upload image</Text>
					<ModalCloseButton color="gray.400" py="6" />
				</ModalHeader>
				<ModalBody
					display="flex"
					flexDirection="column"
					gap="6"
					alignItems="center"
				>
					<Flex w="100%">
						<Text fontSize="xs" color={theme.text.primary}>
							Your file must be no more than 5MB
						</Text>
					</Flex>
					<Flex w="100%" justify="center">
						<DragDrop setPicture={setPicture} />
					</Flex>
				</ModalBody>
			</Flex>
			<ModalFooter display="flex" justifyContent="space-between" pb="14">
				<Button
					onClick={onClose}
					borderRadius="sm"
					color="black"
					borderColor="black"
					borderWidth="0.1rem"
					px="12"
				>
					Cancel
				</Button>
				<BlackButton
					px="8"
					py="2.5"
					onClick={handleUploadFile}
					borderRadius="sm"
				>
					Upload File
				</BlackButton>
			</ModalFooter>
		</MobileModalLayout>
	);
};
