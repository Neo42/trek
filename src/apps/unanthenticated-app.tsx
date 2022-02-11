/** @jsxImportSource @emotion/react */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {jsx} from '@emotion/react'
import styled from '@emotion/styled'
import {Button, Card, Divider, Form, Input, Typography} from 'antd'
import {leftSvg, logoSvg, rightSvg} from 'assets'
import {useAuth} from 'auth'
import {AuthForm} from 'auth/index.d'
import * as React from 'react'
import {useAsync} from 'utils'

export interface UserFormProps {
  title: 'Login' | 'Create Account'
  onSubmit: (form: AuthForm) => Promise<void>
  onError: (error: any) => void
}

function UserForm({onSubmit, title, onError}: UserFormProps) {
  const {run, isLoading} = useAsync(undefined, {throwOnError: true})

  async function handleSubmit(values: {
    username: string
    password: string
    'confirm-password': string
  }) {
    if (
      values['confirm-password'] &&
      values['confirm-password'] !== values.password
    ) {
      onError(new Error(`Passwords didn't match.`))
      return
    }
    try {
      await run(onSubmit(values))
    } catch (error) {
      onError(error)
    }
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
      {title === 'Create Account' ? (
        <Form.Item
          name="confirm-password"
          rules={[
            {required: true, message: 'Please enter your password again.'},
          ]}
        >
          <Input
            placeholder="Confirm Password"
            type="password"
            id="confirm-password"
          />
        </Form.Item>
      ) : null}
      <Form.Item>
        <LongButton
          loading={isLoading}
          htmlType="submit"
          type="primary"
          title={title}
        >
          {title}
        </LongButton>
      </Form.Item>
    </Form>
  )
}

export function UnauthenticatedApp() {
  const [isRegisterScreen, setIsRegisterScreen] = React.useState(false)
  const {login, register} = useAuth()
  const [error, setError] = React.useState<Error | null>(null)

  return (
    <Container>
      <Header />
      <Background />
      <ShadowCard>
        <Title>
          {isRegisterScreen ? 'Login' : 'login'} to continue:
          <div css={{fontWeight: 'bold'}}>Your team's site</div>
        </Title>
        {error ? (
          <Typography.Text type="danger">{error.message}</Typography.Text>
        ) : null}
        <UserForm
          onError={setError}
          onSubmit={isRegisterScreen ? register : login}
          title={isRegisterScreen ? 'Create Account' : 'Login'}
        />
        <Divider />
        <Button
          type="link"
          onClick={() => setIsRegisterScreen(!isRegisterScreen)}
        >
          {isRegisterScreen
            ? 'Already have an account? Login'
            : `Don't have an account? Create one`}
        </Button>
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
  background: url(${logoSvg}) no-repeat center;
  padding: 6.25rem 0;
  background-size: auto 6rem;
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
  background-image: url(${leftSvg}), url(${rightSvg});
`

export const LongButton = styled(Button)`
  width: 100%;
`

const Title = styled.h2`
  margin-bottom: 2.4rem;
  color: rgb(94, 108, 132);
  font-size: 1.6rem;
`
