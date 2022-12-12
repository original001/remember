import { rest } from 'msw'
import { responseMeanMock, responseMock } from './responseExample'

export const handlers = [
  rest.get('https://wrv6ojgvlg6d2b247hrvzdrv4y0zcybj.lambda-url.eu-north-1.on.aws/Production', (req, res, ctx) => {
    if (req.params)
    return res(
      ctx.json(responseMeanMock)
    )
  }),
  rest.post('/create', (req, res, ctx) => {
    return res(
      ctx.status(200)
    )
  }),
]