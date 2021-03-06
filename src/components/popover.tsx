import {List, Popover as AntdPopover, Typography, Divider} from 'antd'
import styled from '@emotion/styled'
import {PopoverProps, PopoverContentProps} from 'types'
import {NoPaddingButton} from 'components'
import {ModalOpenButton} from './modal'

export const Popover = ({title, ...props}: PopoverProps) => {
  return (
    <AntdPopover
      zIndex={500}
      placement="bottom"
      content={<PopoverContent {...props} />}
    >
      <span>{title}</span>
    </AntdPopover>
  )
}

const PopoverContent = ({
  items,
  contentTitle,
  buttonText,
}: PopoverContentProps) => {
  return (
    <ContentContainer>
      <Typography.Text type="secondary">{contentTitle}</Typography.Text>
      <List>
        {items?.map((item) => (
          <List.Item key={item.id}>
            <List.Item.Meta title={item.name} />
          </List.Item>
        ))}
      </List>
      {buttonText ? (
        <>
          <Divider />
          <ModalOpenButton>
            <NoPaddingButton type="link">{buttonText}</NoPaddingButton>
          </ModalOpenButton>
        </>
      ) : null}
    </ContentContainer>
  )
}

const ContentContainer = styled.div`
  min-width: 20rem;
`
