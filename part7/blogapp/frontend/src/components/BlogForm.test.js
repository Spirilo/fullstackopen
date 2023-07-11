import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

describe('BlogForm tests', () => {
  test('function from props is called with right data', async () => {
    const createBlog = jest.fn()
    const { container } = render(<BlogForm createBlog={createBlog} />)

    const titleInput = container.querySelector('#title-input')
    const authorInput = container.querySelector('#author-input')
    const urlInput = container.querySelector('#url-input')
    const sendButton = screen.getByText('add')

    await userEvent.type(titleInput, 'Test title')
    await userEvent.type(authorInput, 'Test author')
    await userEvent.type(urlInput, 'test@url.fi')
    await userEvent.click(sendButton)

    expect(createBlog.mock.calls).toHaveLength(1)
  })
})
