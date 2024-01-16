import { LoginOutlined, TeamOutlined, UserOutlined } from '@ant-design/icons'
import { Layout, Space, Typography } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { logout, selectUser } from '../../features/auth/authSlice'
import { Paths } from '../../paths'
import { CustomButton } from '../custom-button'
import styles from './index.module.css'

export const Header = () => {
	const user = useSelector(selectUser)
	const navigate = useNavigate()
	const dispatch = useDispatch()

	const onLogoutClick = () => {
		dispatch(logout())
		localStorage.removeItem('token')
		navigate('/login')
	}
	return (
		<Layout.Header className={styles.header}>
			<Space>
				<TeamOutlined className={styles.teamIcon} />
				<Link to={Paths.home}>
					<CustomButton type='ghost'>
						<Typography.Title level={1}>Consumers</Typography.Title>
					</CustomButton>
				</Link>
			</Space>
			{user ? (
				<CustomButton
					type='ghost'
					icon={<LoginOutlined />}
					onClick={onLogoutClick}
				>
					Logout
				</CustomButton>
			) : (
				<Space>
					<Link to={Paths.register}>
						<CustomButton type='ghost' icon={<UserOutlined />}>
							Registration
						</CustomButton>
					</Link>
					<Link to={Paths.login}>
						<CustomButton type='ghost' icon={<LoginOutlined />}>
							Login
						</CustomButton>
					</Link>
				</Space>
			)}
		</Layout.Header>
	)
}
