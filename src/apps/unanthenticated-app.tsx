import * as React from 'react'
import {AuthForm} from 'auth/index.d'
import {useAuth} from 'auth/context'
import {Button, Card, Divider, Form, Input} from 'antd'
import styled from '@emotion/styled'
import logo from 'assets/logo.svg'
import left from 'assets/left.svg'
import right from 'assets/right.svg'

interface FormElements extends HTMLFormControlsCollection {
  username: HTMLInputElement
  password: HTMLInputElement
}

export interface UsernameFormElement extends HTMLFormElement {
  readonly elements: FormElements
}

export interface UserFormProps {
  onSubmit: (form: AuthForm) => Promise<void>
  title: 'Login' | 'Create account'
}

function UserForm({onSubmit, title}: UserFormProps) {
  function handleSubmit(values: {username: string; password: string}) {
    onSubmit(values)
  }

  return (
    <Form onFinish={handleSubmit}>
      <Form.Item
        name="username"
        rules={[{required: true, message: 'Please enter your username.'}]}
      >
        <Input placeholder="Username" type="text" id="username" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{required: true, message: 'Please enter your password.'}]}
      >
        <Input placeholder="Password" type="password" id="password" />
      </Form.Item>
      <Form.Item>
        <LongButton htmlType="submit" type="primary" title={title}>
          {title}
        </LongButton>
      </Form.Item>
    </Form>
  )
}

export function UnauthenticatedApp() {
  const [isRegisterScreen, setIsRegisterScreen] = React.useState(false)
  const {login, register} = useAuth()
  return (
    <Container>
      <Header />
      <Background />
      <ShadowCard>
        <UserForm
          onSubmit={isRegisterScreen ? register : login}
          title={isRegisterScreen ? 'Create account' : 'Login'}
        />
        <Divider />
        <a onClick={() => setIsRegisterScreen(!isRegisterScreen)}>
          {isRegisterScreen
            ? 'Already have an account? Login'
            : `Don't have an account? Create one`}
        </a>
      </ShadowCard>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
`

const ShadowCard = styled(Card)`
  width: 40rem;
  min-height: 56rem;
  padding: 3.2rem 4rem;
  border-radius: 0.3rem;
  box-sizing: border-box;
  box-shadow: rgba(0, 0, 0, 0.1) 0 0 10px;
  text-align: center;
`
const Header = styled.header`
  background: url(${logo}) no-repeat center;
  padding: 6.25rem 0;
  background-size: auto 4rem;
  width: 100%;
`

const Background = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: left bottom, right bottom;
  background-size: calc(((100vw - 40rem) / 2) - 3.2rem),
    calc(((100vw - 40rem) / 2) - 3.2rem), cover;
  background-image: url(${left}), url(${right});
`

export const LongButton = styled(Button)`
  width: 100%;
`
