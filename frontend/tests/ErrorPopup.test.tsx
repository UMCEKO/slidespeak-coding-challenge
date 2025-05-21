import { ErrorState } from "@/components/PowerPointToPdfConverter"
import { ErrorPopup } from "@/components/PowerPointToPdfConverter/ErrorPopup"
import { render, screen } from "@testing-library/react"

describe('ErrorPopup', () => {
    
  it('shows error popup when error state is INVALID_FILE', () => {
    render(
      <ErrorPopup
        errorState={ErrorState.INVALID_FILE}
        setCurrentStep={jest.fn()}
        setError={jest.fn()}
      />
    )
    expect(
      screen.getByText("This file format isn't supported. Please upload a PowerPoint file (.pptx or .ppt).")
    ).toBeInTheDocument()
  })

  it('shows error popup when error state is TOO_MANY_FILES', () => {
    render(
      <ErrorPopup
        errorState={ErrorState.TOO_MANY_FILES}
        setCurrentStep={jest.fn()}
        setError={jest.fn()}
      />
    )
    expect(
      screen.getByText("Only one PowerPoint file can be uploaded at a time. Please select a single file to convert.")
    ).toBeInTheDocument()
  })

  it('shows error popup when error state is SIZE_LIMIT_EXCEEDED', () => {
    render(
      <ErrorPopup
        errorState={ErrorState.SIZE_LIMIT_EXCEEDED}
        setCurrentStep={jest.fn()}
        setError={jest.fn()}
      />
    )
    expect(
      screen.getByText("This file exceeds our 50MB size limit. Please compress your PowerPoint or split it into smaller presentations.")
    ).toBeInTheDocument()
  })
  
  it('shows error popup when error state is QUEUE_ERROR', () => {
    render(
      <ErrorPopup
        errorState={ErrorState.QUEUE_ERROR}
        setCurrentStep={jest.fn()}
        setError={jest.fn()}
      />
    )
    expect(
      screen.getByText("We couldn't queue your file for conversion. Please try again or check your internet connection.")
    ).toBeInTheDocument()
  })    

  it('shows error popup when error state is PROCESSING_ERROR', () => {
    render(
      <ErrorPopup
        errorState={ErrorState.PROCESSING_ERROR}
        setCurrentStep={jest.fn()}
        setError={jest.fn()}
      />
    )
    expect(
      screen.getByText("An error occurred while converting your PowerPoint to PDF. Please check your file and try again.")
    ).toBeInTheDocument()   
  })

  it('shows error popup when error state is TIMEOUT_ERROR', () => {
    render(
      <ErrorPopup
        errorState={ErrorState.TIMEOUT_ERROR}
        setCurrentStep={jest.fn()}
        setError={jest.fn()}
      />
    )
    expect(
      screen.getByText("Your conversion is taking longer than expected. Please try again with a smaller file or at a less busy time.")
    ).toBeInTheDocument()
  })

  it('shows error popup when error state is QUERY_ERROR', () => {
    render(
      <ErrorPopup
        errorState={ErrorState.QUERY_ERROR} 
        setCurrentStep={jest.fn()}
        setError={jest.fn()}
      />
    )
    expect(
      screen.getByText("We lost connection while checking your conversion status. Please try again or check your network.") 
    ).toBeInTheDocument()
  })

  it('shows error popup when error state is OTHER', () => {
    render(
      <ErrorPopup
        errorState={ErrorState.OTHER}
        setCurrentStep={jest.fn()}
        setError={jest.fn()}
      />
    )
    expect(
      screen.getByText("Something unexpected happened. Please try again or contact support if the problem persists.")
    ).toBeInTheDocument()
  })

  it('shows go back button', () => {
    render(
      <ErrorPopup
        errorState={ErrorState.INVALID_FILE}
        setCurrentStep={jest.fn()}
        setError={jest.fn()}
      />
    )
    expect(
      screen.getByRole('button', { name: 'Go back' })
    ).toBeInTheDocument()
  })
  
  
})