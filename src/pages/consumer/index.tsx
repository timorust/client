import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { Descriptions, Divider, Modal, Space } from 'antd'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, Navigate, useNavigation, useParams } from 'react-router-dom'
import {
	useGetConsumerQuery,
	useRemoveConsumerMutation,
} from '../../app/services/consumers'
import { CustomButton } from '../../components/custom-button'
import { ErrorMessage } from '../../components/error-message'
import { Layout } from '../../components/layout'
import { selectUser } from '../../features/auth/authSlice'

export const Consumer = () => {
	const navigate = useNavigation()
	const [error, setError] = useState('')
	const params = useParams<{ id: string }>()
	const [isModalOpen, setIsModalOpen] = useState(false)
	const { data, isLoading } = useGetConsumerQuery(params.id || '')
	const [removeConsumer] = useRemoveConsumerMutation()
	const user = useSelector(selectUser)

	if (isLoading) {
		return <span>Loading...</span>
	}
	if (!data) {
		return <Navigate to='/' />
	}

	const showModal = () => {
		setIsModalOpen(true)
	}
	const hideModal = () => {
		setIsModalOpen(false)
	}

	return (
		<Layout>
			<Descriptions title='Consumer information' bordered>
				<Descriptions.Item label='First Name' span={3}>
					{`${data.firstName}`}
				</Descriptions.Item>
				<Descriptions.Item label='Last Name' span={3}>
					{`${data.lastName}`}
				</Descriptions.Item>
				<Descriptions.Item label='Phone Number' span={3}>
					{`${data.phone}`}
				</Descriptions.Item>
				<Descriptions.Item label='Medical Information' span={3}>
					{`${data.diagnoz}`}
				</Descriptions.Item>
			</Descriptions>

			{user?.id === data.userId && (
				<>
					<Divider orientation='left'>Action</Divider>
					<Space>
						<Link to={`/consumer/edit/${data.id}`}>
							<CustomButton
								shape='round'
								type='default'
								icon={<EditOutlined />}
							>
								Edit
							</CustomButton>
						</Link>
						<CustomButton
							shape='round'
							danger
							onClick={showModal}
							icon={<DeleteOutlined />}
						>
							Delete
						</CustomButton>
					</Space>
				</>
			)}
			<ErrorMessage message={error} />
			<Modal
				title='Confirm deletion'
				open={isModalOpen}
				onOk={() => null}
				onCancel={hideModal}
				okText='Confirm'
				cancelText='Cancel'
			>
				Are you sure you want to remove the patient from the table?
			</Modal>
		</Layout>
	)
}
