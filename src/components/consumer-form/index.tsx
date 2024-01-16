import { Consumer } from '@prisma/client'
import { Card, Form, Space } from 'antd'
import { CustomButton } from '../custom-button'
import { CustomInput } from '../custom-input'
import { ErrorMessage } from '../error-message'

type Props<T> = {
	onFinish: (value: T) => void
	btnText: string
	title: string
	error?: string
	consumer?: T
}
export const ConsumerForm = ({
	onFinish,
	title,
	btnText,
	error,
	consumer,
}: Props<Consumer>) => {
	return (
		<Card title={title} style={{ width: '30rem' }}>
			<Form name='consumer-form' onFinish={onFinish} initialValues={consumer}>
				<CustomInput type='text' name='firstName' placeholder='First Name' />
				<CustomInput type='text' name='lastName' placeholder='Last Name' />
				<CustomInput type='number' name='phone' placeholder='Phone Number' />
				<CustomInput
					type='text'
					name='diagnoz'
					placeholder='Medical Information'
				/>
				<Space>
					<ErrorMessage message={error} />
					<CustomButton htmlType='submit'>{btnText}</CustomButton>
				</Space>
			</Form>
		</Card>
	)
}
