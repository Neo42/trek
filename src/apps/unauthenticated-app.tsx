/** @jsxImportSource @emotion/react */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {jsx} from '@emotion/react'
import * as React from 'react'
import {Helmet} from 'react-helmet-async'
import styled from '@emotion/styled'
import {Button, Card, Divider, Form, Input} from 'antd'
import left from 'assets/left.svg'
import logo from 'assets/logo.svg'
import right from 'assets/right.svg'
import {useAuth} from 'auth/context'
import {ErrorMessage} from 'components'
import {UserFormProps} from 'types'
import {useAsync} from 'utils'

function UserForm({onSubmit, title, onError}: UserFormProps) {
  const {run, isLoading: loading} = useAsync(undefined, {throwOnError: true})

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
        <>
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

          <Form.Item
            name="name"
            rules={[{required: true, message: 'Please enter your name.'}]}
          >
            <Input placeholder="Name" type="text" id="name" />
          </Form.Item>
        </>
      ) : null}

      <Form.Item>
        <LongButton htmlType="submit" type="primary" {...{title, loading}}>
          {title}
        </LongButton>
      </Form.Item>
    </Form>
  )
}

export function UnauthenticatedApp() {
  const [isRegisterScreen, setIsRegisterScreen] = React.useState(false)
  // useHeadTitle(`Please ${isRegisterScreen ? 'Login' : 'Register'} to Continue`)
  const {login, register} = useAuth()
  const [error, setError] = React.useState<Error | null>(null)

  return (
    <Container>
      <Helmet>
        <title>{isRegisterScreen ? 'Create Account' : 'Login'} | Trek</title>
      </Helmet>
      <Header />
      <Background />
      <ShadowCard>
        <Title>
          {isRegisterScreen ? 'Register' : 'Login'} to continue:
          <div css={{fontWeight: 'bold'}}>Your team's site</div>
        </Title>
        <ErrorMessage {...{error}} />
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
  background: url(${logo}) no-repeat center;
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
  background-image: url(${left}), url(${right});
`

export const LongButton = styled(Button)`
  width: 100%;
`

const Title = styled.h2`
  margin-bottom: 2.4rem;
  color: rgb(94, 108, 132);
  font-size: 1.6rem;
`
