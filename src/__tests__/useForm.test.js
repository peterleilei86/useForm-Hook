import {renderHook, act} from '@testing-library/react-hooks'
import {useForm} from '../useForm'

describe('test useForm custom hook', () => {
  let mockEvent
  beforeEach(() => {
    mockEvent = (name, value) => ({
      persist: jest.fn(),
      target: {
        name,
        value
      }
    })
  })

  it('should update form values on change event', () => {
    const {result} = renderHook(() => useForm())
    expect(result.current.values).toEqual({
      email: {value: '', isInitial: true},
      password: {value: '', isInitial: true}
    })
    expect(typeof result.current.handleChange).toBe('function')
    expect(typeof result.current.handleSubmit).toBe('function')

    const e = mockEvent('email', 'a@a.com')
    act(() => {
      result.current.handleChange(e)
    })
    const newValues = {
      email: {value: 'a@a.com', isInitial: false},
      password: {value: '', isInitial: true}
    }

    expect(result.current.values).toEqual(newValues)
  })

  it('should update errors when email is not provided', () => {
    const {result} = renderHook(() => useForm())
    const e = mockEvent('email', '')
    act(() => {
      result.current.handleChange(e)
    })
    const expectedErrors = {
      email: 'Email is required!'
    }
    expect(result.current.errors).toEqual(expectedErrors)
  })

  it('should update errors when email is invalid', () => {
    const {result} = renderHook(() => useForm())
    const e = mockEvent('email', 'aaa')
    act(() => {
      result.current.handleChange(e)
    })
    const expectedErrors = {
      email: 'Please provide a valid email address!'
    }
    expect(result.current.errors).toEqual(expectedErrors)
  })
})
