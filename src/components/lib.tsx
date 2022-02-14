import styled from '@emotion/styled'
import {Button, Spin, Typography} from 'antd'

export const Row = styled.div<{
  gap?: number | boolean
  spaceBetween?: boolean
  marginBottom?: number
}>`
  display: flex;
  align-items: center;
  justify-content: ${(props) =>
    props.spaceBetween ? 'space-between' : undefined};
  margin-bottom: ${(props) => `${props.marginBottom}rem`};

  > * {
    margin-top: 0 !important;
    margin-bottom: 0 !important;
    margin-right: ${(props) =>
      props.gap
        ? typeof props.gap === 'number'
          ? `${props.gap}rem`
          : '2rem'
        : undefined} !important;
  }
`

const FullPage = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const FullPageLoading = () => (
  <FullPage>
    <Spin size="large" />
  </FullPage>
)

export const FullPageFallback = ({error}: {error: Error | null}) => (
  <FullPage>
    <Typography.Text type="danger">{error?.message}</Typography.Text>
  </FullPage>
)

export const NoPaddingButton = styled(Button)`
  padding: 0;
`
