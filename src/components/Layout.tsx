import React from 'react';
import { useNavigate, Link, Outlet } from 'react-router-dom';
import { LogoutOutlined, ReconciliationOutlined, RocketOutlined, DeploymentUnitOutlined, CiOutlined, ThunderboltOutlined, MoneyCollectOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import logo from '../assets/logo.png'
const { Content, Sider } = Layout;

const Home: React.FC = () => {
    const navigate = useNavigate();
    const handleLogoutClick = () => {
        localStorage.removeItem('isLoggedIn');
        navigate('/login');
    };

    return (
        <div>
            <Layout>
                <Sider
                    style={{
                        height: '100vh',
                        overflow: 'auto',
                        position: 'sticky',
                        top: 0,
                        left: 0,
                    }}
                    width={250}
                    collapsible
                    theme="light">
                    <Menu
                        theme="light"
                        defaultSelectedKeys={['/']}
                        mode="inline">
                        <div
                            style={{
                                textAlign: 'center',
                                margin: '16px',
                                cursor: 'pointer',
                            }}
                            key="logo">
                            <img width={'50%'} src={logo} alt="logo" />
                        </div>
                        <Menu.Item key={'/'} icon={<ReconciliationOutlined />}>
                            <Link to={'/'}>
                                Rebalance
                            </Link>
                        </Menu.Item>
                        <Menu.Item key={'/clublime'} icon={<CiOutlined />}>
                            <Link to={'/clublime'}>
                                Clublime
                            </Link>
                        </Menu.Item>
                        <Menu.Item key={'/groundup'} icon={<DeploymentUnitOutlined />}>
                            <Link to={'/groundup'}>
                                Groundup
                            </Link>
                        </Menu.Item>
                        <Menu.Item key={'/plus-fitness'} icon={<MoneyCollectOutlined />}>
                            <Link to={'/plus-fitness'}>
                                Plus Fitness
                            </Link>
                        </Menu.Item>
                        <Menu.Item key={'/hiit-republic'} icon={<RocketOutlined />}>
                            <Link to={'/hiit-republic'}>
                                Hiit Republic
                            </Link>
                        </Menu.Item>
                        <Menu.Item key={'/hiit-showdown'} icon={<ThunderboltOutlined />}>
                            <Link to={'/hiit-showdown'}>
                                Hiit Showdown
                            </Link>
                        </Menu.Item>
                        <Menu.Item className='logout' onClick={handleLogoutClick} icon={<LogoutOutlined />} key="logout">
                            Log out
                        </Menu.Item>
                    </Menu>

                </Sider>
                <Layout className="site-layout">
                    <Content style={{ padding: '14px 0', background: '#FBFBFB' }}>
                        <Outlet />
                    </Content>
                </Layout>
            </Layout>
            <button onClick={handleLogoutClick}>Logout</button>
        </div>
    );
};

export default Home;