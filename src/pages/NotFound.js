import React, { PureComponent } from 'react'
import styled from 'styled-components'

const Container = styled.div`
  padding-top: 10vh;
  font-size: 60px;
  text-align: center;
`

const Code = styled.div`
  font-size: 120px;
`

export default class NotFound extends PureComponent {
  render() {
    return (
      <Container>
        <Code>404</Code>
        Page not found
      </Container>
    )
  }
}
