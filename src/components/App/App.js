import React from 'react'
import { Layout, Menu, Row, Col } from 'antd'
import styled from 'styled-components'
import { Processes, Jobs } from '../'

const { Header, Content, Footer } = Layout

const App = () => {
  return (
    <Layout className='layout'>
      <MainLayout>
        <div>
          <Header>
            <Menu theme='dark' mode='horizontal' />
          </Header>
          <Container>
            <Row gutter={16}>
              <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                <Processes />
              </Col>
              <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                <Jobs />
              </Col>
            </Row>
          </Container>
        </div>
        <FooterWrapper>:)</FooterWrapper>
      </MainLayout>
    </Layout>
  )
}

const MainLayout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100vh;
`

const FooterWrapper = styled(Footer)`
  background-color: #1a1a1a;
  text-align: center;
  color: rgba(255,255,255,0.6);
  font-size: 16px;
`

const Container = styled(Content)`
  padding: 24px 48px;
`

export default App
