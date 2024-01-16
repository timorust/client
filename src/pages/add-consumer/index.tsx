import { Consumer } from '@prisma/client'
import { Row } from 'antd'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useAddConsumerMutation } from '../../app/services/consumers'
import { ConsumerForm } from '../../components/consumer-form'
import { Layout } from '../../components/layout'
import { selectUser } from '../../features/auth/authSlice'
import { Paths } from '../../paths'
import { isErrorWithMessage } from '../../utils/is_error_with_message'

export const AddConsumer = () => {
	const [error, setError] = useState('')
	const navigate = useNavigate()
	const user = useSelector(selectUser)
	const [addConsumer] = useAddConsumerMutation()

	useEffect(() => {
		if (!user) {
			navigate('/login')
		}
	}, [navigate, user])

	const handleAddConsumer = async (data: Consumer) => {
		try {
			await addConsumer(data).unwrap()

			navigate(`${Paths.status}/created`)
		} catch (err) {
			const maybeError = isErrorWithMessage(err)

			if (maybeError) {
				setError(err.data.message)
			} else {
				setError('Unknown error')
			}
		}
	}

	return (
		<Layout>
			<Row align='middle' justify='center'>
				<ConsumerForm
					title='Add consumer'
					btnText='Add'
					onFinish={handleAddConsumer}
					error={error}
				/>
			</Row>
		</Layout>
	)
}
