import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import NumPad from '@controls/components/pad-number'

// Mock window.innerWidth and resize events
const mockInnerWidth = (width: number) => {
  Object.defineProperty(window, 'innerWidth', {
    writable: true,
    configurable: true,
    value: width,
  })
}

describe('NumPad Component', () => {
  const mockOnNumberClick = vi.fn()
  const mockOnBlur = vi.fn()
  
  beforeEach(() => {
    mockOnNumberClick.mockClear()
    mockOnBlur.mockClear()
    // Reset window size to desktop by default
    mockInnerWidth(1024)
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  describe('Rendering and Visibility', () => {
    it('should not render when show is false', () => {
      render(
        <NumPad 
          onNumberClick={mockOnNumberClick} 
          show={false} 
        />
      )
      
      expect(screen.queryByRole('group')).not.toBeInTheDocument()
    })

    it('should render when show is true', () => {
      render(
        <NumPad 
          onNumberClick={mockOnNumberClick} 
          show={true} 
        />
      )
      
      expect(screen.getByRole('group')).toBeInTheDocument()
    })

    it('should render all numpad buttons with correct values', () => {
      render(
        <NumPad 
          onNumberClick={mockOnNumberClick} 
          show={true} 
        />
      )
      
      const expectedValues = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '0']
      
      expectedValues.forEach(value => {
        expect(screen.getByRole('button', { name: value })).toBeInTheDocument()
      })
      
      // Check for clear button (Eraser icon)
      expect(screen.getByRole('button', { name: '' })).toBeInTheDocument()
    })
  })

  describe('Button Interactions', () => {
    it('should call onNumberClick when number buttons are clicked', () => {
      render(
        <NumPad 
          onNumberClick={mockOnNumberClick} 
          show={true} 
        />
      )
      
      const button5 = screen.getByRole('button', { name: '5' })
      fireEvent.click(button5)
      
      expect(mockOnNumberClick).toHaveBeenCalledWith('5')
      expect(mockOnNumberClick).toHaveBeenCalledTimes(1)
    })

    it('should call onNumberClick with "Limpiar" when clear button is clicked', () => {
      render(
        <NumPad 
          onNumberClick={mockOnNumberClick} 
          show={true} 
        />
      )
      
      // Find the button with Eraser icon (clear button)
      const clearButton = screen.getByRole('button', { name: '' })
      fireEvent.click(clearButton)
      
      expect(mockOnNumberClick).toHaveBeenCalledWith('Limpiar')
    })

    it('should call onBlur when numpad loses focus', () => {
      render(
        <NumPad 
          onNumberClick={mockOnNumberClick} 
          show={true}
          onBlur={mockOnBlur}
        />
      )
      
      const numpad = screen.getByRole('group')
      fireEvent.blur(numpad)
      
      expect(mockOnBlur).toHaveBeenCalledTimes(1)
    })

    it('should prevent default on mouseDown to avoid blur', () => {
      render(
        <NumPad 
          onNumberClick={mockOnNumberClick} 
          show={true} 
        />
      )
      
      const button1 = screen.getByRole('button', { name: '1' })
      const mouseDownEvent = new MouseEvent('mousedown', { bubbles: true })
      const preventDefaultSpy = vi.spyOn(mouseDownEvent, 'preventDefault')
      
      fireEvent(button1, mouseDownEvent)
      
      expect(preventDefaultSpy).toHaveBeenCalled()
    })
  })

  describe('Mobile vs Desktop Behavior', () => {
    it('should apply mobile styles when window width is below breakpoint', async () => {
      mockInnerWidth(500) // Mobile width
      
      render(
        <NumPad 
          onNumberClick={mockOnNumberClick} 
          show={true} 
        />
      )
      
      await waitFor(() => {
        const numpad = screen.getByRole('group')
        expect(numpad).toHaveClass('fixed', 'bottom-0', 'left-0', 'w-full')
      })
    })

    it('should apply desktop styles when window width is above breakpoint', async () => {
      mockInnerWidth(1024) // Desktop width
      
      render(
        <NumPad 
          onNumberClick={mockOnNumberClick} 
          show={true} 
        />
      )
      
      await waitFor(() => {
        const numpad = screen.getByRole('group')
        expect(numpad).toHaveClass('w-60')
        expect(numpad).not.toHaveClass('w-full')
      })
    })
  })

  describe('Positioning with Anchor', () => {
    it('should position relative to anchor element on desktop', () => {
      mockInnerWidth(1024)
      
      const anchorElement = document.createElement('div')
      anchorElement.getBoundingClientRect = vi.fn(() => ({
        top: 100,
        left: 200,
        right: 300,
        bottom: 120,
        width: 100,
        height: 20,
        x: 200,
        y: 100,
        toJSON: () => {},
      }))
      
      // Mock the ref with a mutable object
      const anchorRef = { current: anchorElement }
      
      render(
        <NumPad 
          onNumberClick={mockOnNumberClick} 
          show={true}
          anchorRef={anchorRef}
        />
      )
      
      const numpad = screen.getByRole('group')
      expect(numpad).toHaveStyle({ position: 'absolute' })
    })
  })

  describe('Accessibility', () => {
    it('should have proper ARIA attributes', () => {
      render(
        <NumPad 
          onNumberClick={mockOnNumberClick} 
          show={true} 
        />
      )
      
      const numpad = screen.getByRole('group')
      expect(numpad).toHaveAttribute('role', 'group')
      expect(numpad).toHaveAttribute('aria-hidden', 'false')
      expect(numpad).toHaveAttribute('tabIndex', '0')
    })

    it('should have proper button types', () => {
      render(
        <NumPad 
          onNumberClick={mockOnNumberClick} 
          show={true} 
        />
      )
      
      const buttons = screen.getAllByRole('button')
      buttons.forEach(button => {
        expect(button).toHaveAttribute('type', 'button')
      })
    })
  })
})

describe('useIsMobile hook', () => {
  it('should return true when window width is below breakpoint', async () => {
    mockInnerWidth(500)
    
    render(
      <NumPad 
        onNumberClick={vi.fn()} 
        show={true} 
      />
    )
    
    await waitFor(() => {
      const numpad = screen.getByRole('group')
      expect(numpad).toHaveClass('w-full')
    })
  })

  it('should return false when window width is above breakpoint', async () => {
    mockInnerWidth(1024)
    
    render(
      <NumPad 
        onNumberClick={vi.fn()} 
        show={true} 
      />
    )
    
    await waitFor(() => {
      const numpad = screen.getByRole('group')
      expect(numpad).toHaveClass('w-60')
    })
  })

  it('should update when window is resized', async () => {
    mockInnerWidth(1024) // Start desktop
    
    const { rerender } = render(
      <NumPad 
        onNumberClick={vi.fn()} 
        show={true} 
      />
    )
    
    // Should be desktop initially
    await waitFor(() => {
      const numpad = screen.getByRole('group')
      expect(numpad).toHaveClass('w-60')
    })
    
    // Resize to mobile
    mockInnerWidth(500)
    fireEvent(window, new Event('resize'))
    
    rerender(
      <NumPad 
        onNumberClick={vi.fn()} 
        show={true} 
      />
    )
    
    // Should now be mobile
    await waitFor(() => {
      const numpad = screen.getByRole('group')
      expect(numpad).toHaveClass('w-full')
    })
  })
})