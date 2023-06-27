import React from "react"
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import Blog from './Blog'

test('renders title initially, but not url and likes', () => {
  const blog = {
    title: 'This should render',
    author: '-',
    url: 'This should not',
    likes: 0
  }

  const { container } = render(<Blog blog={blog} />)

  const div = container.querySelector('.blog')
  expect(div).toHaveTextContent('This should render')
  expect(div).not.toHaveTextContent('This should not')
  expect(div).not.toHaveValue(0)
})

test('after button click, url, like and user are shown', async () => {
  const blog = {
    title: 'TestBlog',
    author: 'Tester',
    url: 'testing@test.fi',
    likes: '20',
    user: {
      id: 1234,
      username: 'TestUser'
    }
  }

  const { container } = render(<Blog blog={blog} />)
  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)

  const div = container.querySelector('.blog-all')
  expect(div).not.toHaveStyle('display: none')
  expect(div).toHaveTextContent('testing@test.fi')
  expect(div).toHaveTextContent('TestUser')
  expect(div).toHaveTextContent('20')
})