import { PlusCircleOutlined } from '@ant-design/icons'
import { Consumer } from '@prisma/client'
import { Table } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useGetAllConsumersQuery } from '../../app/services/consumers'
import { CustomButton } from '../../components/custom-button'
import { Layout } from '../../components/layout'
import { selectUser } from '../../features/auth/authSlice'
import { Paths } from '../../paths'

const columns: ColumnsType<Consumer> = [
	{
		title: 'First Name',
		dataIndex: 'firstName',
		key: 'firstName',
	},
	{
		title: 'Last Name',
		dataIndex: 'lastName',
		key: 'lastName',
	},
	{
		title: 'Phone Number',
		dataIndex: 'phone',
		key: 'phone',
	},
	{
		title: 'Medical Information',
		dataIndex: 'diagnoz',
		key: 'diagnoz',
	},
]
export const Consumers = () => {
	const navigate = useNavigate()
	const user = useSelector(selectUser)
	const { data, isLoading } = useGetAllConsumersQuery()

	useEffect(() => {
		if (!user) {
			navigate('/login')
		}
	}, [navigate, user])

	const goToAddUser = () => navigate(Paths.addConsumer)
	return (
		<Layout>
			<CustomButton
				type='primary'
				onClick={goToAddUser}
				icon={<PlusCircleOutlined />}
			>
				Add
			</CustomButton>
			<Table
				loading={isLoading}
				dataSource={data}
				pagination={false}
				columns={columns}
				rowKey={record => record.id}
				onRow={record => {
					return {
						onClick: () => navigate(`${Paths.consumer}/${record.id}`),
					}
				}}
			/>
		</Layout>
	)
}
