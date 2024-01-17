import { Consumer } from '@prisma/client'
import { Row } from 'antd'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
	useEditConsumerMutation,
	useGetConsumerQuery,
} from '../../app/services/consumers'
import { ConsumerForm } from '../../components/consumer-form'
import { Layout } from '../../components/layout'
import { Paths } from '../../paths'
import { isErrorWithMessage } from '../../utils/is_error_with_message'

export const EditConsumer = () => {
	const navigate = useNavigate()
	const params = useParams<{ id: string }>()
	const [error, setError] = useState('')
	const { data, isLoading } = useGetConsumerQuery(params.id || '')
	const [editConsumer] = useEditConsumerMutation()

	if (isLoading) return <span>Loading..</span>

	const handleEditUser = async (consumer: Consumer) => {
		try {
			const editedConsumer = {
				...data,
				...consumer,
			}

			await editConsumer(editedConsumer).unwrap()

			navigate(`${Paths.status}/updated`)
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
					title='Edit Consumer'
					btnText='Edit'
					error={error}
					consumer={data}
					onFinish={handleEditUser}
				/>
			</Row>
		</Layout>
	)
}
