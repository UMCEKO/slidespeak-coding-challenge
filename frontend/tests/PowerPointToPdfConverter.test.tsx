import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { PowerPointToPdfConverter, ErrorState } from '../src/components/PowerPointToPdfConverter'
import { ErrorPopup } from '../src/components/PowerPointToPdfConverter/ErrorPopup'

describe('PowerPointToPdfConverter', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })
 
  it('renders the choose file step by default', () => {
    render(<PowerPointToPdfConverter />)
    // Verify that the file input is present
    const fileInput = screen.getByTestId('file-input')
    expect(fileInput).toBeInTheDocument()
  })
}) 
