import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('Blog tests', () => {
  let container
  const mockHandler = jest.fn()

  const blog = {
    title: 'TestBlog',
    author: 'Tester',
    url: 'testing@test.fi',
    likes: '20',
    user: {
      id: 1234,
      username: 'TestUser',
    },
  }
  beforeEach(() => {
    container = render(<Blog blog={blog} addLike={mockHandler} />).container
  })

  test('renders title initially, but not url and likes', () => {
    const div = container.querySelector('.blog')
    expect(div).toHaveTextContent('TestBlog')
    expect(div).not.toHaveTextContent('testing@test.fi')
    expect(div).not.toHaveTextContent('20')
  })

  test('after button click, url, like and user are shown', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    const div = container.querySelector('.blog-all')
    expect(div).not.toHaveStyle('display: none')
    expect(div).toHaveTextContent('testing@test.fi')
    expect(div).toHaveTextContent('TestUser')
    expect(div).toHaveTextContent('20')
  })

  test('two function calls after two clicks on like', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)
    const likeButton = screen.getByText('like')
    await user.click(likeButton)
    await user.click(likeButton)

    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})
